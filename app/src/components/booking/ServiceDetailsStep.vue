<script setup>
defineProps(['modelValue', 'errors', 'timeOptions', 'today'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="bg-white p-8 rounded border border-gold/20 shadow-sm">
    <h4 class="font-serif text-2xl text-navy mb-6">Service Details</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col">
        <input type="text" v-model="modelValue.firstName" placeholder="First Name *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.firstName ? 'border-red-400' : 'border-line']" />
        <span v-if="errors.firstName" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
      </div>
      <input type="text" v-model="modelValue.lastName" placeholder="Last Name" class="border-b border-line py-3 outline-none focus:border-gold text-sm" />
      
      <div class="flex flex-col">
        <input type="email" v-model="modelValue.email" placeholder="Email Address *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.email ? 'border-red-400' : 'border-line']" />
        <span v-if="errors.email" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
      </div>
      
      <div class="flex flex-col">
        <input type="tel" v-model="modelValue.phone" placeholder="Phone Number *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.phone ? 'border-red-400' : 'border-line']" />
        <span v-if="errors.phone" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
      </div>

      <div class="md:col-span-2 flex flex-col">
        <input type="text" v-model="modelValue.address" placeholder="Service Address (Street, City, Zip) *" :class="['border-b py-3 outline-none focus:border-gold text-sm transition-colors', errors.address ? 'border-red-400' : 'border-line']" />
        <span v-if="errors.address" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Full Address Required</span>
      </div>

      <select v-model="modelValue.serviceType" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
        <option value="">Setting: Home, Hotel, or Yacht?</option>
        <option value="Home">Private Residence</option>
        <option value="Hotel">Hotel / Resort</option>
        <option value="Yacht">Private Yacht</option>
      </select>

      <div class="flex flex-col">
        <select v-model="modelValue.location" :class="['appearance-none border-b py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent transition-colors', errors.location ? 'border-red-400' : 'border-line']">
          <option value="">Select Service Area *</option>
          <option value="Naples">Naples</option>
          <option value="Marco Island">Marco Island</option>
          <option value="Sanibel & Captiva">Sanibel & Captiva</option>
          <option value="Bonita Springs">Bonita Springs</option>
        </select>
        <span v-if="errors.location" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
      </div>

      <div class="flex flex-col">
        <input type="date" v-model="modelValue.date" :min="today" :class="['appearance-none border-b py-4 h-14 outline-none focus:border-gold text-base md:text-sm text-navy bg-transparent transition-colors', errors.date ? 'border-red-400' : 'border-line']" />
        <span v-if="errors.date" class="text-[10px] text-red-500 mt-1 uppercase tracking-widest font-bold">Required</span>
      </div>

      <select v-model="modelValue.time" class="appearance-none border-b border-line py-4 h-14 outline-none focus:border-gold text-base md:text-sm bg-transparent">
        <option value="">Preferred Time</option>
        <option v-for="t in timeOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
      </select>

 <textarea v-model="modelValue.notes" placeholder="Additional Notes (Gate codes, specific symptoms, etc.)" class="md:col-span-2 border-b border-line py-3 outline-none focus:border-gold text-sm h-24"></textarea>
    </div>
    <p class="text-[10px] text-slate mt-6 italic">
      * Note: A $120 after-hours fee applies for services scheduled at or after 8:00 PM.
    </p>
  </div>
</template>