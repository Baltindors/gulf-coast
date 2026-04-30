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
      <div class="max-w-3xl mx-auto w-full mb-20 relative overflow-hidden rounded-lg border border-gold/20 shadow-md bg-white">
        <img 
          src="/images/Service_Map.jpg" 
          alt="Gulf Coast IV Concierge Service Area Map" 
          class="w-full h-auto block"
        />
        <div class="absolute inset-4 border border-gold/10 pointer-events-none rounded-sm"></div>
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
