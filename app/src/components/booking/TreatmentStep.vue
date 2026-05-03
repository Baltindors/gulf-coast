<script setup>
defineProps(['packages', 'availableTiers', 'selectedPackage', 'selectedTier', 'errors'])
defineEmits(['update:package', 'update:tier'])
</script>

<template>
  <div :class="['bg-white p-8 rounded border shadow-sm transition-colors', (errors.package || errors.tier) ? 'border-red-300' : 'border-gold/20']">
    <h4 class="font-serif text-2xl text-navy mb-6">Select Treatment</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <select :value="selectedPackage" @change="$emit('update:package', $event.target.value)" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
          <option value="">Choose a Package</option>
          <option v-for="pkg in packages" :key="pkg.id" :value="pkg.name">{{ pkg.name }}</option>
        </select>
        <span v-if="errors.package" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">{{ errors.package }}</span>
      </div>
      <div class="flex flex-col">
        <select :disabled="!selectedPackage" :value="selectedTier" @change="$emit('update:tier', $event.target.value)" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
          <option value="">Choose a Tier</option>
          <option v-for="tier in availableTiers" :key="tier.level" :value="tier.level">{{ tier.level }}</option>
        </select>
        <span v-if="errors.tier" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">{{ errors.tier }}</span>
      </div>
    </div>
  </div>
</template>