<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PackageCard from '@/components/packages/PackageCard.vue'
import packagesData from '@/data/packages.json'

const { packages, addons, custom_hydration } = packagesData
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="THE LUXURY MENU"
        title="Signature IV"
        accent="Infusions"
        description="Choose from our tiered wellness protocols, each expertly formulated for maximum cellular absorption."
      />
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
        <PackageCard v-for="pkg in packages" :key="pkg.id" :pkg="pkg" />
      </div>

      <div class="mt-32 max-w-4xl mx-auto bg-white border border-gold/20 p-12 text-center rounded-lg shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold/30"></div>
        <div class="w-16 h-16 bg-ivory-warm rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/20">
          <svg class="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 class="font-serif text-3xl text-navy mb-2">{{ custom_hydration.name }}</h3>
        <p class="font-sans text-[11px] tracking-luxury text-gold uppercase mb-4">Starting at ${{ custom_hydration.starting_price }}</p>
        <p class="text-slate max-w-lg mx-auto leading-relaxed mb-8">{{ custom_hydration.description }} ({{ custom_hydration.base }})</p>
        <p class="text-[10px] text-slate/50 italic">For advanced protocols, select a signature IV above.</p>
      </div>

      <div class="mt-32 border-t border-gold/20 pt-20">
        <div class="text-center mb-16">
          <h4 class="font-sans text-[11px] tracking-[0.3em] uppercase text-navy font-bold">Treatment Add-ons</h4>
          <div class="w-12 h-px bg-gold mx-auto mt-4"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          <div v-for="(items, category) in addons" :key="category" class="group">
            <h5 class="font-serif text-xl text-navy border-b border-gold/10 pb-3 mb-6 uppercase tracking-widest group-hover:text-gold transition-colors">
              {{ category }}
            </h5>
            <ul class="space-y-4">
              <li v-for="item in items" :key="item.name || item.amount" class="flex justify-between items-baseline group/item">
                <span class="text-[13px] text-slate group-hover/item:text-navy transition-colors">{{ item.name || item.amount }}</span>
                <div class="flex-grow border-b border-dotted border-gold/20 mx-2"></div>
                <span class="font-serif text-navy font-medium">${{ item.price }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>