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
        class="bg-white border border-line rounded-xl flex flex-col justify-between overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300 group" 
        data-aos="fade-up" 
        :data-aos-delay="index * 100"
      >
        <div>
          <!-- Banner Image -->
          <div class="relative h-48 w-full overflow-hidden bg-ivory-warm">
            <img 
              :src="caseItem.image" 
              :alt="caseItem.demographic" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div class="p-6 md:p-8">
            <!-- Patient Header: Role/Demographic -->
            <div class="mb-4">
              <span class="text-[9px] font-bold tracking-wider text-gold-dark uppercase block mb-0.5">{{ caseItem.demographic }}</span>
              <h4 class="font-serif text-[15px] font-semibold text-navy">Patient Profile</h4>
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
        </div>

        <!-- Clinical Treatment Recommendation -->
        <div class="border-t border-line pt-6 px-6 md:px-8 pb-6 md:pb-8 mt-auto">
          <span class="text-[9px] font-bold tracking-wider text-slate/60 uppercase block mb-2">Recommended Protocol</span>
          <h5 class="font-serif text-[15px] text-navy font-semibold mb-1 group-hover:text-gold transition-colors">
            {{ caseItem.treatment }}
          </h5>
          <p class="text-slate text-xs leading-relaxed mb-4">
            {{ caseItem.treatmentDetails }}
          </p>
          <router-link 
            :to="{ path: `/treatments/${caseItem.treatmentId}`, query: caseItem.context ? { context: caseItem.context } : undefined }" 
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
    context: 'Hydration',
    treatmentDetails: '1L Normal Saline or Lactated Ringer’s base infused with Vitamin C and Zinc to quickly restore fluid volumes and cellular electrolytes.',
    image: '/images/hydration-imunity.png'
  },
  {
    demographic: 'Executive / Event Attendee',
    symptom: 'Acute Alcohol Hangover',
    presentation: 'Presents with headache, nausea, photosensitivity, and brain fog resulting from alcohol consumption and toxin accumulation.',
    treatment: 'Coastal Reset IV',
    treatmentId: 'coastal-reset',
    context: 'Hangover',
    treatmentDetails: 'Targeted formulation with IV anti-nausea (Zofran) and anti-inflammatory medications to flush toxins and relieve headaches.',
    image: '/images/coastal-reset-1.png'
  },
  {
    demographic: 'Vacationer / Hospitality Worker',
    symptom: 'Stomach Virus / Food Poisoning',
    presentation: 'Presents with acute gastrointestinal distress, vomiting, diarrhea, and inability to retain fluids orally, leading to fast-onset dehydration.',
    treatment: 'Coastal Reset IV',
    treatmentId: 'coastal-reset',
    context: 'Virus',
    treatmentDetails: 'Direct IV hydration that bypasses a compromised digestive system, supplying immediate anti-nausea meds and core hydration.',
    image: '/images/coastal-reset-2.png'
  },
  {
    demographic: 'Fitness Enthusiast / Athlete',
    symptom: 'Post-Workout Muscle Recovery',
    presentation: 'Presents with intense muscle soreness, physical exhaustion, and dehydration following heavy training, marathons, or intense athletic competition.',
    treatment: 'Coastal Restore IV',
    treatmentId: 'coastal-restore',
    context: 'Recovery',
    treatmentDetails: 'Infused with high-dose Glutathione to clear oxidative stress, plus Magnesium and B-Complex to soothe muscle aches and accelerate cellular repair.',
    image: '/images/costal-restore.png'
  },
  {
    demographic: 'Frequent Traveler / Shift Worker',
    symptom: 'Chronic Fatigue & Jet Lag',
    presentation: 'Presents with low physical energy, disrupted sleep cycles, brain fog, and lagging cognitive focus due to travel or high stress.',
    treatment: 'Coastal Vitality IV',
    treatmentId: 'coastal-vitality',
    context: 'Fatigue',
    treatmentDetails: 'Formulated with active B-Complex vitamins, B12, and Taurine to recharge cellular mitochondria and naturally boost systemic energy.',
    image: '/images/coastal-vitality.png'
  },
  {
    demographic: 'Bridal / Wellness Enthusiast',
    symptom: 'Dull Complexion & Aging',
    presentation: 'Presents with dull skin, loss of elasticity, or simply desires a vibrant, youthful glow for an upcoming special event or routine maintenance.',
    treatment: 'Coastal Radiance IV',
    treatmentId: 'coastal-radiance',
    context: 'Complexion',
    treatmentDetails: 'A powerful "Glow Therapy" blend featuring 2000mg+ of Glutathione, High-Dose Vitamin C, and Biotin to brighten skin and boost collagen.',
    image: '/images/costal-radiance.png'
  }
];
</script>

<style scoped>
/* Clinical card shadow enhancements */
</style>