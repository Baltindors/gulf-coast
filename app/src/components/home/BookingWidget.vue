<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Selection state initialized with mockup defaults
const location = ref('Naples')
const date = ref('')
const time = ref('')
const service = ref('')

const serviceAreas = [
  'Naples', 'Marco Island', 'Sanibel & Captiva', 'Bonita Springs', 'Private Yachts'
]

const handleBooking = () => {
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
  <div class="max-w-6xl mx-auto -mt-16 relative z-20 px-6">
    <div class="bg-white rounded-lg shadow-sm border border-line p-1.5 md:p-3">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-0 items-center">
        
        <div class="px-6 py-4 border-b md:border-b-0 md:border-r border-line flex items-center gap-4">
          <svg class="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <div class="flex-grow">
            <label class="block text-[9px] uppercase tracking-[0.25em] text-slate/60 mb-0.5 font-bold">Select Location</label>
            <select v-model="location" class="w-full bg-transparent text-navy font-serif text-[15px] focus:outline-none appearance-none cursor-pointer">
              <option v-for="area in serviceAreas" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
        </div>

        <div class="px-6 py-4 border-b md:border-b-0 md:border-r border-line flex items-center gap-4">
          <svg class="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div class="flex-grow">
            <label class="block text-[9px] uppercase tracking-[0.25em] text-slate/60 mb-0.5 font-bold">Date</label>
            <input type="date" v-model="date" class="w-full bg-transparent text-navy font-serif text-[15px] focus:outline-none cursor-pointer" />
          </div>
        </div>

        <div class="px-6 py-4 border-b md:border-b-0 md:border-r border-line flex items-center gap-4">
          <svg class="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-grow">
            <label class="block text-[9px] uppercase tracking-[0.25em] text-slate/60 mb-0.5 font-bold">Time</label>
            <select v-model="time" class="w-full bg-transparent text-navy font-serif text-[15px] focus:outline-none appearance-none cursor-pointer">
              <option value="" disabled>Select Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div class="px-6 py-4 border-b md:border-b-0 md:border-r border-line flex items-center gap-4">
          <svg class="w-4 h-4 text-gold/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <div class="flex-grow">
            <label class="block text-[9px] uppercase tracking-[0.25em] text-slate/60 mb-0.5 font-bold">Services</label>
            <select v-model="service" class="w-full bg-transparent text-navy font-serif text-[15px] focus:outline-none appearance-none cursor-pointer">
              <option value="" disabled>Select Service</option>
              <option value="hydration">Hydration Boost</option>
              <option value="immune">Immune Shield</option>
              <option value="hangover">Hangover Rescue</option>
              <option value="beauty">Beauty Glow</option>
            </select>
          </div>
        </div>

        <div class="px-4 py-2">
          <button 
            @click="handleBooking"
            class="w-full bg-navy text-ivory text-[10px] font-bold tracking-[0.25em] py-5 rounded-md uppercase flex items-center justify-center gap-3 hover:bg-navy/90 transition-all duration-300"
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