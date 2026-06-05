<script setup>
import { ref, computed, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const isMenuOpen = ref(false)
const showBanner = ref(true) // Controls the luxury announcement banner

const links = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About Us', path: '/about' },
  { name: 'Locations', path: '/locations' },
  { name: 'FAQs', path: '/faqs' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Clean up scroll lock if component unmounts
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="relative z-50 flex flex-col">
         
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-500 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div v-if="showBanner" class="bg-navy border-b border-gold/20 flex items-center justify-center py-2.5 px-12 relative z-50 shadow-sm">
        <p class="text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-gold-light text-center">
          Elevate your wellness &bull; Enjoy 10% off your first concierge IV with code <span class="font-bold text-white ml-1">ELEVATE10</span>
        </p>
        <button @click="showBanner = false" class="absolute right-4 md:right-6 text-gold-light/60 hover:text-white transition-colors p-1 cursor-pointer" aria-label="Close announcement">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
</Transition>

    <div class="absolute top-full left-0 right-0 w-full">
      <header class="relative flex items-center justify-between px-6 md:px-16 py-3 md:py-3 bg-transparent lg:bg-white/40 lg:backdrop-blur-sm lg:border-b lg:border-white/10 lg:shadow-sm">

    <div class="flex-1 lg:flex-none flex items-center justify-center lg:justify-start h-16 md:h-24">
        <router-link to="/" @click="closeMenu" class="relative shrink-0 flex items-center">
          <img 
            src="/images/logo-alpha.png"  
            alt="GC IV Concierge Logo" 
            :class="[
              'w-auto object-contain transition-all duration-300 ease-in-out',
              isHomePage ? 'h-20 md:h-20' : 'h-20 md:h-20'
            ]"
          />
        </router-link>
      </div>

      <nav class="hidden lg:flex flex-1 items-center justify-center gap-8 xl:gap-12">
        <router-link 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="text-[10px] font-bold tracking-[0.25em] uppercase text-navy/70 hover:text-gold transition-colors duration-300 whitespace-nowrap"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="hidden lg:flex lg:w-[250px] items-center justify-end">
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
    </div>
  </div>

  <button
    @click="toggleMenu"
    class="lg:hidden fixed bottom-8 right-8 z-[100] w-14 h-14 bg-navy text-gold rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-95 border border-gold/30 cursor-pointer"
    aria-label="Toggle Menu"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-6 h-6 transition-transform duration-500" 
      :class="isMenuOpen ? 'rotate-180' : 'rotate-0'"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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