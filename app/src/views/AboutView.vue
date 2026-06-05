<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16 max-w-6xl">
      
      <!-- Hero Section -->
            <SectionHeader 
        tag="Clinical Oversight & Standards"
        title="Medical Leadership."
        accent="Expert Nursing Care"
        description="At GC IV Concierge, we believe mobile wellness should never compromise on clinical integrity. We operate under strict medical protocols to deliver safe, effective, and professional IV therapy directly to your environment."
      />

<!-- Core Leadership Pillars: Auto-Rotating Interactive Showcase -->
      <div class="mb-24" data-aos="fade-up">
        <!-- Tab Navigation -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            v-for="(pillar, index) in pillars" 
            :key="index"
            @click="setActivePillar(index)"
            :class="[
              'flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300',
              activeIndex === index 
                ? 'bg-white border-gold shadow-md transform -translate-y-1' 
                : 'bg-white/50 border-line/50 hover:bg-white hover:border-gold/50 text-slate/70'
            ]"
          >
            <div :class="['w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors', activeIndex === index ? 'bg-navy/10 text-navy' : 'bg-gray-100 text-gray-400']" v-html="pillar.icon"></div>
            <h3 :class="['font-serif text-lg font-semibold transition-colors', activeIndex === index ? 'text-navy' : 'text-slate/70']">{{ pillar.title }}</h3>
          </button>
        </div>

        <!-- Tab Content Area -->
        <div class="bg-white border border-line rounded-xl p-8 md:p-12 shadow-sm relative min-h-[320px] flex items-center">
          <transition name="fade" mode="out-in">
            <div :key="activeIndex" class="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
              <div>
                <h2 class="font-serif text-3xl text-navy font-semibold mb-6">{{ pillars[activeIndex].title }}</h2>
                <p class="text-slate text-base leading-relaxed" v-html="pillars[activeIndex].description"></p>
              </div>
              <div class="flex items-center lg:border-l lg:border-line lg:pl-10">
                <ul class="space-y-5 w-full">
                  <li v-for="(item, i) in pillars[activeIndex].checklist" :key="i" class="flex items-start text-sm text-slate font-medium bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                    <svg class="w-5 h-5 text-gold mr-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ item }} 
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Clinical Safety Standards Banner -->
      <div class="bg-navy rounded-2xl p-8 md:p-12 text-ivory relative overflow-hidden mb-24" data-aos="fade-up">
        <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#C1A172 1.5px, transparent 1.5px); background-size: 20px 20px;"></div>
        <div class="relative z-10">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div class="max-w-2xl">
              <span class="text-xs font-bold tracking-[0.25em] text-gold uppercase block mb-3">Our Promise</span>
              <h3 class="font-serif text-3xl mb-4 font-semibold">Hospital-Grade Safety, Concierge Convenience</h3>
              <p class="text-ivory/80 text-sm leading-relaxed">
                We adhere to strict sterile compounding guidelines and source all ingredients exclusively from FDA-registered, CGMP-compliant outsourcing pharmacies. Our electronic medical charting is fully HIPAA-secure, and our clinical protocols undergo regular medical director reviews.
              </p>
            </div>
            <div class="flex flex-col gap-4 w-full lg:w-auto shrink-0">
              <div class="bg-white/5 border border-white/10 rounded-lg px-6 py-4 flex items-center gap-4">
                <span class="text-gold font-bold text-lg">100%</span>
                <span class="text-xs text-ivory/70 tracking-wider uppercase">Sourced from FDA Facilities</span>
              </div>
              <div class="bg-white/5 border border-white/10 rounded-lg px-6 py-4 flex items-center gap-4">
                <span class="text-gold font-bold text-lg">HIPAA</span>
                <span class="text-xs text-ivory/70 tracking-wider uppercase">Encrypted Patient Records</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Operational Standards Details Grid -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl font-serif text-navy font-semibold mb-4">Patient Care Workflow</h2>
        <p class="text-slate text-sm max-w-xl mx-auto">Every infusion is delivered via a standardized clinical workflow designed to prioritize safety and optimal therapeutic outcomes.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white border border-line rounded-lg p-8 text-center" data-aos="fade-up" data-aos-delay="100">
          <div class="w-10 h-10 rounded-full bg-navy/5 text-navy border border-gold/15 flex items-center justify-center mx-auto mb-6 text-sm font-bold">1</div>
          <h4 class="font-serif text-lg text-navy font-semibold mb-2">Pre-Screening & Intake</h4>
          <p class="text-slate text-xs leading-relaxed">
            Prior to booking approval, your health history is evaluated for potential contraindications or medication interactions.
          </p>
        </div>
        <div class="bg-white border border-line rounded-lg p-8 text-center" data-aos="fade-up" data-aos-delay="200">
          <div class="w-10 h-10 rounded-full bg-navy/5 text-navy border border-gold/15 flex items-center justify-center mx-auto mb-6 text-sm font-bold">2</div>
          <h4 class="font-serif text-lg text-navy font-semibold mb-2">On-Site Assessment</h4>
          <p class="text-slate text-xs leading-relaxed">
            Your visiting Registered Nurse performs a complete set of vital signs and a physical assessment to confirm you are fit to receive therapy.
          </p>
        </div>
        <div class="bg-white border border-line rounded-lg p-8 text-center" data-aos="fade-up" data-aos-delay="300">
          <div class="w-10 h-10 rounded-full bg-navy/5 text-navy border border-gold/15 flex items-center justify-center mx-auto mb-6 text-sm font-bold">3</div>
          <h4 class="font-serif text-lg text-navy font-semibold mb-2">Sterile Administration</h4>
          <p class="text-slate text-xs leading-relaxed">
            Your IV is started under strict sterile conditions, and your hydration is monitored throughout the 30-45 minute infusion.
          </p>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="mt-20 text-center" data-aos="fade-up">
        <router-link to="/packages" class="inline-block bg-navy hover:bg-navy-soft text-ivory text-xs font-bold tracking-[0.2em] uppercase px-10 py-4.5 rounded-lg border border-navy hover:border-navy-soft shadow transition-all duration-300">
          View Signature Infusions
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'


const activeIndex = ref(0)
let rotationTimer = null

const pillars = [
  {
    title: 'Physician Medical Director Oversight',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
    description: 'Every clinical decision, ingredient dosage, and compounding standard at GC IV Concierge is governed by our dedicated <strong>Medical Director</strong>. Under licensed physician oversight, our protocols are designed to ensure safety, minimize contraindications, and maximize therapeutic benefits.',
    checklist: [
      'Physician-developed IV formulations',
      'Standing orders and clinical guidelines',
      'Ongoing quality assurance and protocol audits'
    ]
  },
  {
    title: 'Administered by Registered Nurses',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>',
    description: 'We do not compromise on staffing. Every single home, hotel, office, or yacht visit is performed by a licensed <strong>Registered Nurse (RN)</strong>. Our RNs carry extensive clinical experience in hospital, ICU, or emergency settings, ensuring expert IV placement and compassionate patient care.',
    checklist: [
      '100% Licensed Registered Nurses (RNs)',
      'Full on-site physical evaluation & vital check',
      'Strict sterile technique and patient monitoring'
    ]
  },
  {
    title: 'Nurse Practitioner Telehealth Clearance',
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 7v6m-3-3h6" /></svg>',
    description: 'Prior to any treatment, every patient completes a secure telehealth evaluation with a licensed <strong>Nurse Practitioner (NP)</strong>. This mandatory clinical screening guarantees that your selected IV therapy is safe and medically appropriate for your specific health history and current symptoms before our team is dispatched.',
    checklist: [
      'Comprehensive medical history and allergy review',
      'Real-time treatment clearance and symptom assessment',
      'Individualized therapy modifications if clinically indicated'
    ]
  }
]

const startRotation = () => {
  rotationTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % pillars.length
  }, 6000) // Rotates every 6 seconds
}

const setActivePillar = (index) => {
  activeIndex.value = index
  // Pause rotation if the user manually interacts with it
  if (rotationTimer) clearInterval(rotationTimer)
}

onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  if (rotationTimer) clearInterval(rotationTimer)
})
</script>

<style scoped>
/* Smooth cross-fade transition for the tab content */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

</style>
