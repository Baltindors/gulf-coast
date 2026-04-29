<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import packagesData from '@/data/packages.json'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AddonSelector from '@/components/booking/AddonSelector.vue'

const route = useRoute()
const { packages, addons } = packagesData

// Form & Logic State
const selectedPackageName = ref(route.query.service || '')
const selectedTierName = ref(route.query.tier || '')
const isFirstTime = ref(null) 

const selections = ref({
  vitamins: [],
  glutathione: null,
  medications: []
})

const formData = ref({
  firstName: '', lastName: '', email: '', phone: '',
  location: route.query.location || '', serviceType: '',
  date: route.query.date || '', time: route.query.time || '',
  message: ''
})

// Listen to the child component
const updateAddons = (newSelections) => {
  selections.value = newSelections
}

// Pricing Logic
const basePrice = computed(() => {
  const pkg = packages.find(p => p.name === selectedPackageName.value)
  const tier = pkg?.tiers.find(t => t.level === selectedTierName.value || t.name === selectedTierName.value)
  return tier?.price || 0
})

const totalPrice = computed(() => {
  let total = basePrice.value
  if (isFirstTime.value === 'yes') total += 30
  selections.value.vitamins.forEach(v => total += v.price)
  if (selections.value.glutathione) total += selections.value.glutathione.price
  selections.value.medications.forEach(m => total += m.price)
  return total
})
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader title="Finalize Your" accent="Reservation" />

      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 mt-12">
        <div class="lg:w-2/3 space-y-8">
          
          <div class="bg-white p-8 rounded border border-gold/20 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-gold"></div>
            <h4 class="font-serif text-2xl text-navy mb-2">Patient Status</h4>
            <p class="text-xs text-slate mb-6">
              A one-time good faith exam with a provider is required ($30) for new patients. 
            </p>
            
            <div class="flex flex-col md:flex-row gap-4">
              <button @click="isFirstTime = 'yes'" :class="['flex-1 p-4 border rounded-sm text-left transition-all', isFirstTime === 'yes' ? 'border-gold bg-gold/5' : 'border-line']">
                <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">New Patient</span>
                <span class="text-xs text-slate">First-time booking + $30 exam fee</span>
              </button>
              <button @click="isFirstTime = 'no'" :class="['flex-1 p-4 border rounded-sm text-left transition-all', isFirstTime === 'no' ? 'border-gold bg-gold/5' : 'border-line']">
                <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">Returning Patient</span>
                <span class="text-xs text-slate">Exam already completed</span>
              </button>
            </div>
          </div>

          <AddonSelector :addons="addons" @update:selections="updateAddons" />

          <div class="bg-white p-8 rounded border border-gold/20 shadow-sm">
            <h4 class="font-serif text-2xl text-navy mb-6">Service Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" v-model="formData.firstName" placeholder="First Name *" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
              <input type="text" v-model="formData.lastName" placeholder="Last Name *" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
              <input type="email" v-model="formData.email" placeholder="Email Address *" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
              <input type="tel" v-model="formData.phone" placeholder="Phone Number *" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
              
              <select v-model="formData.serviceType" class="border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent">
                <option value="">Setting: Home, Hotel, or Yacht?</option>
                <option value="Home">Private Residence</option>
                <option value="Hotel">Hotel / Resort</option>
                <option value="Yacht">Private Yacht</option>
              </select>

              <select v-model="formData.location" class="border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent">
                <option value="">Select Service Area</option>
                <option value="Naples">Naples</option>
                <option value="Marco Island">Marco Island</option>
                <option value="Sanibel">Sanibel</option>
                <option value="Captiva">Captiva</option>
              </select>

              <input type="date" v-model="formData.date" class="border-b border-line py-3 outline-none focus:border-gold text-sm text-slate" />
              <select v-model="formData.time" class="border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent">
                <option value="">Preferred Time</option>
                <option value="morning">Morning (8am-12pm)</option>
                <option value="afternoon">Afternoon (12pm-4pm)</option>
                <option value="evening">Evening (4pm-8pm)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="lg:w-1/3">
          <div class="bg-navy text-ivory p-8 rounded-lg sticky top-32 shadow-xl border border-gold/30">
            <h3 class="font-serif text-xl border-b border-gold/20 pb-4 mb-6 uppercase tracking-widest">Booking Summary</h3>
            
            <div class="space-y-4 mb-8">
              <div v-if="selectedPackageName" class="flex justify-between text-sm">
                <span>{{ selectedPackageName }} ({{ selectedTierName }})</span>
                <span class="font-medium">${{ basePrice }}</span>
              </div>
              <div v-if="isFirstTime === 'yes'" class="flex justify-between text-xs text-gold-light italic">
                <span>Good Faith Exam</span>
                <span>+$30</span>
              </div>

              <div v-for="v in selections.vitamins" :key="v.name" class="flex justify-between text-[11px] opacity-70">
                <span>+ {{ v.name }}</span>
                <span>${{ v.price }}</span>
              </div>
              
              <div v-if="selections.glutathione" class="flex justify-between text-[11px] opacity-70">
                <span>+ Glutathione ({{ selections.glutathione.amount }})</span>
                <span>${{ selections.glutathione.price }}</span>
              </div>

              <div v-for="m in selections.medications" :key="m.name" class="flex justify-between text-[11px] opacity-70">
                <span>+ {{ m.name }}</span>
                <span>${{ m.price }}</span>
              </div>
            </div>

            <div class="border-t border-gold pb-6 pt-6 flex justify-between items-center mb-8">
              <span class="text-xs uppercase tracking-widest font-bold">Estimated Total</span>
              <span class="text-3xl font-serif text-gold-light">${{ totalPrice }}</span>
            </div>

            <BaseButton variant="outline-gold" class="w-full mb-4">Confirm Booking Request</BaseButton>
            <p class="text-[10px] text-ivory/40 text-center italic">Final price confirmed upon clinical assessment.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>