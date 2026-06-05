<template>
  <div class="max-w-7xl mx-auto px-4">
    
    <div class="text-center mb-16" data-aos="fade-up">
      <span class="text-xs font-bold tracking-[0.25em] text-gold uppercase block mb-3">Clinical Directory</span>
      <h2 class="text-3xl md:text-4xl font-serif text-navy font-semibold">Symptom-Targeted Medical Protocols</h2>
      <p class="mt-4 text-base text-slate max-w-2xl mx-auto">
        Every protocol is medically supervised and customized to address specific clinical symptoms, ensuring optimal hydration and cellular restoration.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="(caseItem, index) in patientCases" 
        :key="caseItem.symptom" 
        class="bg-white border border-line rounded-xl p-8 flex flex-col justify-between hover:shadow-md hover:border-gold/30 transition-all duration-300 group" 
        data-aos="fade-up" 
        :data-aos-delay="index * 100"
      >
        <div>
          <!-- Patient Header: Avatar and Role/Demographic -->
          <div class="flex items-center gap-4 mb-6">
            <div class="relative w-16 h-16 rounded-full bg-ivory-warm border border-gold/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
              <svg class="w-12 h-12 text-navy/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" v-html="caseItem.avatarSvg"></svg>
              <!-- Medical cross badge -->
              <span class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-navy border border-white flex items-center justify-center text-[10px] text-gold font-bold">+</span>
            </div>
            <div>
              <span class="text-[9px] font-bold tracking-wider text-gold-dark uppercase block mb-0.5">{{ caseItem.demographic }}</span>
              <h4 class="font-serif text-[15px] font-semibold text-navy">Patient Profile</h4>
            </div>
          </div>

          <!-- Symptom / Presentation -->
          <div class="mb-6">
            <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-red-50 text-red-700 border border-red-100 mb-2">
              Symptom: {{ caseItem.symptom }}
            </span>
            <p class="text-slate text-xs leading-relaxed">
              {{ caseItem.presentation }}
            </p>
          </div>
        </div>

        <!-- Clinical Treatment Recommendation -->
        <div class="border-t border-line pt-6 mt-4">
          <span class="text-[9px] font-bold tracking-wider text-slate/60 uppercase block mb-2">Recommended Protocol</span>
          <h5 class="font-serif text-[15px] text-navy font-semibold mb-1 group-hover:text-gold transition-colors">
            {{ caseItem.treatment }}
          </h5>
          <p class="text-slate text-xs leading-relaxed mb-4">
            {{ caseItem.treatmentDetails }}
          </p>
          <router-link 
            :to="`/treatments/${caseItem.treatmentId}`" 
            class="inline-flex items-center text-[10px] font-bold tracking-[0.15em] text-navy uppercase group-hover:text-gold transition-colors"
          >
            View Clinical Profile
            <svg class="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const patientCases = [
  {
    demographic: 'Active Athlete / SWFL Resident',
    symptom: 'Dehydration & Immunity Depletion',
    presentation: 'Presents with fatigue, dry mouth, muscle cramping, and heat exhaustion following outdoor activity or prolonged sun exposure.',
    treatment: 'Hydration & Immunity Protocol',
    treatmentId: 'hydration-immunity',
    treatmentDetails: '1L Normal Saline or Lactated Ringer’s base infused with Vitamin C and Zinc to quickly restore fluid volumes and cellular electrolytes.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    `
  },
  {
    demographic: 'Executive / Event Attendee',
    symptom: 'Acute Alcohol Hangover',
    presentation: 'Presents with headache, nausea, photosensitivity, and brain fog resulting from alcohol consumption and toxin accumulation.',
    treatment: 'Coastal Reset IV',
    treatmentId: 'coastal-reset',
    treatmentDetails: 'Targeted formulation with IV anti-nausea (Zofran) and anti-inflammatory medications to flush toxins and relieve headaches.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      <path d="M10 6h4" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    demographic: 'Vacationer / Hospitality Worker',
    symptom: 'Stomach Virus / Food Poisoning',
    presentation: 'Presents with acute gastrointestinal distress, vomiting, diarrhea, and inability to retain fluids orally, leading to fast-onset dehydration.',
    treatment: 'Coastal Reset IV',
    treatmentId: 'coastal-reset',
    treatmentDetails: 'Direct IV hydration that bypasses a compromised digestive system, supplying immediate anti-nausea meds and core hydration.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
    `
  },
  {
    demographic: 'Chronic Sufferer / Professional',
    symptom: 'Systemic Inflammation & Recovery',
    presentation: 'Presents with prolonged recovery times, debilitating aches, oxidative stress, and demands deep cellular repair and replenishment.',
    treatment: 'Coastal Restore IV',
    treatmentId: 'coastal-restore',
    treatmentDetails: 'Infused with high-dose Glutathione, Magnesium, and B-Complex to reduce inflammation, detoxify the liver, and restore baseline wellness.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      <path d="M12 5v2m0 8v2" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    demographic: 'Frequent Traveler / Shift Worker',
    symptom: 'Chronic Fatigue & Jet Lag',
    presentation: 'Presents with low physical energy, disrupted sleep cycles, brain fog, and lagging cognitive focus due to travel or high stress.',
    treatment: 'Coastal Vitality IV',
    treatmentId: 'coastal-vitality',
    treatmentDetails: 'Formulated with active B-Complex vitamins, B12, and Taurine to recharge cellular mitochondria and naturally boost systemic energy.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      <path d="M9 8h6" stroke="currentColor" stroke-width="1"/>
    `
  },
  {
    demographic: 'Bridal / Wellness Enthusiast',
    symptom: 'Dull Complexion & Aging',
    presentation: 'Presents with dull skin, loss of elasticity, or simply desires a vibrant, youthful glow for an upcoming special event or routine maintenance.',
    treatment: 'Coastal Radiance IV',
    treatmentId: 'coastal-radiance',
    treatmentDetails: 'A powerful "Glow Therapy" blend featuring 2000mg+ of Glutathione, High-Dose Vitamin C, and Biotin to brighten skin and boost collagen.',
    avatarSvg: `
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0.5" fill="rgba(193, 161, 114, 0.1)"/>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      <path d="M12 7l1 2h-2z" fill="currentColor"/>
    `
  }
];
</script>

<style scoped>
/* Clinical card shadow enhancements */
</style>