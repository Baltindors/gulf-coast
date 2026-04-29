<script setup>
defineProps({
  tag: {
    type: String,
    default: 'THE LUXURY STANDARD'
  },
  title: {
    type: String,
    required: true
  },
  accent: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="text-center mb-16">
    <p class="font-sans uppercase tracking-[0.18em] text-[11px] font-medium text-gold-dark mb-3">
      {{ tag }}
    </p>
    <h2 class="font-serif text-5xl font-normal text-navy leading-[1.1]">
      {{ title }}
      <span v-if="accent" class="font-script text-[40px] text-gold block mt-2">{{ accent }}</span>
    </h2>
    <p v-if="description" class="mt-5 mx-auto max-w-[540px] text-slate">
      {{ description }}
    </p>
  </div>
</template>
