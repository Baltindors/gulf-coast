<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import packagesData from '@/data/packages.json'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AddonSelector from '@/components/booking/AddonSelector.vue'

const route = useRoute()
const { packages, addons } = packagesData

/**
 * UI & SUBMISSION STATE
 */
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errors = ref({}) // Tracks field-level validation errors

/**
 * INITIAL SELECTION LOGIC
 */
const selectedPackageName = ref(route.query.service || '')
const selectedTierName = ref(route.query.tier || '') 
const patientStatus = ref(null)

const selections = ref({
  vitamins: [],
  glutathione: null,
  medications: []
})

/**
 * SERVICE DETAILS DATA
 */
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',       
  notes: '',         
  location: route.query.location || '',
  serviceType: '',                      
  date: route.query.date || '',         
  time: route.query.time || '',         
})

const updateAddons = (newSelections) => {
  selections.value = newSelections
}

const today = new Date().toISOString().split('T')[0]

const timeOptions = [
  { label: 'ASAP', value: 'ASAP' },
  { label: '6:00 am', value: '06:00' },
  { label: '7:00 am', value: '07:00' },
  { label: '8:00 am', value: '08:00' },
  { label: '9:00 am', value: '09:00' },
  { label: '10:00 am', value: '10:00' },
  { label: '11:00 am', value: '11:00' },
  { label: '12:00 pm', value: '12:00' },
  { label: '1:00 pm', value: '13:00' },
  { label: '2:00 pm', value: '14:00' },
  { label: '3:00 pm', value: '15:00' },
  { label: '4:00 pm', value: '16:00' },
  { label: '5:00 pm', value: '17:00' },
  { label: '6:00 pm', value: '18:00' },
  { label: '7:00 pm', value: '19:00' },
  { label: '8:00 pm', value: '20:00' },
  { label: '9:00 pm', value: '21:00' },
  { label: '10:00 pm', value: '22:00' },
  { label: '11:00 pm', value: '23:00' },
]

/**
 * DYNAMIC SELECTION & PRICING LOGIC
 */
const availableTiers = computed(() => {
  const pkg = packages.find(p => p.name === selectedPackageName.value || p.id === selectedPackageName.value)
  return pkg ? pkg.tiers : []
})

const isAfterHours = computed(() => {
  if (formData.value.time === 'ASAP' || !formData.value.time) return false
  const hour = parseInt(formData.value.time.split(':')[0])
  return hour >= 20 || hour < 8
})

const basePrice = computed(() => {
  if (!selectedPackageName.value) return 0
  const pkg = packages.find(p => p.id === selectedPackageName.value || p.name === selectedPackageName.value)
  if (!pkg) return 0
  const tier = pkg.tiers.find(t => t.level === selectedTierName.value)
  return tier?.price || pkg.tiers[0].price
})

const requiresGFE = computed(() => patientStatus.value === 'new' || patientStatus.value === 'changed')

const totalPrice = computed(() => {
  let total = basePrice.value
  if (requiresGFE.value) total += 30 
  if (isAfterHours.value) total += 120 
  selections.value.vitamins.forEach(v => total += v.price)
  if (selections.value.glutathione) total += selections.value.glutathione.price
  selections.value.medications.forEach(m => total += m.price)
  return total
})

/**
 * VALIDATION LOGIC
 */
const validateForm = () => {
  const newErrors = {}
  
  if (!patientStatus.value) newErrors.status = 'Please select your patient status'
  if (!selectedPackageName.value) newErrors.package = 'Please select a treatment package'
  if (!selectedTierName.value) newErrors.tier = 'Please select a tier'
  
  if (!formData.value.firstName) newErrors.firstName = 'Required'
  if (!formData.value.email) newErrors.email = 'Required'
  if (!formData.value.phone) newErrors.phone = 'Required'
  if (!formData.value.address) newErrors.address = 'Required'
  if (!formData.value.location) newErrors.location = 'Required'
  if (!formData.value.date) newErrors.date = 'Required'
  
  errors.value = newErrors
  
  // If there are errors, scroll to the first one
  if (Object.keys(newErrors).length > 0) {
    const firstError = Object.keys(newErrors)[0]
    console.warn('Validation failed:', firstError)
    return false
  }
  
  return true
}

/**
 * SUBMISSION LOGIC
 */
const submitForm = async () => {
  // Clear previous errors
  errors.value = {}
  
  if (!validateForm()) return

  isSubmitting.value = true

  const bookingSummary = {
    "Full Name": `${formData.value.firstName} ${formData.value.lastName}`,
    "Email": formData.value.email,
    "Phone": formData.value.phone,
    "Date": formData.value.date,
    "Time": formData.value.time,
    "Location": formData.value.location,
    "Address": formData.value.address,
    "Setting": formData.value.serviceType,
    "Package": selectedPackageName.value,
    "Tier": selectedTierName.value,
    "Patient Status": patientStatus.value,
    "Needs GFE": requiresGFE.value ? 'Yes (+$30)' : 'No',
    "Vitamins": selections.value.vitamins.map(v => v.name).join(', ') || 'None',
    "Glutathione": selections.value.glutathione?.amount || 'None',
    "Medications": selections.value.medications.map(m => m.name).join(', ') || 'None',
    "After Hours": isAfterHours.value ? 'Yes (+$120)' : 'No',
    "Estimated Total": `$${totalPrice.value}`,
    "Notes": formData.value.notes
  }

  try {
    const response = await fetch('https://formspree.io/f/mrejeknb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingSummary)
    })

    if (response.ok) {
      isSuccess.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Handle server-side errors
      const data = await response.json()
      errors.value = { form: data.error || 'There was a problem sending your request.' }
    }
  } catch (error) {
    errors.value = { form: 'Network error. Please check your connection.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      
      <Transition 
        enter-active-class="transition duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="isSuccess" class="max-w-2xl mx-auto text-center py-20">
          <div class="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/30">
            <svg class="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="font-serif text-5xl text-navy mb-6">Request Received</h2>
          <p class="text-slate text-lg leading-relaxed mb-10">
            Thank you for choosing Gulf Coast IV Concierge. A licensed professional will review your details and contact you shortly via phone or text to finalize your appointment.
          </p>
          <BaseButton to="/" variant="outline-gold">Return Home</BaseButton>
        </div>
      </Transition>

      <div v-if="!isSuccess" class="animate-in fade-in duration-500">
        <SectionHeader title="Finalize Your" accent="Reservation" />

        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 mt-12">
          <div class="lg:w-2/3 space-y-8">
            
            <div :class="['bg-white p-8 rounded border shadow-sm relative overflow-hidden transition-colors', errors.status ? 'border-red-300' : 'border-gold/20']">
              <div class="absolute top-0 left-0 w-1 h-full bg-gold"></div>
              <h4 class="font-serif text-2xl text-navy mb-2">Patient Status</h4>
              <p class="text-xs text-slate mb-6">
                A Good Faith Exam ($30) is required for new patients or if your medical history has changed.
              </p>
              
              <div class="flex flex-col gap-4">
                <button @click="patientStatus = 'new'" :class="['p-4 border rounded-sm text-left transition-all', patientStatus === 'new' ? 'border-gold bg-gold/5' : 'border-line']">
                  <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">New Patient</span>
                  <span class="text-xs text-slate">First-time booking (Initial $30 GFE required)</span>
                </button>
                <button @click="patientStatus = 'changed'" :class="['p-4 border rounded-sm text-left transition-all', patientStatus === 'changed' ? 'border-gold bg-gold/5' : 'border-line']">
                  <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">Returning Patient - Health Changes</span>
                  <span class="text-xs text-slate">My medical condition or medications have changed (Updated $30 GFE required)</span>
                </button>
                <button @click="patientStatus = 'returning'" :class="['p-4 border rounded-sm text-left transition-all', patientStatus === 'returning' ? 'border-gold bg-gold/5' : 'border-line']">
                  <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">Returning Patient - No Changes</span>
                  <span class="text-xs text-slate">No health changes since my last successful GFE</span>
                </button>
              </div>
              <p v-if="errors.status" class="text-[10px] text-red-500 mt-4 uppercase tracking-widest font-bold">{{ errors.status }}</p>
            </div>

            <div :class="['bg-white p-8 rounded border shadow-sm transition-colors', (errors.package || errors.tier) ? 'border-red-300' : 'border-gold/20']">
              <h4 class="font-serif text-2xl text-navy mb-6">Select Treatment</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <select v-model="selectedPackageName" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
                    <option value="">Choose a Package</option>
                    <option v-for="pkg in packages" :key="pkg.id" :value="pkg.name">{{ pkg.name }}</option>
                  </select>
                  <span v-if="errors.package" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">{{ errors.package }}</span>
                </div>
                <div class="flex flex-col">
                  <select v-model="selectedTierName" :disabled="!selectedPackageName" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
                    <option value="">Choose a Tier</option>
                    <option v-for="tier in availableTiers" :key="tier.level" :value="tier.level">{{ tier.level }}</option>
                  </select>
                  <span v-if="errors.tier" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">{{ errors.tier }}</span>
                </div>
              </div>
            </div>

            <AddonSelector :addons="addons" @update:selections="updateAddons" />

            <div class="bg-white p-8 rounded border border-gold/20 shadow-sm">
              <h4 class="font-serif text-2xl text-navy mb-6">Service Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <input type="text" v-model="formData.firstName" placeholder="First Name *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.firstName ? 'border-red-400' : 'border-line']" />
                  <span v-if="errors.firstName" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
                </div>
                <input type="text" v-model="formData.lastName" placeholder="Last Name" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
                <div class="flex flex-col">
                  <input type="email" v-model="formData.email" placeholder="Email Address *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.email ? 'border-red-400' : 'border-line']" />
                  <span v-if="errors.email" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
                </div>
                <div class="flex flex-col">
                  <input type="tel" v-model="formData.phone" placeholder="Phone Number *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.phone ? 'border-red-400' : 'border-line']" />
                  <span v-if="errors.phone" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
                </div>
                <div class="md:col-span-2 flex flex-col">
                  <input type="text" v-model="formData.address" placeholder="Service Address (Street, City, Zip) *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.address ? 'border-red-400' : 'border-line']" />
                  <span v-if="errors.address" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Full Address Required</span>
                </div>

                <select v-model="formData.serviceType" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
                  <option value="">Setting: Home, Hotel, or Yacht?</option>
                  <option value="Home">Private Residence</option>
                  <option value="Hotel">Hotel / Resort</option>
                  <option value="Yacht">Private Yacht</option>
                </select>

                <div class="flex flex-col">
                  <select v-model="formData.location" :class="['appearance-none border-b py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent transition-colors', errors.location ? 'border-red-400' : 'border-line']">
                    <option value="">Select Service Area *</option>
                    <option value="Naples">Naples</option>
                    <option value="Marco Island">Marco Island</option>
                    <option value="Sanibel & Captiva">Sanibel & Captiva</option>
                    <option value="Bonita Springs">Bonita Springs</option>
                  </select>
                  <span v-if="errors.location" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
                </div>

                <div class="flex flex-col">
                  <input type="date" v-model="formData.date" :min="today" :class="['appearance-none border-b py-4 h-14 outline-none focus:border-gold text-base md:text-sm text-navy bg-transparent transition-colors', errors.date ? 'border-red-400' : 'border-line']" />
                  <span v-if="errors.date" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
                </div>

                <select v-model="formData.time" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
                  <option value="">Preferred Time</option>
                  <option v-for="t in timeOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
                </select>

                <textarea v-model="formData.notes" placeholder="Additional Notes (Gate codes, specific symptoms, etc.)" class="md:col-span-2 border-b border-line py-3 outline-none focus:border-gold text-sm h-24"></textarea>
              </div>
              <p class="text-[10px] text-slate mt-6 italic">
                * Note: A $120 after-hours fee applies for services scheduled at or after 8:00 PM.
              </p>
            </div>
          </div>

          <div class="lg:w-1/3">
            <div class="bg-navy text-ivory p-8 rounded-lg sticky top-32 shadow-xl border border-gold/30">
              <h3 class="font-serif text-xl border-b border-gold/20 pb-4 mb-6 uppercase tracking-widest">Booking Summary</h3>
              
              <div class="space-y-4 mb-8">
                <div v-if="selectedPackageName" class="flex justify-between text-sm">
                  <span class="capitalize">{{ selectedPackageName }} ({{ selectedTierName }})</span>
                  <span class="font-medium">${{ basePrice }}</span>
                </div>
                
                <div v-if="requiresGFE" class="flex justify-between text-xs text-gold-light italic">
                  <span>Good Faith Exam Fee</span>
                  <span>+$30</span>
                </div>

                <div v-if="isAfterHours" class="flex justify-between text-xs text-gold-light italic">
                  <span>After-Hours Service Fee</span>
                  <span>+$120</span>
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

              <div class="space-y-3">
                <BaseButton 
                  variant="outline-gold" 
                  class="w-full" 
                  @click="submitForm"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else>Complete Request</span>
                </BaseButton>
                
                <p v-if="errors.form" class="text-[11px] text-red-400 text-center font-bold uppercase tracking-wider">{{ errors.form }}</p>
              </div>

              <p class="text-[10px] text-ivory/40 text-center italic mt-4">Final price confirmed upon clinical assessment.</p>
              <div class="flex justify-center my-4">
                <div class="w-12 h-px bg-gold/30"></div>
              </div>
              <p class="text-[8px] uppercase tracking-widest text-ivory/30 text-center leading-[1.6]">
                The statements made regarding these products have not been evaluated by the FDA. Our services are wellness-oriented and are not intended to diagnose, treat, cure, or prevent any medical condition or disease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>