<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import FaqAccordion from '@/components/faqs/FaqAccordion.vue'
import faqsData from '@/data/faqs.json'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="Knowledge Base"
        title="Frequently Asked"
        accent="Questions"
        description="Everything you need to know about our luxury concierge IV therapy services."
      />
      
      <div class="max-w-3xl mx-auto mt-16">
        <div v-for="category in faqsData" :key="category.id" class="mb-12">
          <h3 class="font-sans text-[11px] font-medium tracking-[0.18em] uppercase text-gold-dark mb-6 border-b border-gold/20 pb-3">
            {{ category.category }}
          </h3>
          <div class="flex flex-col">
            <FaqAccordion 
              v-for="item in category.items" 
              :key="item.id" 
              :item="item" 
            />
          </div>
        </div>
      </div>
      
      <div class="max-w-2xl mx-auto mt-20 text-center bg-ivory-warm p-10 rounded border border-line">
        <h4 class="font-serif text-2xl text-navy mb-3">Still have questions?</h4>
        <p class="text-slate text-sm mb-6">Our concierge team is available to assist you with any inquiries.</p>
        <BaseButton to="/contact" variant="outline-gold">Contact Us</BaseButton>
      </div>
    </div>
  </div>
</template>
