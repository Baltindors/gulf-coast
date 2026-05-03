<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="max-w-2xl mx-auto text-center py-20">
    <div class="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
      <svg class="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 class="font-serif text-5xl text-navy mb-6">Request Received</h2>
    <p class="text-slate text-lg leading-relaxed mb-10">
      Thank you for choosing Gulf Coast IV Concierge. A licensed professional will review your details and contact you shortly via phone or text to finalize your appointment.
    </p>
    <BaseButton to="/" variant="outline-gold">Return Home</BaseButton>
  </div>
</template>