<script setup>
defineProps(['modelValue', 'error'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="['bg-white p-8 rounded border shadow-sm relative overflow-hidden transition-colors', error ? 'border-red-300' : 'border-gold/20']">
    <div class="absolute top-0 left-0 w-1 h-full bg-gold"></div>
    <h4 class="font-serif text-2xl text-navy mb-2">Patient Status</h4>
    <p class="text-xs text-slate mb-6">A Good Faith Exam ($30) is required for new patients or if your medical history has changed.</p>
    
    <div class="flex flex-col gap-4">
      <button v-for="status in [
        { id: 'new', label: 'New Patient', desc: 'First-time booking (Initial $30 GFE required)' },
        { id: 'changed', label: 'Returning Patient - Health Changes', desc: 'My medical condition or medications have changed (Updated $30 GFE required)' },
        { id: 'returning', label: 'Returning Patient - No Changes', desc: 'No health changes since my last successful GFE' }
      ]" 
      :key="status.id"
      @click="$emit('update:modelValue', status.id)" 
      :class="['p-4 border rounded-sm text-left transition-all', modelValue === status.id ? 'border-gold bg-gold/5' : 'border-line hover:border-gold/30']"
      >
        <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">{{ status.label }}</span>
        <span class="text-xs text-slate">{{ status.desc }}</span>
      </button>
    </div>
    <p v-if="error" class="text-[10px] text-red-500 mt-4 uppercase tracking-widest font-bold">{{ error }}</p>
  </div>
</template>