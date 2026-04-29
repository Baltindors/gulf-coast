<script setup>
import { ref } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const isOpen = ref(false)
</script>

<template>
  <div class="border-b border-line last:border-0 py-2">
    <button 
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
    >
      <span class="font-serif text-xl font-medium text-navy group-hover:text-gold transition-colors pr-8">
        {{ item.question }}
      </span>
      <span class="flex-shrink-0 relative w-6 h-6 flex items-center justify-center rounded-full border border-gold/30 group-hover:border-gold transition-colors">
        <span class="absolute w-2.5 h-px bg-gold transition-transform duration-300" :class="{'rotate-180': isOpen}"></span>
        <span class="absolute w-px h-2.5 bg-gold transition-transform duration-300" :class="{'rotate-90': isOpen}"></span>
      </span>
    </button>
    
    <div 
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :class="isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'"
    >
      <p class="text-slate text-sm leading-relaxed pr-12">
        {{ item.answer }}
      </p>
    </div>
  </div>
</template>
