<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import partnershipsData from '@/data/partnerships.json'

const route = useRoute()
const router = useRouter()

const industrySlug = computed(() => route.params.industry)
const industryData = computed(() => partnershipsData.industries[industrySlug.value])

onMounted(() => {
  if (!industryData.value) {
    router.push('/404')
    return
  }
  
  // SEO Strategy: Handle private exclusive deals
  if (industryData.value.private) {
    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    // Set to noindex for private negotiated B2B URLs
    robotsMeta.setAttribute('content', 'noindex, nofollow')
  }
  
  // Dynamic Title
  document.title = `${industryData.value.title} Partnership | Gulf Coast IV`
})
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen" v-if="industryData">
    <div class="container mx-auto px-6 md:px-16">
      
<div class="mb-12 relative z-[60]">
  <button 
    @click="router.push({ name: 'partnerships' })" 
    class="inline-flex items-center p-3 -ml-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-navy transition-all duration-200 cursor-pointer"
  >
    <span class="mr-2 text-lg leading-none transform -translate-y-[1px]">&larr;</span> 
    Back to Partnerships Hub
  </button>
</div>

      <SectionHeader 
        tag="PARTNER PROGRAM"
        :title="industryData.title"
        :accent="industryData.accent"
        :description="industryData.description"
      />

      <div class="max-w-4xl mx-auto mt-16 bg-white border border-line p-10 md:p-16 shadow-sm">
        <h3 class="font-serif text-3xl text-navy mb-8 border-b border-gold/20 pb-4">Program Benefits</h3>
        <ul class="space-y-6 mb-12">
          <li v-for="(benefit, index) in industryData.benefits" :key="index" class="flex items-start">
            <svg class="w-6 h-6 text-gold mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-navy text-lg">{{ benefit }}</span>
          </li>
        </ul>

        <div class="bg-navy p-8 text-center mt-12 rounded-sm border border-gold/30">
          <h4 class="font-serif text-2xl text-ivory mb-4">Ready to elevate your service?</h4>
          <p class="text-ivory/70 text-sm mb-8">Contact our partnership director to discuss revenue sharing and logistics.</p>
          <BaseButton :to="{ path: '/inquire', query: { type: 'Partnership', industry: industrySlug } }" variant="outline-gold" class="bg-white/5">
            Inquire About Partnership
          </BaseButton>
        </div>
      </div>
      
    </div>
  </div>
</template>