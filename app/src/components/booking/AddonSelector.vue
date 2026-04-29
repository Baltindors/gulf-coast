<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  addons: { type: Object, required: true }
})

const emit = defineEmits(['update:selections'])

const showAddons = ref(null) // null, 'yes', 'no'
const selectedVitamins = ref([])
const selectedGlutathione = ref(null)
const selectedMedications = ref([])

// Watch for any changes and emit them to the parent
watch([selectedVitamins, selectedGlutathione, selectedMedications, showAddons], () => {
  if (showAddons.value === 'no') {
    emit('update:selections', { vitamins: [], glutathione: null, medications: [] })
  } else {
    emit('update:selections', {
      vitamins: selectedVitamins.value,
      glutathione: selectedGlutathione.value,
      medications: selectedMedications.value
    })
  }
}, { deep: true })
</script>

<template>
  <div class="bg-white p-8 rounded border border-gold/20 shadow-sm transition-all duration-500">
    <h4 class="font-serif text-2xl text-navy mb-2">Enhance Your Experience</h4>
    <p class="text-[11px] text-slate/70 uppercase tracking-widest mb-6">Would you like to customize your treatment with premium add-ons?</p>

    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <button @click="showAddons = 'yes'" :class="['flex-1 p-4 border rounded-sm text-left transition-all', showAddons === 'yes' ? 'border-gold bg-gold/5' : 'border-line hover:border-gold/50']">
        <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">Yes, Customize</span>
        <span class="text-xs text-slate text-pretty">View available vitamins, glutathione, and medications</span>
      </button>
      <button @click="showAddons = 'no'" :class="['flex-1 p-4 border rounded-sm text-left transition-all', showAddons === 'no' ? 'border-gold bg-gold/5' : 'border-line hover:border-gold/50']">
        <span class="block font-bold text-navy text-[11px] uppercase tracking-widest">No, Standard Package</span>
        <span class="text-xs text-slate text-pretty">Keep the package as originally formulated</span>
      </button>
    </div>

    <div v-if="showAddons === 'yes'" class="space-y-10 border-t border-gold/10 pt-8 animate-in fade-in duration-500">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h5 class="text-[10px] font-bold text-gold uppercase tracking-widest mb-4 border-b border-gold/10 pb-2">Vitamins (Multiple)</h5>
          <div class="space-y-3">
            <label v-for="v in addons.vitamins" :key="v.name" class="flex items-center group cursor-pointer">
              <input type="checkbox" :value="v" v-model="selectedVitamins" class="accent-gold h-4 w-4" />
              <span class="ml-3 text-xs text-navy group-hover:text-gold transition-colors">{{ v.name }} (+${{ v.price }})</span>
            </label>
          </div>
        </div>

        <div>
          <h5 class="text-[10px] font-bold text-gold uppercase tracking-widest mb-4 border-b border-gold/10 pb-2">Glutathione (Select Dose)</h5>
          <div class="space-y-3">
            <label v-for="g in addons.glutathione" :key="g.amount" class="flex items-center group cursor-pointer">
              <input type="radio" name="glut-dose" :value="g" v-model="selectedGlutathione" class="accent-gold h-4 w-4" />
              <span class="ml-3 text-xs text-navy group-hover:text-gold transition-colors">{{ g.amount }} (+${{ g.price }})</span>
            </label>
          </div>
        </div>

        <div class="md:col-span-2">
          <h5 class="text-[10px] font-bold text-gold uppercase tracking-widest mb-4 border-b border-gold/10 pb-2">Supportive Medications</h5>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label v-for="m in addons.medications" :key="m.name" class="flex items-center group cursor-pointer">
              <input type="checkbox" :value="m" v-model="selectedMedications" class="accent-gold h-4 w-4" />
              <span class="ml-3 text-xs text-navy group-hover:text-gold transition-colors">{{ m.name }} (+${{ m.price }})</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>