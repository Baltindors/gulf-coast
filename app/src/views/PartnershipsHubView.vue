<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import partnershipsData from '@/data/partnerships.json'

const industries = Object.entries(partnershipsData.industries).filter(([_, data]) => !data.private)
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="B2B PARTNERSHIP PROGRAM"
        :title="partnershipsData.hub.title"
        accent="Become a Partner"
        :description="partnershipsData.hub.description"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-16 mb-24 text-center">
        <div class="p-8 bg-white border border-line shadow-sm rounded-sm">
          <h3 class="font-serif text-2xl text-navy mb-4">Zero Overhead</h3>
          <p class="text-slate text-sm">We provide the medical licensing, supplies, insurance, and elite nursing staff. You provide the introduction.</p>
        </div>
        <div class="p-8 bg-white border border-gold shadow-md rounded-sm scale-105">
          <h3 class="font-serif text-2xl text-navy mb-4">Revenue Share</h3>
          <p class="text-slate text-sm">Unlock a new, high-margin revenue stream. Earn a generous commission on every infusion booked through your network.</p>
        </div>
        <div class="p-8 bg-white border border-line shadow-sm rounded-sm">
          <h3 class="font-serif text-2xl text-navy mb-4">Elite Amenity</h3>
          <p class="text-slate text-sm">Differentiate your brand by offering a modern, highly sought-after luxury wellness amenity to your VIP clients.</p>
        </div>
      </div>

      <div class="mt-20">
        <h3 class="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-gold-dark mb-8 text-center border-b border-gold/20 pb-4 max-w-2xl mx-auto">
          Tailored Programs By Industry
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div v-for="([slug, data]) in industries" :key="slug" class="group border border-gold/20 p-8 hover:bg-white hover:shadow-md transition-all flex flex-col items-start bg-ivory-warm">
            <h4 class="font-serif text-2xl text-navy mb-3 group-hover:text-gold transition-colors">{{ data.title }}</h4>
            <p class="text-sm text-slate mb-8 flex-grow">{{ data.description }}</p>
            <BaseButton :to="`/partnerships/${slug}`" variant="outline-gold" class="w-full">View Program</BaseButton>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>