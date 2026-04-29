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
      <div class="font-serif italic text-[38px] font-medium text-gold leading-none tracking-[0.02em] relative px-1.5 flex items-center">
        <span class="w-3.5 h-px bg-gold absolute -left-3"></span>
        G C
        <span class="w-3.5 h-px bg-gold absolute -right-3"></span>
      </div>
      <div class="font-serif text-[14px] font-medium text-navy tracking-[0.32em] mt-1">IV CONCIERGE</div>
      <div class="font-sans text-[7.5px] tracking-[0.32em] text-slate mt-1.5 uppercase">Premium Mobile Wellness</div>
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
