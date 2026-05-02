<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const isMenuOpen = ref(false)

const links = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Locations', path: '/locations' },
  { name: 'FAQs', path: '/faqs' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Prevent scrolling when menu is open
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <header class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 md:py-7">
    
    <div class="hidden lg:flex flex-1"></div>

    <div class="flex-1 lg:flex-none flex items-center justify-center">
      <router-link to="/" @click="closeMenu" class="shrink-0">
        <img 
          src="/images/logo_v2.png" 
          alt="Gulf Coast IV Concierge Logo" 
          class="h-[140px] md:h-[220px] w-auto object-contain transition-all duration-300 -my-10 md:-my-12 translate-y-2 md:translate-y-4"
        />
      </router-link>
    </div>

    <nav class="hidden lg:flex flex-1 items-center justify-center gap-10">
      <router-link 
        v-for="link in links" 
        :key="link.path" 
        :to="link.path"
        class="text-[10px] font-bold tracking-[0.25em] uppercase text-navy/70 hover:text-gold transition-colors duration-300"
      >
        {{ link.name }}
      </router-link>
    </nav>

    <div class="hidden lg:flex flex-1 items-center justify-end gap-4">
      <BaseButton 
        to="/contact" 
        :variant="isHomePage ? 'primary' : 'ghost'"
        :class="[
          'shadow-sm transition-all duration-300 whitespace-nowrap',
          isHomePage ? '!bg-gold !text-white border-gold' : ''
        ]"
      >
        Book Now
      </BaseButton>
    </div>
  </header>

  <button 
    @click="toggleMenu"
    class="lg:hidden fixed bottom-8 right-8 z-[100] w-14 h-14 bg-navy text-gold rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-95 border border-gold/30"
    aria-label="Toggle Menu"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-6 h-6 transition-transform duration-500" 
      :class="isMenuOpen ? 'rotate-180' : 'rotate-0'"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
  </button>

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-if="isMenuOpen" class="lg:hidden fixed inset-0 z-[90] bg-navy flex flex-col items-center justify-center p-8">
      <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#C1A172 1px, transparent 1px); background-size: 30px 30px;"></div>
      
      <nav class="flex flex-col items-center gap-8 relative z-10">
        <router-link 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          @click="closeMenu"
          class="text-ivory text-xl font-serif tracking-[0.2em] uppercase hover:text-gold transition-colors"
        >
          {{ link.name }}
        </router-link>
        
        <div class="h-px w-12 bg-gold/30 my-4"></div>

        <BaseButton 
          to="/contact" 
          @click="closeMenu"
          variant="outline-gold"
          class="!text-sm !px-12 !py-4"
        >
          Book Now
        </BaseButton>
      </nav>
    </div>
  </Transition>
</template>