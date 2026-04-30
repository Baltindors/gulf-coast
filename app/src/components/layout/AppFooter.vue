<script setup>
</script>

<template>
  <footer class="bg-navy text-ivory px-16 pt-20 pb-8">
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">
      <!-- Brand -->
      <div>
        <div class="flex flex-col items-start">
          <div class="font-serif italic text-[38px] font-medium text-gold leading-none tracking-[0.02em] relative px-1.5 flex items-center">
            <span class="w-3.5 h-px bg-gold absolute -left-3"></span>
            G C
            <span class="w-3.5 h-px bg-gold absolute -right-3"></span>
          </div>
          <div class="font-serif text-[14px] font-medium text-ivory tracking-[0.32em] mt-1">IV CONCIERGE</div>
          <div class="font-sans text-[7.5px] tracking-[0.32em] text-gold-light mt-1.5 uppercase">Premium Mobile Wellness</div>
        </div>
        <p class="mt-6 text-[13px] text-ivory/70 leading-[1.7] max-w-[320px]">
          Delivering premium, restorative IV therapy directly to your home, hotel, or yacht. Experience the standard in luxury wellness.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="font-serif text-[18px] font-medium text-gold-light mb-5 tracking-[0.04em]">Quick Links</h4>
        <ul class="flex flex-col gap-2.5">
          <li><router-link to="/packages" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Our Packages</router-link></li>
          <li><router-link to="/how-it-works" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">How It Works</router-link></li>
          <li><router-link to="/faqs" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">FAQs</router-link></li>
          <li><router-link to="/contact" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Contact & Booking</router-link></li>
        </ul>
      </div>

      <!-- Service Areas -->
      <div>
        <h4 class="font-serif text-[18px] font-medium text-gold-light mb-5 tracking-[0.04em]">Service Areas</h4>
        <ul class="flex flex-col gap-2.5">
          <li><router-link to="/locations" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Naples</router-link></li>
          <li><router-link to="/locations" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Marco Island</router-link></li>
          <li><router-link to="/locations" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Sanibel & Captiva</router-link></li>
          <li><router-link to="/locations" class="text-[13px] text-ivory/75 hover:text-gold-light transition-colors">Private Yachts</router-link></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="font-serif text-[18px] font-medium text-gold-light mb-5 tracking-[0.04em]">Contact</h4>
        <ul class="flex flex-col gap-2.5">
          <li class="text-[13px] text-ivory/75">
            <span class="block text-gold/60 text-[10px] uppercase tracking-wider mb-0.5">Phone / Text</span>
            (561) 948-1233
          </li>
          <li class="text-[13px] text-ivory/75 mt-2">
            <span class="block text-gold/60 text-[10px] uppercase tracking-wider mb-0.5">Email</span>
            info@gulfcoastiv.com
          </li>
          <li class="text-[13px] text-ivory/75 mt-2">
            <span class="block text-gold/60 text-[10px] uppercase tracking-wider mb-0.5">Hours</span>
            Available Daily, 8am - 8pm
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-[1280px] mx-auto mt-14 pt-6 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.18em] uppercase text-ivory/50">
      <p>&copy; 2026 Gulf Coast IV Concierge. All Rights Reserved.</p>
      <div class="flex gap-6">
        <router-link to="/privacy" class="hover:text-gold-light transition-colors">Privacy Policy</router-link>
        <router-link to="/terms" class="hover:text-gold-light transition-colors">Terms of Service</router-link>
      </div>
    </div>
  </footer>
</template>
