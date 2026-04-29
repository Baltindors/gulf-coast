<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Selection state
const location = ref('')
const date = ref('')
const time = ref('')
const service = ref('')

const serviceAreas = [
  'Naples', 'Marco Island', 'Sanibel & Captiva', 'Bonita Springs', 'Private Yachts'
]

const handleBooking = () => {
  // Push to contact page with query parameters for pre-filling
  router.push({
    path: '/contact',
    query: {
      location: location.value,
      date: date.value,
      time: time.value,
      service: service.value
    }
  })
}
</script>

<template>
  <div class="max-w-6xl mx-auto -mt-12 relative z-20 px-4">
    <div class="bg-white rounded-xl shadow-md border border-line p-2 md:p-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-0 items-center">
        
        <div class="px-6 py-3 border-b md:border-b-0 md:border-r border-line">
          <label class="block text-[10px] uppercase tracking-widest text-slate mb-1">Select Location</label>
          <select v-model="location" class="w-full bg-transparent text-navy font-medium focus:outline-none appearance-none cursor-pointer">
            <option value="" disabled>Select Area</option>
            <option v-for="area in serviceAreas" :key="area" :value="area">{{ area }}</option>
          </select>
        </div>

        <div class="px-6 py-3 border-b md:border-b-0 md:border-r border-line">
          <label class="block text-[10px] uppercase tracking-widest text-slate mb-1">Date</label>
          <input type="date" v-model="date" class="w-full bg-transparent text-navy font-medium focus:outline-none cursor-pointer" />
        </div>

        <div class="px-6 py-3 border-b md:border-b-0 md:border-r border-line">
          <label class="block text-[10px] uppercase tracking-widest text-slate mb-1">Time</label>
          <select v-model="time" class="w-full bg-transparent text-navy font-medium focus:outline-none appearance-none cursor-pointer">
            <option value="" disabled>Select Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div class="px-6 py-3 border-b md:border-b-0 md:border-r border-line">
          <label class="block text-[10px] uppercase tracking-widest text-slate mb-1">Services</label>
          <select v-model="service" class="w-full bg-transparent text-navy font-medium focus:outline-none appearance-none cursor-pointer">
            <option value="" disabled>Select Service</option>
            <option value="hydration">Hydration Boost</option>
            <option value="immune">Immune Shield</option>
            <option value="hangover">Hangover Rescue</option>
            <option value="beauty">Beauty Glow</option>
          </select>
        </div>

        <div class="px-4 py-2">
          <button 
            @click="handleBooking"
            class="w-full bg-navy text-ivory text-[11px] font-bold tracking-[0.2em] py-4 rounded uppercase flex items-center justify-center gap-3 hover:bg-navy-soft transition-colors"
          >
            Book Now
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>