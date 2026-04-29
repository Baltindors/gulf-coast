<script setup>
defineProps({
  location: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white p-8 rounded border border-line shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer text-center flex flex-col items-center">
    <div class="w-16 h-16 rounded-full bg-ivory-warm border border-gold/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
      <svg class="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h3 class="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors">{{ location.name }}</h3>
    <p class="text-sm text-slate leading-relaxed">
      {{ location.description }}
    </p>
    <div class="mt-6 w-8 h-px bg-gold/50 group-hover:w-16 transition-all duration-300"></div>
  </div>
</template>
