<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import packagesData from '@/data/packages.json'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import AddonSelector from '@/components/booking/AddonSelector.vue'
import BookingSuccess from '@/components/booking/BookingSuccess.vue'
import PatientStatusStep from '@/components/booking/PatientStatusStep.vue'
import BookingSummary from '@/components/booking/BookingSummary.vue'
import TreatmentStep from '@/components/booking/TreatmentStep.vue'
import ServiceDetailsStep from '@/components/booking/ServiceDetailsStep.vue'

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

// Helper to convert military time to AM/PM for the email
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === 'ASAP') return timeStr
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

// Helper to create the Google Calendar Link
  const generateCalLink = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    const title = encodeURIComponent(`IV Booking: ${formData.value.firstName} (${selectedPackageName.value})`)
    
    // Format date for Google (YYYYMMDD) - removing hyphens
    const dateStamp = formData.value.date.replace(/-/g, '')
    
    // Use the 24h time for the link start (assuming 1 hour duration)
    const startTime = formData.value.time === 'ASAP' ? '080000' : formData.value.time.replace(':', '') + '00'
    const endHour = formData.value.time === 'ASAP' ? '09' : (parseInt(formData.value.time.split(':')[0]) + 1).toString().padStart(2, '0')
    const endTime = formData.value.time === 'ASAP' ? '090000' : endHour + formData.value.time.split(':')[1] + '00'
    
    const details = encodeURIComponent(
      `Client: ${formData.value.firstName} ${formData.value.lastName}\n` +
      `Phone: ${formData.value.phone}\n` +
      `Package: ${selectedPackageName.value} (${selectedTierName.value})\n` +
      `Add-ons: ${selections.value.vitamins.map(v => v.name).join(', ')}\n` +
      `Total: $${totalPrice.value}\n` +
      `Notes: ${formData.value.notes}`
    )
    const location = encodeURIComponent(formData.value.address)
    
    return `${baseUrl}&text=${title}&dates=${dateStamp}T${startTime}/${dateStamp}T${endTime}&details=${details}&location=${location}`
  }

  const bookingSummary = {
    "_subject": `New Booking: ${formData.value.date} @ ${formatTime(formData.value.time)} - ${formData.value.firstName} ${formData.value.lastName}`,
    "--- CALENDAR ---": generateCalLink(), // Formspree will make this a clickable link
    "Full Name": `${formData.value.firstName} ${formData.value.lastName}`,
    "Email": formData.value.email,
    "Phone": formData.value.phone,
    "Date": formData.value.date,
    "Time": formatTime(formData.value.time),
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
      
      <Transition enter-active-class="transition duration-700 ease-out" enter-from-class="opacity-0 translate-y-8" enter-to-class="opacity-100 translate-y-0">
        <BookingSuccess v-if="isSuccess" />
      </Transition>

      <div v-if="!isSuccess" class="animate-in fade-in duration-500">
        <SectionHeader title="Finalize Your" accent="Reservation" />

        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 mt-12">
          <div class="lg:w-2/3 space-y-8">
            <PatientStatusStep v-model="patientStatus" :error="errors.status" />

            <TreatmentStep 
              :packages="packages" 
              :available-tiers="availableTiers"
              :selected-package="selectedPackageName"
              :selected-tier="selectedTierName"
              :errors="errors"
              @update:package="val => selectedPackageName = val"
              @update:tier="val => selectedTierName = val"
            />

            <AddonSelector :addons="addons" @update:selections="val => selections = val" />

            <ServiceDetailsStep 
              v-model="formData" 
              :errors="errors" 
              :time-options="timeOptions" 
              :today="today" 
            />
            
          </div>

          <div class="lg:w-1/3">
            <BookingSummary 
              :selected-package="selectedPackageName"
              :selected-tier="selectedTierName"
              :base-price="basePrice"
              :requires-GFE="requiresGFE"
              :is-after-hours="isAfterHours"
              :selections="selections"
              :total-price="totalPrice"
              :is-submitting="isSubmitting"
              :error="errors.form"
              @submit="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>