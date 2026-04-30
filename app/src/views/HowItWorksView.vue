<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="bg-ivory pt-32 pb-24 min-h-screen">
    <div class="container mx-auto px-6 md:px-16">
      <SectionHeader 
        tag="The Experience"
        title="How It"
        accent="Works"
        description="Experience the ultimate convenience of luxury IV therapy delivered directly to you."
      />
      
      <div class="max-w-4xl mx-auto mt-24">
        <div class="space-y-24">
          <!-- Step 1 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2 order-2 md:order-1">
              <span class="font-serif text-5xl text-gold/30 font-medium italic mb-4 block">01</span>
              <h3 class="font-serif text-3xl text-navy mb-4">Select Your Treatment</h3>
              <p class="text-slate leading-relaxed">
                Browse our curated menu of premium IV blends or consult with our medical professionals to customize a treatment perfectly suited to your current wellness needs.
              </p>
            </div>
            <div class="md:w-1/2 order-1 md:order-2 w-full">
              <div class="aspect-video bg-sand rounded relative overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/Select_Your_Treatment.jpg" alt="Menu Selection" class="w-full h-full object-cover" />
                <div class="absolute inset-4 border border-gold/40"></div>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2 order-2 md:order-1">
              <div class="aspect-video bg-sand rounded relative overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/Choose_Location_Time.jpg" alt="Location Booking" class="w-full h-full object-cover" />
                <div class="absolute inset-4 border border-gold/40"></div>
              </div>
            </div>
            <div class="md:w-1/2 order-1 md:order-2">
              <span class="font-serif text-5xl text-gold/30 font-medium italic mb-4 block">02</span>
              <h3 class="font-serif text-3xl text-navy mb-4">Choose Location & Time</h3>
              <p class="text-slate leading-relaxed">
                Select your preferred date, time, and location. Our fully mobile concierge team travels to private residences, hotels, offices, and yachts across Southwest Florida.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2 order-2 md:order-1">
              <span class="font-serif text-5xl text-gold/30 font-medium italic mb-4 block">03</span>
              <h3 class="font-serif text-3xl text-navy mb-4">Complete Brief Intake</h3>
              <p class="text-slate leading-relaxed">
                Prior to your appointment, you'll complete a brief, secure medical history form online to ensure your chosen treatment is safe and optimally effective for you.
              </p>
            </div>
            <div class="md:w-1/2 order-1 md:order-2 w-full">
              <div class="aspect-video bg-sand rounded relative overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/Complete_Brief_Intake.jpg" alt="Medical Consultation" class="w-full h-full object-cover" />
                <div class="absolute inset-4 border border-gold/40"></div>
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2 w-full">
              <div class="aspect-video bg-sand rounded relative overflow-hidden flex items-center justify-center shadow-sm">
                <img src="/images/Receive_Concierge_Service.jpg" alt="IV Treatment" class="w-full h-full object-cover" />
                <div class="absolute inset-4 border border-gold/40"></div>
              </div>
            </div>
            <div class="md:w-1/2">
              <span class="font-serif text-5xl text-gold/30 font-medium italic mb-4 block">04</span>
              <h3 class="font-serif text-3xl text-navy mb-4">Receive Concierge Service</h3>
              <p class="text-slate leading-relaxed">
                Sit back and relax as our licensed Registered Nurse arrives, performs a brief assessment, and administers your IV in the comfort and privacy of your chosen setting.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-32 text-center">
          <BaseButton to="/contact" variant="primary">Book Your Experience</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
