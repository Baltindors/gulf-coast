<script setup>
const features = [
  {
    title: 'Licensed Professionals',
    description: 'Expertly administered by highly trained, licensed Registered Nurses.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`
  },
  {
    title: 'Mobile Convenience',
    description: 'We bring the clinic to you—at home, your hotel, or yacht.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />`
  },
  {
    title: 'Premium Ingredients',
    description: 'Pharmacy-grade vitamins and nutrients for optimal absorption.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />`
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1080px] mx-auto">
    <div v-for="feature in features" :key="feature.title" class="text-center flex flex-col items-center group">
      <div class="w-20 h-20 bg-ivory-warm rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300 border border-gold/20">
        <svg class="w-9 h-9 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="feature.icon"></svg>
      </div>
      <h3 class="font-serif text-2xl text-navy font-medium mb-3">{{ feature.title }}</h3>
      <p class="text-slate text-[15px] leading-relaxed max-w-[280px]">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>
