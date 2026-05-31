<script setup>
import BookingSuccess from '@/components/booking/BookingSuccess.vue'
import { onMounted } from 'vue';

onMounted(() => {
  
  // Fire Meta Pixel 'Schedule' event safely
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Schedule');
  }
});
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <BookingSuccess />
    </div>
  </div>
</template>
