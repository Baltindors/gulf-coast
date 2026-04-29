<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import LocationCard from '@/components/locations/LocationCard.vue'
import locationsData from '@/data/locations.json'
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="Where We Travel"
        title="Service"
        accent="Areas"
        description="Gulf Coast IV Concierge is a fully mobile service, bringing luxury wellness directly to you across Southwest Florida."
      />
      
      <!-- Map Placeholder -->
      <div class="max-w-4xl mx-auto w-full aspect-[21/9] bg-[#e6ded0] rounded mb-20 relative overflow-hidden flex items-center justify-center border border-gold/20 shadow-sm">
        <div class="absolute inset-4 border border-gold/30"></div>
        <span class="font-mono text-[10px] tracking-widest text-navy bg-ivory px-4 py-2 border border-gold relative z-10">MAP PLACEHOLDER</span>
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#B89668 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <LocationCard 
          v-for="location in locationsData" 
          :key="location.id" 
          :location="location" 
        />
      </div>
    </div>
  </div>
</template>
