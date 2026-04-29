<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps({
  pkg: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gold/10 relative overflow-hidden group">
    <!-- Image Placeholder -->
    <div class="relative w-full h-48 bg-[#EDE4D3] mb-8 flex items-center justify-center overflow-hidden rounded">
      <div class="absolute inset-3 border border-[#B89668]/40"></div>
      <div class="font-mono text-[10px] tracking-widest uppercase bg-[#F8F4ED] px-3 py-1.5 border border-[#B89668] text-[#0F2438] relative z-10">
        IMAGE: {{ pkg.id }}
      </div>
      <!-- Subtle gradient background pattern -->
      <div class="absolute inset-0 opacity-20" style="background: repeating-linear-gradient(135deg, transparent, transparent 12px, #d9cdb5 12px, #d9cdb5 13px);"></div>
    </div>

    <div class="flex flex-col flex-grow">
      <h3 class="font-serif text-2xl text-navy font-medium mb-3 group-hover:text-gold transition-colors">{{ pkg.name }}</h3>
      <p class="text-slate text-sm leading-relaxed mb-6 flex-grow">{{ pkg.description }}</p>
      
      <div class="mb-8">
        <h4 class="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-gold-dark mb-4 border-b border-gold/20 pb-2">Treatment Features</h4>
        <ul class="flex flex-col gap-3">
          <li v-for="(feature, index) in pkg.features" :key="index" class="flex items-start text-[13px] text-navy">
            <svg class="w-4 h-4 text-gold mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
            </svg>
            {{ feature }}
          </li>
        </ul>
      </div>
      
      <div class="mt-auto flex items-center justify-between border-t border-line pt-6">
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest text-slate">Starting at</span>
          <span class="font-serif text-xl font-medium text-navy">${{ pkg.price }}</span>
        </div>
        <BaseButton variant="outline-gold" to="/contact" class="px-5 py-2">Select</BaseButton>
      </div>
    </div>
  </div>
</template>
