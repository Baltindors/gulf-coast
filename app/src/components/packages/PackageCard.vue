<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  pkg: { type: Object, required: true }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex flex-col border border-gold/10 overflow-hidden group">
    <div class="bg-navy p-8 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#B89668 1px, transparent 1px); background-size: 12px 12px;"></div>
      <h3 class="font-serif text-3xl text-gold-light font-medium relative z-10 uppercase tracking-wider">{{ pkg.name }}</h3>
      <p v-if="pkg.subtitle" class="font-script text-2xl text-ivory/80 mt-2 relative z-10">{{ pkg.subtitle }}</p>
    </div>

    <div class="p-4 bg-ivory-warm/30 space-y-4">
      <div v-for="tier in pkg.tiers" :key="tier.level" 
        :class="[
          'relative p-6 rounded-sm border transition-all duration-300',
          tier.mostPopular ? 'bg-white border-gold shadow-md scale-[1.02] z-10' : 'bg-transparent border-gold/10 opacity-80 hover:opacity-100'
        ]">
        
        <div v-if="tier.mostPopular" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-[8px] font-bold tracking-[0.2em] px-3 py-1 uppercase rounded-full">
          Most Popular
        </div>

        <div class="flex justify-between items-end mb-4">
          <span class="font-sans text-[11px] font-bold tracking-widest uppercase text-navy/60">{{ tier.level }}</span>
          <span class="font-serif text-2xl text-navy">${{ tier.price }}</span>
        </div>

        <ul class="space-y-2 mb-6">
          <li v-for="feature in tier.features" :key="feature" class="flex items-start text-[12px] text-slate">
            <span class="text-gold mr-2 text-[10px]">●</span> {{ feature }}
          </li>
        </ul>

        <BaseButton 
          :to="{ path: '/contact', query: { service: pkg.name, tier: tier.level }}" 
          variant="ghost" 
          class="w-full text-[9px] py-2"
        >
          Select {{ tier.level }}
        </BaseButton>
      </div>
    </div>
    
    <div class="p-6 text-center border-t border-line">
      <p class="text-[10px] italic text-slate/70 tracking-wide">Formulated at higher therapeutic doses for optimal results.</p>
    </div>
  </div>
</template>