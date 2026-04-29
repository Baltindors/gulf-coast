<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PackageCard from '@/components/packages/PackageCard.vue'
import packagesData from '@/data/packages.json'
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="Our Menu"
        title="IV Therapy"
        accent="Packages"
        description="Explore our curated selection of premium IV treatments, designed to rehydrate, replenish, and revitalize your body."
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <PackageCard 
          v-for="pkg in packagesData" 
          :key="pkg.id" 
          :pkg="pkg" 
        />
      </div>
    </div>
  </div>
</template>
