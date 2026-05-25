<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="bg-ivory min-h-screen">
    
    <section class="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center min-h-[75vh]">
      <div class="absolute inset-0 z-0 bg-sand flex items-center justify-center border-b border-line">
        <span class="text-navy/40 font-sans tracking-widest uppercase text-sm">[ Placeholder: Elegant Bride / Wedding Party Background Image ]</span>
      </div>
      
      <div class="absolute inset-0 bg-ivory/80 backdrop-blur-[2px] z-0"></div>

      <div class="container relative z-10 mx-auto px-6 md:px-16 text-center">
        <p class="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-gold-dark mb-6">
          Your Premier Partner for Flawless Skin
        </p>
        <h1 class="font-serif text-5xl md:text-7xl text-navy font-normal leading-[1.05] mb-8 max-w-[800px] mx-auto">
          Bridal Wellness &<br/>
          <span class="font-script text-gold-dark italic text-[1.1em] block mt-4">Radiance.</span>
        </h1>
        <p class="text-[16px] text-navy max-w-[600px] mx-auto mb-10 leading-[1.6]">
          Luxury IV therapy delivered directly to your home, resort, or bridal suite. Perfect for your bridal glow prep, or post-celebration recovery for the entire wedding party.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Radiance IV' } }" variant="primary">
            Book Bridal Prep
          </BaseButton>
          <BaseButton :to="{ path: '/inquire', query: { type: 'Group Booking' } }" variant="outline-gold">
            Book Party Recovery
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 md:px-16">
      <div class="container mx-auto">
        <SectionHeader 
          tag="Curated For Weddings"
          title="Bespoke Bridal"
          accent="Experiences"
          description="Whether you are prepping for the photos or recovering from the rehearsal dinner, our licensed nurses bring the clinic to you."
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 max-w-6xl mx-auto">
          
<div class="flex flex-col gap-6 group">
  <div class="aspect-[4/3] rounded-lg relative overflow-hidden shadow-sm group/img">
     <img 
       src="/images/bride.jpg" 
       alt="Bridal Glow and Prep" 
       class="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
     />
     <div class="absolute inset-4 border border-gold/40 z-10 pointer-events-none"></div>
  </div>
  <div>
    <h3 class="font-serif text-3xl text-navy mb-3">Bridal Glow & Prep</h3>
    <p class="text-slate leading-relaxed mb-6">
      Enhance your natural radiance with nutrient protocols designed for flawless, photo-ready skin. Deep cellular hydration, Vitamin C, and Glutathione work together to minimize stress and maximize your bridal glow.
    </p>
    <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Radiance IV', tier: 'Platinum' } }" variant="ghost" class="!px-0 !justify-start">
      Explore The Radiance Package &rarr;
    </BaseButton>
  </div>
</div>

<div class="flex flex-col gap-6 group">
  <div class="aspect-[4/3] rounded-lg relative overflow-hidden shadow-sm group/img">
     <img 
       src="/images/bridesmaids.jpg" 
       alt="Bridesmaids Party Wellness" 
       class="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
     />
     <div class="absolute inset-4 border border-gold/40 z-10 pointer-events-none"></div>
  </div>
  <div>
    <h3 class="font-serif text-3xl text-navy mb-3">Party Wellness Packages</h3>
    <p class="text-slate leading-relaxed mb-6">
      A curated menu for bridesmaids and groomsmen. Hydrate and recover together after the bachelorette party or rehearsal dinner. Fast relief from long nights with group discounts available.
    </p>
    <BaseButton :to="{ path: '/inquire', query: { type: 'Group Booking' } }" variant="ghost" class="!px-0 !justify-start">
      Inquire About Party Recovery &rarr;
    </BaseButton>
  </div>
</div>

        </div>
      </div>
    </section>

    <section class="py-24 px-6 md:px-16 bg-ivory-warm border-y border-line">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="font-serif text-4xl text-navy mb-12">Seamless Coordination for Your Big Day</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="flex flex-col items-center">
            <span class="font-serif text-4xl text-gold mb-4 italic">1.</span>
            <h4 class="font-serif text-xl text-navy mb-2">Schedule Ahead</h4>
            <p class="text-sm text-slate">Lock in your date and venue. We coordinate with your wedding planner to ensure seamless timing.</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-serif text-4xl text-gold mb-4 italic">2.</span>
            <h4 class="font-serif text-xl text-navy mb-2">We Come To You</h4>
            <p class="text-sm text-slate">Our licensed RNs arrive discreetly at your hotel, bridal suite, or private estate.</p>
          </div>
          <div class="flex flex-col items-center">
            <span class="font-serif text-4xl text-gold mb-4 italic">3.</span>
            <h4 class="font-serif text-xl text-navy mb-2">Relax & Enjoy</h4>
            <p class="text-sm text-slate">Enjoy your luxury infusion while getting your hair and makeup done.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-32 px-6 md:px-16 bg-navy text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#C1A172 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="container mx-auto relative z-10">
        <h2 class="font-serif text-4xl md:text-5xl text-ivory mb-6">Inquire About Group Rates</h2>
        <p class="text-ivory/70 max-w-lg mx-auto mb-10">
          Planning for a group of 5 or more? Contact us directly to discuss custom packages, tailored group pricing, and private event scheduling.
        </p>
        <BaseButton :to="{ path: '/inquire', query: { type: 'Group Booking' } }" variant="outline-gold">
          Request Group Booking
        </BaseButton>
      </div>
    </section>

  </div>
</template>