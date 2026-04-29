<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline-gold', 'ghost'].includes(value)
  },
  to: {
    type: [String, Object],
    default: null
  }
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase border border-transparent rounded-sm transition-all duration-250 cursor-pointer'
  
  const variants = {
    'primary': 'bg-navy text-ivory hover:bg-navy-soft',
    'outline-gold': 'border-gold text-gold bg-transparent hover:bg-gold hover:text-white',
    'ghost': 'border-gold text-navy bg-transparent px-5 py-2.5 text-[9.5px] hover:bg-gold hover:text-white'
  }

  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <router-link v-if="to" :to="to" :class="classes">
    <slot></slot>
  </router-link>
  <button v-else :class="classes">
    <slot></slot>
  </button>
</template>
