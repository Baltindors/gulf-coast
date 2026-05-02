<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const links = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Locations', path: '/locations' },
  { name: 'FAQs', path: '/faqs' }
]
</script>

<template>
<header class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 md:py-7">
  <div class="flex-1 flex items-center justify-start">
    <router-link to="/" class="shrink-0">
      <img 
        src="/images/logo_v2.png" 
        alt="Gulf Coast IV Concierge Logo" 
        class="h-[220px] md:h-[220px] w-auto object-contain transition-all duration-300 -my-8 md:-my-12 translate-y-2 md:translate-y-4"
      />
    </router-link>
  </div>

  <nav class="hidden lg:flex items-center gap-10">
    <router-link 
      v-for="link in links" 
      :key="link.path" 
      :to="link.path"
      class="text-[10px] font-bold tracking-[0.25em] uppercase text-navy/70 hover:text-gold transition-colors duration-300"
    >
      {{ link.name }}
    </router-link>
  </nav>

  <div class="flex-1 flex items-center justify-end gap-4">
    <BaseButton 
      to="/contact" 
      :variant="isHomePage ? 'primary' : 'ghost'"
      :class="[
        'shadow-sm transition-all duration-300 whitespace-nowrap !px-4 md:!px-8 !py-2 md:!py-3.5 !text-[11px] md:!text-[11px]',
        isHomePage ? '!bg-gold !text-white border-gold' : ''
      ]"
    >
      Book Now
    </BaseButton>
  </div>
</header>
</template>
