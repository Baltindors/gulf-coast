<script setup>
import { computed } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import privacyData from '@/data/privacy.json'
import termsData from '@/data/terms.json'

const props = defineProps({
  type: { type: String, required: true }
})

const data = computed(() => props.type === 'privacy' ? privacyData : termsData)
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        :title="data.title" 
        tag="Legal Information"
        :description="`Last updated: ${data.lastUpdated}`"
      />
      
      <div class="max-w-3xl mx-auto mt-16 space-y-12">
        <div v-for="(section, index) in data.sections" :key="index">
          <h3 class="font-serif text-2xl text-navy mb-4">{{ section.heading }}</h3>
          <p class="text-slate leading-relaxed">{{ section.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>