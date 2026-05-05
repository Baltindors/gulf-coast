<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'

import { ref, computed } from 'vue'

const props = defineProps({
  selectedPackage: String,
  selectedTier: String,
  basePrice: Number,
  requiresGFE: Boolean,
  isAfterHours: Boolean,
  selections: Object,
  totalPrice: Number,
  isSubmitting: Boolean,
  error: String
})

const emit = defineEmits(['submit', 'apply-coupon'])

const couponInput = ref('')
const appliedDiscount = ref(0)
const couponError = ref('')
const appliedCode = ref('')

const handleApplyCoupon = () => {
  couponError.value = ''
  try {
    // This pulls the data injected by the GitHub Action
    const validCoupons = JSON.parse(import.meta.env.VITE_COUPON_DATA || '{}')
    const code = couponInput.value.toUpperCase().trim()

    if (validCoupons[code]) {
      appliedDiscount.value = validCoupons[code]
      appliedCode.value = code
      emit('apply-coupon', { code: appliedCode.value, discount: appliedDiscount.value })
    } else {
      couponError.value = 'Invalid code'
      appliedDiscount.value = 0
      appliedCode.value = ''
    }
  } catch (e) {
    couponError.value = 'Error processing coupon'
  }
}

const finalTotal = computed(() => Math.max(0, props.totalPrice - appliedDiscount.value))
</script>

<template>
  <div class="bg-navy text-ivory p-8 rounded-lg sticky top-32 shadow-xl border border-gold/30">
    <h3 class="font-serif text-xl border-b border-gold/20 pb-4 mb-6 uppercase tracking-widest">Booking Summary</h3>
    
    <div class="space-y-4 mb-8">
      <div v-if="selectedPackage" class="flex justify-between text-sm">
        <span class="capitalize">{{ selectedPackage }} ({{ selectedTier }})</span>
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

      <div v-for="i in selections.injections" :key="i.name" class="flex justify-between text-[11px] opacity-70">
        <span>+ {{ i.name }}</span>
        <span>${{ i.price }}</span>
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

<div class="mt-6 mb-6 pt-6 border-t border-gold/10">
      <label class="text-[10px] uppercase tracking-widest text-ivory/50 block mb-2">Coupon Code</label>
      <div class="flex gap-2">
        <input 
          v-model="couponInput" 
          type="text" 
          class="bg-white/5 border border-gold/20 rounded-sm px-3 py-2 text-sm flex-grow focus:border-gold outline-none text-ivory"
          placeholder="Enter code"
        />
        <button 
          type="button"
          @click="handleApplyCoupon"
          class="bg-gold/20 hover:bg-gold/40 text-gold text-[10px] font-bold px-4 py-2 rounded-sm uppercase transition-colors border border-gold/30"
        >
          Apply
        </button>
      </div>
      <p v-if="couponError" class="text-red-400 text-[10px] mt-1 uppercase font-bold">{{ couponError }}</p>
      <p v-if="appliedCode" class="text-green-400 text-[10px] mt-1 uppercase font-bold">Applied: -${{ appliedDiscount }}</p>
    </div>

    <div class="border-t border-gold pb-6 pt-6 flex justify-between items-center mb-8">
      <span class="text-xs uppercase tracking-widest font-bold">Estimated Total</span>
      <span class="text-3xl font-serif text-gold-light">${{ finalTotal }}</span>
    </div>

    <div class="space-y-3">
      <BaseButton variant="outline-gold" class="w-full" @click="$emit('submit')" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          Processing...
        </span>
        <span v-else>Complete Request</span>
      </BaseButton>
      <p v-if="error" class="text-[11px] text-red-400 text-center font-bold uppercase tracking-wider">{{ error }}</p>
    </div>

    <p class="text-[10px] text-ivory/40 text-center italic mt-4">Final price confirmed upon clinical assessment.</p>
    <div class="flex justify-center my-4"><div class="w-12 h-px bg-gold/30"></div></div>
    <p class="text-[8px] uppercase tracking-widest text-ivory/30 text-center leading-[1.6]">
        The statements made regarding these products have not been evaluated by the FDA. Our services are wellness-oriented and are not intended to diagnose, treat, cure, or prevent any medical condition or disease.</p>
  </div>
</template>