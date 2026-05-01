<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Locations', path: '/locations' },
  { name: 'FAQs', path: '/faqs' }
]
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-7">
  <router-link to="/" class="flex flex-col items-center text-center">
    <img 
      src="/images/logo_v2.png" 
      alt="Gulf Coast IV Concierge Logo" 
      class="h-[120px] md:h-[130px] w-auto object-contain transition-all duration-300"
    />
  </router-link>

<nav class="hidden md:flex items-center gap-10">
  <router-link 
    v-for="link in links" 
    :key="link.path" 
    :to="link.path"
    class="text-[10px] font-bold tracking-[0.25em] uppercase text-navy/70 hover:text-gold transition-colors duration-300"
  >
    {{ link.name }}
  </router-link>
</nav>

    <div class="flex items-center gap-4">
      <BaseButton to="/contact" variant="ghost">Book Now</BaseButton>
    </div>
  </header>
</template>
