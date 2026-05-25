<script setup>
import SectionHeader from '@/components/ui/SectionHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div class="bg-ivory min-h-screen">
    
    <section class="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center min-h-[75vh]">
 <div class="absolute inset-0 z-0 bg-sand flex items-center justify-center border-b border-line">
  <span class="text-navy/40 font-sans tracking-widest uppercase text-sm z-10">[ Placeholder: Golf Course Hero Image ]</span>
</div>
      
      <div class="absolute inset-0 bg-ivory/85 backdrop-blur-[2px] z-0"></div>

      <div class="container relative z-10 mx-auto px-6 md:px-16 text-center">
        <p class="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-gold-dark mb-6">
          Fuel For The Court & Course
        </p>
        <h1 class="font-serif text-5xl md:text-7xl text-navy font-normal leading-[1.05] mb-8 max-w-[800px] mx-auto">
          Peak Performance &<br/>
          <span class="font-script text-gold-dark italic text-[1.1em] block mt-4">Rapid Recovery.</span>
        </h1>
        <p class="text-[16px] text-navy max-w-[600px] mx-auto mb-10 leading-[1.6]">
          Luxury mobile IV hydration and performance protocols delivered directly to the clubhouse, the tennis court, or between holes. So you can play your best in the Florida heat.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Vitality IV', tier: 'Gold' } }" variant="primary">
            Book Pre-Game Energy
          </BaseButton>
          <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Restore IV', tier: 'Platinum' } }" variant="outline-gold">
            Book Post-Match Recovery
          </BaseButton>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 md:px-16 bg-white border-b border-line">
      <div class="container mx-auto">
        <SectionHeader 
          tag="Optimizing Athletic Performance"
          title="The Coastal Vitality"
          accent="Protocol"
          description="Tailored specifically for athletes, club members, and weekend warriors to combat muscle fatigue and destination travel lag."
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 max-w-6xl mx-auto">
          
<div class="flex flex-col gap-6 group">
            <div class="aspect-[4/3] rounded-lg relative overflow-hidden shadow-sm group/img">
               <img 
                 src="/images/pre-game.jpg" 
                 alt="Pre-Game Energy and Focus" 
                 class="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
               />
               <div class="absolute inset-4 border border-gold/40 z-10 pointer-events-none"></div>
            </div>
            <div>
              <h3 class="font-serif text-3xl text-navy mb-3">Pre-Game: Energy & Focus</h3>
              <p class="text-slate leading-relaxed mb-6">
                Sustain peak power and energy through every set and back nine. The <strong>Coastal Vitality IV</strong> includes B-Complex, B12, and Taurine to sharpen mental clarity and keep you strategy-focused under the intense sun.
              </p>
              <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Vitality IV', tier: 'Gold' } }" variant="ghost" class="!px-0 !justify-start">
                Explore The Vitality Package &rarr;
              </BaseButton>
            </div>
          </div>

<div class="flex flex-col gap-6 group">
            <div class="aspect-[4/3] rounded-lg relative overflow-hidden shadow-sm group/img">
               <img 
                 src="/images/post-game2.jpg" 
                 alt="Post-Game Rapid Recovery" 
                 class="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
               />
               <div class="absolute inset-4 border border-gold/40 z-10 pointer-events-none"></div>
            </div>
            <div>
              <h3 class="font-serif text-3xl text-navy mb-3">Post-Game: Rapid Recovery</h3>
              <p class="text-slate leading-relaxed mb-6">
                Reduce muscle cramping, soreness, and dehydration. The <strong>Coastal Restore IV</strong> floods your system with Magnesium, Glutathione, and essential electrolytes so you can get back to your sport faster and fresher.
              </p>
              <BaseButton :to="{ path: '/contact', query: { service: 'Coastal Restore IV', tier: 'Platinum' } }" variant="ghost" class="!px-0 !justify-start">
                Explore The Restore Package &rarr;
              </BaseButton>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-24 px-6 md:px-16 bg-ivory-warm">
      <div class="container mx-auto max-w-5xl text-center">
        <h2 class="font-serif text-4xl text-navy mb-16">The Athlete's Advantage</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-gold/20 shadow-sm">
              <svg class="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 class="font-serif text-xl text-navy mb-3">Unmatched Endurance</h4>
            <p class="text-sm text-slate">Sustain peak power and energy through every set and back nine while preventing muscle fatigue.</p>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-gold/20 shadow-sm">
              <svg class="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="font-serif text-xl text-navy mb-3">Rapid Recovery</h4>
            <p class="text-sm text-slate">Immediately reduce muscle cramping and soreness to get back to your sport faster and fresher.</p>
          </div>
          
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 border border-gold/20 shadow-sm">
              <svg class="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 class="font-serif text-xl text-navy mb-3">Court & Course Focus</h4>
            <p class="text-sm text-slate">Sharpen mental clarity and stay strategy-focused even under the intense Florida heat.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-32 px-6 md:px-16 bg-navy text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#C1A172 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="container mx-auto relative z-10">
        <h2 class="font-serif text-4xl md:text-5xl text-ivory mb-6">Elevate Your Next Tournament</h2>
        <p class="text-ivory/70 max-w-lg mx-auto mb-10">
          Hosting a member-guest tournament or corporate golf retreat? We partner with yacht clubs, marinas, and luxury resorts to offer pop-up wellness bars and VIP guest activations.
        </p>
        <BaseButton :to="{ path: '/inquire', query: { type: 'Partnership' } }" variant="outline-gold">
          Inquire About Club Partnerships
        </BaseButton>      </div>
    </section>

  </div>
</template>