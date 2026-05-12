<script setup>
import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

const emit = defineEmits(['login-success'])

const employeeIdInput = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  if (!employeeIdInput.value.trim()) {
    errorMessage.value = 'Please enter an Employee ID.'
    return
  }
  
  isLoading.value = true
  const uppercaseId = employeeIdInput.value.trim().toUpperCase()
  
  try {
    const docRef = doc(db, 'employees', uppercaseId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      emit('login-success', { id: uppercaseId, ...docSnap.data() })
    } else {
      errorMessage.value = 'Invalid Employee ID.'
    }
  } catch (error) {
    errorMessage.value = 'Database connection error.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
    <h1 class="text-4xl md:text-5xl font-serif text-navy mb-8 text-center">Employee Portal</h1>
    <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100 w-full">
      <p class="mb-4 text-gray-700 text-center">Enter Employee ID to access training.</p>
      <input 
        v-model="employeeIdInput" 
        @keyup.enter="handleLogin"
        type="text" 
        placeholder="e.g. GC-1234" 
        class="w-full px-4 py-3 border border-gold/20 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-gold uppercase"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">{{ errorMessage }}</p>
      <button 
        @click="handleLogin" 
        :disabled="isLoading"
        class="w-full bg-gold hover:bg-gold-dark disabled:bg-opacity-50 text-white font-medium py-3 px-8 rounded transition uppercase text-sm tracking-widest">
        {{ isLoading ? 'Checking...' : 'Access Portal' }}
      </button>
    </div>
  </div>
</template>