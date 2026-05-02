<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import PackageCard from '@/components/packages/PackageCard.vue' // Reuse the card logic
import TrustIcons from '@/components/home/TrustIcons.vue'
import BookingWidget from '@/components/home/BookingWidget.vue'
import packagesData from '@/data/packages.json'
import AOS from 'aos'
import 'aos/dist/aos.css'

const showSplash = ref(true)

onMounted(() => {
  // Hide splash screen after 2.5 seconds
  setTimeout(() => {
    showSplash.value = false
  }, 2500)

  // Initialize AOS
  AOS.init({
    duration: 1200, // slow and graceful
    easing: 'ease-out-quad',
    once: true,
    offset: 120
  })
})

const featuredPackages = computed(() => {
  // Filters packages where the top-level 'featured' is true
  return packagesData.packages.filter(pkg => pkg.featured === true).slice(0, 3)
})

</script>

<template>
  <div>
    <!-- Mobile Splash Screen -->
    <Transition name="splash">
      <div v-if="showSplash" class="fixed inset-0 z-[100] md:hidden bg-navy flex items-center justify-center">
        <img 
          src="/images/logo_footer.jpg" 
          alt="Gulf Coast IV" 
          class="w-48 h-auto animate-pulse"
        />
      </div>
    </Transition>

    <section class="relative h-[70vh] min-h-[50vh] flex items-center pt-24">
      <div class="absolute inset-0 z-0">
        <img src="/images/banner_desktop.png" alt="Luxury IV Therapy" class="w-full h-full object-cover" />
      </div>
      
      <div class="container relative z-10 mx-auto px-6 md:px-16 text-center">
        <p class="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-gold-dark mb-6">Naples &bull; Marco Island &bull; SWFL</p>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-[84px] text-navy font-normal leading-[1.05] mb-8 max-w-[900px] mx-auto">
          Elevated Wellness.<br/>
          <span class="font-script text-gold-dark italic text-[1.1em] block mt-4">Delivered.</span>
        </h1>
        <p class="text-[16px] text-navy max-w-[600px] mx-auto mb-10 leading-[1.6]">
          Luxury IV therapy, delivered directly to you. hotel, or yacht by licensed medical professionals.
        </p>
      </div>
    </section>

    <BookingWidget />

    <section class="py-32 px-6 md:px-16 bg-ivory">
      <div class="container mx-auto">
        <SectionHeader 
          tag="Curated For You"
          title="Most Popular"
          accent="Treatments"
          description="Discover our most requested concierge IV infusions, expertly formulated to restore your vitality."
          data-aos="fade-up"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PackageCard 
            v-for="(pkg, index) in featuredPackages" 
            :key="pkg.id" 
            :pkg="pkg" 
            data-aos="fade-up"
            :data-aos-delay="index * 200"
          />
        </div>
        
        <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="400">
          <BaseButton to="/packages" variant="outline-gold">View All Packages & Tiers</BaseButton>
        </div>
      </div>
    </section>

    <!-- How It Works Preview -->
    <section class="py-32 px-6 md:px-16 bg-ivory-warm">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div class="relative w-full aspect-[4/5] rounded overflow-hidden shadow-md" data-aos="fade-up">
              <img 
                src="/images/Wellness_Lifestyle.jpg" 
                alt="Luxury Wellness Lifestyle" 
                class="w-full h-full object-cover"
              />
  <div class="absolute inset-4 border border-gold/40"></div>
</div>
          </div>
          <div>
            <p class="font-sans uppercase tracking-[0.18em] text-[11px] font-medium text-gold-dark mb-4" data-aos="fade-up" data-aos-delay="100">Effortless Wellness</p>
            <h2 class="font-serif text-5xl font-normal text-navy leading-[1.1] mb-8" data-aos="fade-up" data-aos-delay="200">
              Luxury concierge <br/>
              <span class="font-script text-[48px] text-gold block mt-2">at your doorstep.</span>
            </h2>
            <p class="text-slate mb-10 leading-relaxed text-[16px]" data-aos="fade-up" data-aos-delay="300">
              We've reimagined wellness to fit seamlessly into your lifestyle. No waiting rooms, no travel—just unparalleled care where and when you need it most.
            </p>
            
            <ul class="flex flex-col gap-8 mb-12">
              <li class="flex items-start gap-5" data-aos="fade-up" data-aos-delay="400">
                <span class="font-serif text-2xl text-gold font-medium italic mt-1">01.</span>
                <div>
                  <h4 class="font-serif text-xl text-navy mb-1">Select Your Treatment</h4>
                  <p class="text-sm text-slate">Choose from our curated menu of premium IV blends.</p>
                </div>
              </li>
              <li class="flex items-start gap-5" data-aos="fade-up" data-aos-delay="500">
                <span class="font-serif text-2xl text-gold font-medium italic mt-1">02.</span>
                <div>
                  <h4 class="font-serif text-xl text-navy mb-1">Choose Location</h4>
                  <p class="text-sm text-slate">We travel to your residence, resort, office, or yacht.</p>
                </div>
              </li>
              <li class="flex items-start gap-5" data-aos="fade-up" data-aos-delay="600">
                <span class="font-serif text-2xl text-gold font-medium italic mt-1">03.</span>
                <div>
                  <h4 class="font-serif text-xl text-navy mb-1">Receive Expert Care</h4>
                  <p class="text-sm text-slate">Relax as our licensed nurses administer your infusion.</p>
                </div>
              </li>
            </ul>
            
            <div data-aos="fade-up" data-aos-delay="700">
              <BaseButton to="/how-it-works" variant="primary">Learn More</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust / Benefits -->
    <section class="py-32 px-6 md:px-16 bg-white border-y border-line">
      <div class="container mx-auto">
        <TrustIcons />
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-40 px-6 md:px-16 bg-navy relative text-center overflow-hidden">
      <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(#B89668 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="container relative z-10 mx-auto max-w-3xl">
        <h2 class="font-serif text-5xl md:text-6xl text-ivory mb-6 leading-[1.1]" data-aos="fade-up">
          Ready to elevate <br/>
          <span class="font-script text-gold block mt-2">your well-being?</span>
        </h2>
        <p class="text-ivory/70 text-lg mb-10 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Experience the ultimate in mobile hydration and nutrient therapy. Book your concierge appointment today.
        </p>
        <div data-aos="fade-up" data-aos-delay="200">
          <BaseButton to="/contact" variant="outline-gold">Book Appointment</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.splash-enter-active,
.splash-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.splash-enter-from,
.splash-leave-to {
  opacity: 0;
}
</style>
