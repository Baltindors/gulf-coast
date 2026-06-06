<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen" v-if="treatment">
    <div class="container mx-auto px-6 md:px-16 max-w-6xl">
      
      <router-link to="/packages" class="inline-flex items-center text-xs font-bold tracking-[0.2em] text-slate/80 hover:text-gold uppercase mb-8 transition-colors relative z-10">
        <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Treatments Menu
      </router-link>

<!-- Hero Banner Section -->
<div class="relative rounded-[2rem] overflow-hidden shadow-2xl mb-16 bg-navy border border-line/20">
        <img 
          :src="bannerImagePath" 
          alt="Clinical Formulation Banner" 
          class="absolute z-0 inset-0 w-full h-full object-cover"
        />
<div class="absolute z-10 inset-0 bg-gradient-to-b from-navy/95 via-navy/80 to-navy/10 lg:bg-gradient-to-r lg:from-navy/95 lg:from-30% lg:via-navy/60 lg:via-55% lg:to-transparent lg:to-75% pointer-events-none"></div>
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center p-6 md:p-12 lg:p-16">
          <div class="lg:col-span-8 animate-fade-in-up">
            <span class="text-xs font-bold tracking-[0.25em] text-gold uppercase block mb-3 drop-shadow-sm">Clinical Treatment Profile</span>
            <h1 class="text-4xl md:text-5xl font-serif text-ivory font-semibold mb-4 leading-tight drop-shadow-md">
              {{ treatment.name }}
            </h1>
            <p class="text-lg font-serif text-gold italic mb-6">
              Primary Indication: {{ treatmentMeta.benefit }}
            </p>
            <p class="text-ivory/90 text-sm leading-relaxed max-w-2xl font-light">
              Administered intravenously by our licensed Registered Nurses under strict medical director protocol. Designed for 100% bioavailability and immediate cellular action.
            </p>
          </div>
          
<div class="lg:col-span-4 bg-white/75 backdrop-blur-md border border-white/30 p-4 lg:p-4 rounded-xl text-center shadow-xl animate-fade-in-up" style="animation-delay: 0.15s;">            <div class="py-2">
              <button 
                @click="scrollToTiers"
                class="w-full bg-navy hover:bg-navy-soft text-ivory text-xs font-bold tracking-[0.2em] py-4 rounded-md uppercase transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Configure & Book
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border border-line rounded-xl p-8 md:p-12 mb-16 shadow-sm">
        <div class="border-b border-line pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-2xl font-serif text-navy font-semibold">Clinical Formulation Breakdown</h2>
            <p class="text-slate text-xs mt-1">Medical-grade active ingredients sourced from FDA-registered facilities.</p>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-green-50 text-green-700 border border-green-200">
            <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span> 100% Bioavailable
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(desc, ingredient) in treatmentMeta.ingredients" 
            :key="ingredient"
            class="flex gap-4 items-start p-4 rounded-lg bg-ivory/50 border border-line/50 hover:border-gold/25 transition-colors"
          >
            <div class="w-8 h-8 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0 font-serif text-sm font-semibold border border-gold/15">
              {{ ingredient.charAt(0) }}
            </div>
            <div>
              <h4 class="font-serif text-base text-navy font-semibold mb-1">{{ ingredient }}</h4>
              <p class="text-slate text-xs leading-relaxed">{{ desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        
        <div class="bg-white border border-line rounded-xl p-8 shadow-sm">
          <h3 class="text-xl font-serif text-navy font-semibold mb-6 pb-3 border-b border-line">Targeted Relief Areas</h3>
          <p class="text-slate text-xs mb-6">This specific treatment protocol is clinically indicated for the management and relief of the following symptoms:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              v-for="symptom in treatmentMeta.symptoms" 
              :key="symptom"
              class="flex items-center gap-3 p-3 rounded bg-red-50/40 border border-red-100/50"
            >
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
              <span class="text-xs text-navy font-medium">{{ symptom }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white border border-line rounded-xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-serif text-navy font-semibold mb-6 pb-3 border-b border-line">Safety & Administration</h3>
            <p class="text-slate text-xs leading-relaxed mb-4">
              Prior to starting the infusion, our Registered Nurse will complete a medical intake, record vital signs, and consult our Medical Director if necessary.
            </p>
            <p class="text-slate text-xs leading-relaxed mb-6">
              All vascular access is established using single-use, sterile catheters in a clean, sanitized patient environment.
            </p>
          </div>
          <div class="border-t border-line pt-6 flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h5 class="text-xs font-bold uppercase tracking-wider text-navy">Medically Directed</h5>
              <p class="text-[11px] text-slate">Physician-developed safety guidelines for every client.</p>
            </div>
          </div>
        </div>

      </div>

      <div id="tiers-section" class="bg-white border border-line rounded-xl p-8 md:p-12 mb-16 shadow-sm">
        <div class="text-center mb-12">
          <span class="text-[9px] font-bold tracking-[0.2em] text-gold uppercase block mb-1">Therapeutic Scaling</span>
          <h3 class="text-2xl font-serif text-navy font-semibold">Select Your Clinical Tier</h3>
          <p class="text-slate text-xs mt-2 max-w-lg mx-auto">Scale the therapeutic concentration and ingredients based on your clinical presentation.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="tier in treatment.tiers" 
            :key="tier.level"
            :class="[
              'border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 relative',
              tier.mostPopular ? 'border-gold shadow-md bg-white ring-1 ring-gold/30' : 'border-line hover:border-gold/30'
            ]"
          >
            <div v-if="tier.mostPopular" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-[8px] font-bold tracking-[0.2em] px-3.5 py-1 uppercase rounded-full">
              Highly Recommended
            </div>

            <div>
              <div class="flex justify-between items-baseline border-b border-line pb-4 mb-6">
                <div>
                  <h4 class="font-serif text-lg text-navy font-semibold uppercase tracking-wider">{{ tier.level }}</h4>
                  <span class="text-[9px] text-slate/50 tracking-wider">Protocol Tier</span>
                </div>
                <span class="text-2xl font-serif text-navy font-bold">${{ tier.price }}</span>
              </div>

              <ul class="space-y-3 mb-8">
                <li v-for="feature in tier.features" :key="feature" class="flex items-start text-xs text-slate">
                  <span class="text-gold mr-2.5 text-[10px] mt-0.5">●</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <router-link 
              :to="{ path: '/contact', query: { service: treatment.name, tier: tier.level }}"
              class="w-full text-center bg-navy hover:bg-navy-soft text-ivory text-[9px] font-bold tracking-[0.2em] py-3.5 rounded uppercase block transition-colors shadow-sm"
            >
              Choose {{ tier.level }}
            </router-link>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-line bg-ivory/30 p-6 rounded-lg">
          <h4 class="font-serif text-sm text-navy font-bold mb-2">Upgrade Guidance:</h4>
          <p class="text-slate text-xs leading-relaxed">
            {{ treatmentMeta.upgradeBenefits }} We also offer individual additive vitamins, amino acids, and medication booster shots (Zofran, Toradol, NAD+) which can be compounded into your drip on-site by your nurse.
          </p>
        </div>
      </div>

    </div>
  </div>
  <div v-else class="bg-ivory pt-40 pb-40 text-center min-h-screen">
    <div class="container mx-auto px-6">
      <p class="text-slate text-base">Loading treatment profile...</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import packagesData from '@/data/packages.json'

const route = useRoute()

// Retrieve dynamic package
const treatment = computed(() => {
  return packagesData.packages.find(p => p.id === route.params.id)
})

// Explicit Map: Matches your 5 JSON package IDs directly to your images.
const bannerImagePath = computed(() => {
  if (!treatment.value) return '/images/treatment-banner-1.png'
  
  // INTERCEPT: Check for context queries on the Coastal Reset package
  if (treatment.value.id === 'coastal-reset') {
    if (route.query.context === 'Virus') {
      return '/images/treatment-banner-4.png' // Stomach virus context
    }
    // Default / Hangover context
    return '/images/treatment-banner-5.png'
  }

  const imageMap = {
    'hydration-immunity': '/images/treatment-banner-3.png',
    'coastal-restore': '/images/treatment-banner-3.png',
    'coastal-vitality': '/images/treatment-banner-2.png',
    'coastal-radiance': '/images/treatment-banner-1.png'
  }
  
  // Returns the exact image mapped above, or defaults to the 6th image if a new package is added later.
  return imageMap[treatment.value.id] || '/images/treatment-banner-6.jpg'
})

const scrollToTiers = () => {
  document.getElementById('tiers-section')?.scrollIntoView({ behavior: 'smooth' })
}

// Meta mapping for medical aesthetic details
const treatmentMetaMap = {
  'hydration-immunity': {
    benefit: 'Rapid Intravenous Rehydration & Proactive Immune System Fortification',
    symptomText: 'General fatigue, early cold/flu symptoms, dehydration, travel exhaustion, dry skin, immune depletion',
    symptoms: ['Systemic Dehydration', 'Seasonal Allergies', 'Mild Cold & Flu Symptoms', 'Post-Flight Jet Lag', 'Muscle Cramping'],
    ingredients: {
      'Normal Saline or LR': '1000mL IV fluid base providing immediate restoration of blood volume and core vascular hydration.',
      'Vitamin C': 'High-potency antioxidant that neutralizes free radicals, boosts phagocyte function, and supports collagen pathways.',
      'Zinc Sulfate': 'Essential trace mineral that blocks viral replication cycles and supports natural killer cell activity.',
      'Vitamin B12': 'Methylcobalamin cofactor that fuels cellular metabolism, myelin maintenance, and red blood cell production.',
      'B-Complex Vitamins': 'Synergistic blend (B1, B2, B3, B5, B6) necessary for mitochondrial energy conversion and neurotransmitter synthesis.',
      'Magnesium Chloride': 'Vascular and neural cofactor that relaxes smooth muscle, regulates heart rhythm, and alleviates tension.'
    },
    upgradeBenefits: 'Upgrading from Silver to Gold adds Zinc and Vitamin B12 for targeted immune defense and cellular energy. Moving to Platinum scales the formula with B-Complex and Magnesium, delivering full neuromuscular relaxation and metabolic support.'
  },
  'coastal-reset': {
    benefit: 'Rapid Symptom Alleviation & Acute Hangover / Food Poisoning Recovery',
    symptomText: 'Nausea, headache, stomach viruses, food poisoning, photosensitivity, vomiting',
    symptoms: ['Acute Alcohol Hangover', 'Food Poisoning Symptoms', 'Stomach Flu / Gastroenteritis', 'Debilitating Head Migraines', 'Vomiting & Fluid Loss'],
    ingredients: {
      'Normal Saline or LR': '1000mL fluid volume to flush out toxins, alcohol metabolites, and quickly re-establish vascular hydration.',
      'Zofran (Ondansetron)': 'Clinical-strength IV anti-emetic that halts nausea and vomiting by blocking peripheral and central serotonin receptors.',
      'Toradol (Ketorolac)': 'Powerful IV non-steroidal anti-inflammatory (NSAID) that halts prostaglandin synthesis to eliminate head pain and body aches.',
      'Pepcid (Famotidine)': 'H2 blocker that reduces stomach acid production, treating acid reflux and gastrointestinal lining inflammation.',
      'B-Complex Vitamins': 'Replaces vital B coenzymes depleted during hepatic clearance of alcohol and metabolic toxins.'
    },
    upgradeBenefits: 'Silver provides 1 medication. Upgrading to Gold includes 2 medications (e.g. Zofran + Toradol) and B-Complex for dual-action pain and nausea relief. Platinum provides 3 active medications and Magnesium for complete neurological and digestive reset.'
  },
  'coastal-restore': {
    benefit: 'Systemic Detoxification, Liver Support & Athletic Recovery',
    symptomText: 'Toxin exposure, physical fatigue, intensive exercise recovery, chronic stress, cellular depletion',
    symptoms: ['Oxidative Stress', 'Systemic Inflammation', 'Post-Exercise Soreness', 'Chronic Stress Exhaustion', 'Toxic Toxin Accumulation'],
    ingredients: {
      'Normal Saline or LR': 'Intravenous vehicle supplying direct fluid replacement to optimize hepatic and renal filtration.',
      'Glutathione': 'The master antioxidant. Actively binds to heavy metals and free radicals, facilitating liver detoxification and cellular repair.',
      'B-Complex Vitamins': 'Coenzymes that facilitate cellular respiration, fatty acid oxidation, and systemic carbohydrate metabolism.',
      'Magnesium Chloride': 'Alleviates intracellular calcium overload, relaxing hypertonic muscle fibers and lowering arterial tension.',
      'Vitamin B12': 'Boosts cellular division rates and neural repair, speeding up systemic tissue and energy recovery.'
    },
    upgradeBenefits: 'Silver includes 400mg Glutathione. Upgrading to Gold scales Glutathione to 600mg and adds Magnesium & B12 for superior muscle and neurological repair. Platinum provides 800mg Glutathione and Zinc to optimize protein synthesis and cell repair.'
  },
  'coastal-vitality': {
    benefit: 'Mitochondrial ATP Energy Optimization & Physical Stamina Support',
    symptomText: 'Chronic fatigue, jet lag, brain fog, post-travel exhaustion, low stamina',
    symptoms: ['Mitochondrial Energy Depletion', 'Travel Jet Lag', 'Brain Fog & Focus Loss', 'Physical Stamina Decline', 'Adrenal Fatigue Symptoms'],
    ingredients: {
      'Normal Saline or LR': 'Restores circulating blood volume to improve tissue perfusion and oxygen delivery to vital organs.',
      'Taurine': 'Conditional amino acid that supports cardiovascular function, skeletal muscle performance, and cellular osmoregulation.',
      'Vitamin B12': 'Crucial cofactor in the Krebs cycle, converting carbohydrates and fats into usable cellular energy (ATP).',
      'B-Complex Vitamins': 'High-dose blend that acts as catalysts for metabolic pathways in brain cells and muscle tissue.',
      'Magnesium Chloride': 'Necessary for ATP binding and cellular energy release, relieving metabolic fatigue.'
    },
    upgradeBenefits: 'Silver delivers basic B-Complex and Taurine. Upgrading to Gold incorporates Magnesium to bind and activate ATP molecules for muscle stamina. Platinum introduces Zinc to bolster cellular recovery, cellular immunity, and athletic protein synthesis.'
  },
  'coastal-radiance': {
    benefit: 'High-Dose Cellular Glow & Anti-Aging Revitalization',
    symptomText: 'Dull skin tone, thin hair, brittle nails, toxic accumulation, skin aging',
    symptoms: ['Skin Pigmentation & Dullness', 'Fine Lines & Wrinkles', 'Hair Follicle Weakness', 'Brittle Nails & Keratin Loss', 'Systemic Oxidative Loading'],
    ingredients: {
      'Normal Saline': 'A clean fluid base providing optimal diluent support for high-concentration vitamin infusions.',
      'Glutathione (High Dose)': 'Directly blocks tyrosinase to inhibit melanin synthesis, visibly brightening skin tone while clearing free radicals.',
      'Vitamin C (High Dose)': 'Essential catalyst for collagen biosynthesis, strengthening skin elasticity and dermal capillary walls.',
      'Biotin': 'Vitamin B7. Fuels keratin synthesis, directly strengthening the hair follicle shaft and the nail matrix structure.'
    },
    upgradeBenefits: 'Gold provides 2000mg Glutathione and 5G Vitamin C. Upgrading to Platinum elevates Glutathione to a therapeutic 3000mg, increases Vitamin C to a clinical 10G protocol, and introduces Biotin for comprehensive hair, skin, and nail revitalization.'
  }
}

const treatmentMeta = computed(() => {
  if (!treatment.value) return {}
  return treatmentMetaMap[treatment.value.id] || {
    benefit: 'Custom Wellness Infusion & Hydration Support',
    symptoms: ['Dehydration', 'Nutritional Deficiencies', 'Lethargy'],
    ingredients: { 'Normal Saline': '1000mL sterile fluid base.' },
    upgradeBenefits: 'Consult with our Registered Nurse on-site to customize your IV with add-on vitamins and medications.'
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-ken-burns {
  animation: kenBurns 20s ease-out infinite alternate;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kenBurns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}
</style>