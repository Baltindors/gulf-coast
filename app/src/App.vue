<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
// Check if we are on the homepage
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans text-ink bg-ivory relative">
    <AppHeader />
    <main 
      class="flex-grow transition-all duration-300"
      :class="[
        isHome ? 'pt-0 lg:pt-0' : 'pt-24 lg:pt-0'
      ]"
    >
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>