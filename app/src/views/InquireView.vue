<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  // Pre-fill the inquiry type if it's passed in the URL (e.g., ?type=group)
  inquiryType: route.query.type || '',
  message: ''
})

const submitInquiry = async () => {
  errorMessage.value = ''
  
  if (!formData.value.firstName || !formData.value.email || !formData.value.message) {
    errorMessage.value = 'Please fill out all required fields.'
    return
  }

  isSubmitting.value = true

  const submissionData = {
    "_subject": `New Inquiry: ${formData.value.inquiryType || 'General'} - ${formData.value.firstName} ${formData.value.lastName}`,
    "Name": `${formData.value.firstName} ${formData.value.lastName}`,
    "Email": formData.value.email,
    "Phone": formData.value.phone,
    "Type": formData.value.inquiryType || 'General Question',
    "Message": formData.value.message
  }

  try {
    // Using your existing Formspree endpoint
    const response = await fetch('https://formspree.io/f/mrejeknb', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    })

    if (response.ok) {
      isSuccess.value = true
      // Reset form
      formData.value = { firstName: '', lastName: '', email: '', phone: '', inquiryType: '', message: '' }
    } else {
      errorMessage.value = 'There was a problem sending your message. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'Network error. Please check your connection.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      
      <SectionHeader 
        tag="Get In Touch"
        title="Let's"
        accent="Connect"
        description="Whether you are planning a group event, a corporate wellness retreat, or simply have a question about our services, our concierge team is here to assist you."
      />

      <div class="max-w-3xl mx-auto mt-12 bg-white p-8 md:p-12 rounded-lg border border-gold/20 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-gold"></div>
        
        <div v-if="isSuccess" class="text-center py-16 animate-in fade-in">
          <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
            <svg class="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-serif text-3xl text-navy mb-4">Message Received</h3>
          <p class="text-slate mb-8">Thank you for reaching out. Our concierge team will review your inquiry and contact you shortly.</p>
          <BaseButton variant="outline-gold" @click="isSuccess = false">Send Another Message</BaseButton>
        </div>

        <form v-else @submit.prevent="submitInquiry" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input type="text" v-model="formData.firstName" placeholder="First Name *" class="w-full border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent transition-colors" required />
            </div>
            <div>
              <input type="text" v-model="formData.lastName" placeholder="Last Name" class="w-full border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent transition-colors" />
            </div>
            <div>
              <input type="email" v-model="formData.email" placeholder="Email Address *" class="w-full border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent transition-colors" required />
            </div>
            <div>
              <input type="tel" v-model="formData.phone" placeholder="Phone Number" class="w-full border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent transition-colors" />
            </div>
          </div>

          <div>
            <select v-model="formData.inquiryType" class="w-full appearance-none border-b border-line py-4 outline-none focus:border-gold text-sm bg-transparent text-navy">
              <option value="">What can we help you with?</option>
              <option value="General Question">General Question</option>
              <option value="Group Booking">Group Booking (Wedding, Party, etc.)</option>
              <option value="Corporate Event">Corporate Event / Retreat</option>
              <option value="Partnership">Partnership Opportunity</option>
            </select>
          </div>

          <div>
            <textarea v-model="formData.message" placeholder="Please provide details about your inquiry (group size, event date, specific questions, etc.) *" class="w-full border-b border-line py-3 outline-none focus:border-gold text-sm bg-transparent min-h-[120px] resize-y" required></textarea>
          </div>

          <div v-if="errorMessage" class="text-[11px] text-red-500 font-bold uppercase tracking-widest">
            {{ errorMessage }}
          </div>

          <div class="pt-4">
            <BaseButton type="submit" variant="primary" class="w-full md:w-auto" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </BaseButton>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</template>