<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed } from 'vue'

const props = defineProps({
  pkg: { type: Object, required: true }
})

// Use the exact same image mapping as the Treatment Details page
const bannerImagePath = computed(() => {
  const imageMap = {
    'hydration-immunity': '/images/treatment-banner-3.png',
    'coastal-restore': '/images/treatment-banner-3.png',
    'coastal-vitality': '/images/treatment-banner-2.png',
    'coastal-radiance': '/images/treatment-banner-1.png',
    'coastal-reset': '/images/treatment-banner-5.png'
  }
  return imageMap[props.pkg.id] || '/images/treatment-banner-6.jpg'
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-500 flex flex-col border border-gold/10 overflow-hidden group">
    <div class="relative overflow-hidden min-h-[160px] flex flex-col justify-center p-6 md:p-8 bg-navy border-b border-line/20">
      <img 
        :src="bannerImagePath" 
        :alt="pkg.name" 
        class="absolute z-0 inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      />
      <div class="absolute z-10 inset-0 bg-gradient-to-r from-navy/95 from-30% via-navy/60 via-55% to-transparent to-75% pointer-events-none"></div>
      
      <div class="relative z-20 text-left">
        <h3 class="font-serif text-3xl text-ivory font-semibold leading-tight drop-shadow-md">{{ pkg.name }}</h3>
        <p v-if="pkg.subtitle" class="font-serif text-[15px] text-gold italic mt-2 drop-shadow-md pr-4">{{ pkg.subtitle }}</p>
      </div>
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
            <span class="text-gold mr-2 text-[10px]"> </span> {{ feature }}
          </li>
        </ul>
        <BaseButton 
           :to="{ path: '/contact', query: { service: pkg.name, tier: tier.level }}" 
           variant="outline-navy" 
           class="w-full text-[9px] py-2"
        >
          Select {{ tier.level }}
        </BaseButton>
      </div>
    </div>
    
    <div class="p-6 text-center border-t border-line flex flex-col gap-3">
      <p class="text-[10px] italic text-slate/70 tracking-wide">Formulated at higher therapeutic doses for optimal results.</p>
      <router-link 
        :to="`/treatments/${pkg.id}`" 
        class="text-[10px] font-bold tracking-widest text-navy uppercase hover:text-gold transition-colors inline-flex items-center justify-center gap-1 mt-1"
      >
        View Clinical Profile
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </div>
</template>