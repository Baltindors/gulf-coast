<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const route = useRoute()
// Update your form refs to react to route query
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: route.query.location || '', // Prefilled from widget
  date: route.query.date || '',         // Prefilled from widget
  time: route.query.time || '',         // Prefilled from widget
  service: route.query.service || '',   // Prefilled from widget
  message: ''
})

</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="Book Your Experience"
        title="Contact &"
        accent="Reservations"
        description="Request your concierge IV therapy appointment or submit an inquiry. Our team will contact you promptly to confirm your reservation."
      />
      
      <div class="max-w-6xl mx-auto mt-16 flex flex-col lg:flex-row gap-16">
        <!-- Contact Info -->
        <div class="lg:w-1/3">
          <div class="bg-white p-10 rounded border border-line shadow-sm h-full flex flex-col justify-center">
            <h3 class="font-serif text-3xl text-navy mb-8">Get in Touch</h3>
            
            <div class="space-y-8">
              <div>
                <span class="block text-gold/80 text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">Direct Line / Text</span>
                <p class="font-sans text-navy text-lg">(561) 948-1233</p>
              </div>
              
              <div>
                <span class="block text-gold/80 text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">Email Address</span>
                <p class="font-sans text-navy text-lg">info@gulfcoastiv.com</p>
              </div>
              
              <div>
                <span class="block text-gold/80 text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">Concierge Hours</span>
                <p class="font-sans text-navy text-lg">Available Daily<br/><span class="text-slate text-sm">8:00 AM - 8:00 PM</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Form UI (Placeholder) -->
        <div class="lg:w-2/3">
          <div class="bg-white p-10 rounded border border-line shadow-sm">
            <form @submit.prevent class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Personal Info -->
              <div class="md:col-span-2">
                <h4 class="font-serif text-xl text-navy mb-4 border-b border-line pb-2">Guest Information</h4>
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">First Name *</label>
                <input type="text" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" placeholder="Jane" />
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Last Name *</label>
                <input type="text" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" placeholder="Doe" />
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Email Address *</label>
                <input type="email" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" placeholder="jane@example.com" />
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Phone Number *</label>
                <input type="tel" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" placeholder="(561) 948-1233" />
              </div>

              <!-- Reservation Details -->
              <div class="md:col-span-2 mt-4">
                <h4 class="font-serif text-xl text-navy mb-4 border-b border-line pb-2">Reservation Details</h4>
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Service Location (City/Zip) *</label>
                <input type="text" v-model="formData.location" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" placeholder="e.g. Naples, 34102" />
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Service Area Type</label>
                <select v-model="formData.service" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option value="">Select an option</option>
                  <option value="residence">Private Residence</option>
                  <option value="hotel">Hotel / Resort</option>
                  <option value="yacht">Private Yacht</option>
                  <option value="office">Office</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Preferred Date</label>
                <input type="date" v-model="formData.date" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors" />
              </div>
              
              <div>
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Preferred Time</label>
                <select v-model="formData.time" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option value="">Select a time</option>
                  <option value="morning">Morning (8am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 4pm)</option>
                  <option value="evening">Evening (4pm - 8pm)</option>
                </select>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Treatment of Interest</label>
                <select class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option value="">Select a treatment</option>
                  <option value="hydration">The Hydration Boost</option>
                  <option value="immune">Immune Shield</option>
                  <option value="hangover">Hangover Rescue</option>
                  <option value="beauty">The Beauty Glow</option>
                  <option value="custom">Not Sure / Custom Blend</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-[11px] font-medium tracking-wider uppercase text-slate mb-2">Additional Notes / Message</label>
                <textarea rows="4" class="w-full bg-ivory-warm/50 border border-gold/30 rounded-sm px-4 py-3 text-navy focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Let us know about any special requests, group sizes, or questions..."></textarea>
              </div>

              <div class="md:col-span-2 mt-4 text-center">
                <BaseButton type="submit" variant="primary" class="w-full md:w-auto md:px-12">Submit Request</BaseButton>
                <p class="text-xs text-slate mt-4 text-center">Our concierge team will review your request and contact you to confirm your appointment details.</p>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
