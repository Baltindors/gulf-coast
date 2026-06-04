<template>
  <div class="max-w-7xl mx-auto">
    
    <div class="text-center mb-16" data-aos="fade-up">
      <h2 class="text-3xl md:text-4xl font-serif text-navy">Rapid Relief for Targeted Conditions</h2>
      <p class="mt-4 text-lg text-slate max-w-2xl mx-auto">Our medical-grade IV therapies are formulated to get you back on your feet quickly.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      
<div v-for="(indication, index) in indications" :key="indication.title" class="flex flex-col items-center text-center group" data-aos="fade-up" :data-aos-delay="index * 100">
        <!-- Icon Circle: White background with dark gold icon -->
        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-white border border-gold/20 mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm">
          <svg class="w-8 h-8 text-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" v-html="indication.icon"></svg>
        </div>
        <!-- Text: Updated to brand fonts and colors -->
        <h3 class="text-xl font-serif text-navy mb-3">{{ indication.title }}</h3>
        <p class="text-slate text-sm leading-relaxed max-w-xs">
          {{ indication.description }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
const indications = [
  {
    title: 'Dehydration',
    description: 'Instantly restore your body’s fluid balance with 100% absorption of essential electrolytes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16a4.5 4.5 0 004.5-4.5M12 21a4.5 4.5 0 01-4.5-4.5c0-3 4.5-9 4.5-9s4.5 6 4.5 9A4.5 4.5 0 0112 21z" />'
  },
  {
    title: 'Hangovers',
    description: 'Flush out toxins, soothe nausea, and eliminate headaches so you can reclaim your day.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />'
  },
  {
    title: 'Stomach Viruses & Food Poisoning',
    description: 'Bypass a compromised digestive system to deliver direct hydration and anti-nausea medication.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />'
  },
  {
    title: 'Migraines',
    description: 'Target severe head pain and sensitivity with high-dose magnesium and anti-inflammatory compounds.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />'
  },
  {
    title: 'Fatigue & Jet Lag',
    description: 'Reboot your energy levels with B-Complex vitamins designed to naturally boost cellular energy.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />'
  },
  {
    title: 'Immune Support',
    description: 'Supercharge your defenses with high-dose Vitamin C and Zinc to fight off incoming illnesses.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />'
  }
];
</script>