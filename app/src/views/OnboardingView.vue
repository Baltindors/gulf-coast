<template>
  <div class="min-h-screen bg-ivory text-navy py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <EmployeeLogin 
        v-if="currentState === 1" 
        @login-success="onLogin" 
      />

      <div v-else-if="currentState === 2" class="flex flex-col min-h-[80vh] pt-20">
        <div class="flex justify-between items-center mb-8 border-b border-gold/20 pb-4">
          <h1 class="text-3xl font-serif">Welcome, {{ employeeData?.name }}</h1>
          <button 
            @click="handleSignOut" 
            class="text-sm border border-navy px-4 py-2 rounded-sm uppercase tracking-widest hover:bg-navy hover:text-ivory transition-all">
            Sign out
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow">
          
          <div class="lg:col-span-1 bg-white border border-gold/20 rounded-lg p-4 shadow-sm h-fit">
            <h2 class="text-xl font-serif mb-4 border-b border-gold/20 pb-2">Training Modules</h2>
            <ul class="space-y-2">
              <li v-for="(mod, index) in modules" :key="mod.id">
                <button 
                  @click="selectModule(index)"
                  :disabled="!isModuleUnlocked(index)"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-md transition-all flex items-center justify-between text-sm',
                    activeIndex === index ? 'bg-navy text-ivory' : 'text-navy hover:bg-ivory-warm',
                    !isModuleUnlocked(index) ? 'opacity-40 cursor-not-allowed' : '',
                    isModuleCompleted(mod.id) && activeIndex !== index ? 'bg-green-50/50' : ''
                  ]"
                >
                  <span class="flex-grow">{{ index + 1 }}. {{ mod.title }}</span>
                  <svg v-if="isModuleCompleted(mod.id)" class="h-5 w-5 text-gold ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="!isModuleUnlocked(index)" class="h-4 w-4 ml-2 text-slate/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
<div class="lg:col-span-3">
            <div v-if="activeModule" class="bg-white rounded-lg shadow-sm border border-gold/20 p-6 lg:p-8">
              <h2 class="text-3xl font-serif mb-6">{{ activeModule.title }}</h2>
              
              <div v-show="!showQuiz || isModuleCompleted(activeModule.id) || !activeModule.quiz">
                <VideoLesson :video-id="activeModule.videoId" @video-ended="handleVideoEnded" />
                
                <div v-if="activeModule.instructions" class="prose max-w-none text-slate mb-6">
                  <p>{{ activeModule.instructions }}</p>
                </div>
              </div>

              <div v-if="activeModule.resources && activeModule.resources.length > 0" 
                   v-show="!showQuiz || isModuleCompleted(activeModule.id)"
                   class="mt-8 border-t border-gold/10 pt-6">
                <h3 class="text-xl font-serif text-navy mb-4">Downloadable Resources</h3>
                <div class="grid grid-cols-1 gap-3">
                  <a 
                    v-for="(res, idx) in activeModule.resources" 
                    :key="idx"
                    :href="res.url"
                    target="_blank"
                    class="flex items-center p-4 bg-ivory-warm/30 border border-gold/10 rounded-sm hover:border-gold/40 hover:bg-ivory-warm/50 transition-all group"
                  >
                    <svg class="h-5 w-5 text-gold mr-3 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-sm font-sans text-navy uppercase tracking-wider font-medium">{{ res.title }}</span>
                  </a>
                </div>
              </div>

              <ModuleQuiz 
                v-if="showQuiz && !isModuleCompleted(activeModule.id) && activeModule.quiz" 
                :quiz="activeModule.quiz" 
                @passed="completeModule" 
              />

              <div v-if="isModuleCompleted(activeModule.id)" class="mt-8 p-6 bg-green-50 border border-green-200 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                <div class="flex items-center text-green-800">
                  <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-bold uppercase tracking-widest text-xs">Module Completed</span>
                </div>
                <button 
                  @click="activeIndex < modules.length - 1 ? selectModule(activeIndex + 1) : currentState = 3"
                  class="bg-navy text-ivory px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-navy/90 transition-all">
                  {{ activeIndex < modules.length - 1 ? 'Next Module' : 'Finish Training' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="currentState === 3" class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto animate-in fade-in">
        <div class="bg-white p-10 rounded-lg shadow-md border border-gold/20 w-full text-center">
          <div class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
            <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-3xl font-serif text-navy mb-4">Training Complete</h2>
          <p class="text-slate mb-8 leading-relaxed">
            Congratulations, {{ employeeData?.name }}. You have successfully completed all onboarding modules. Your status has been fully updated in our system.
          </p>
          <button @click="reviewMaterials" class="w-full border border-gold text-gold py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all mb-4">
            Review Training Materials
          </button>
          <button @click="handleSignOut" class="w-full bg-navy text-ivory py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-navy/90 transition-all">
            Sign Out
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import onboardingJson from '../data/onboarding.json'

// New Components
import EmployeeLogin from '@/components/onboarding/EmployeeLogin.vue'
import VideoLesson from '@/components/onboarding/VideoLesson.vue'
import ModuleQuiz from '@/components/onboarding/ModuleQuiz.vue'

// State Management
const modules = ref(onboardingJson.modules)
const employeeData = ref(null)
const currentState = ref(1) // 1: Login, 2: Dashboard, 3: Complete
const activeIndex = ref(0)
const showQuiz = ref(false)
const isSubmitting = ref(false)

const activeModule = computed(() => modules.value[activeIndex.value])

/**
 * Persistence Helpers
 */
const isModuleCompleted = (moduleId) => {
  return employeeData.value?.progress?.[moduleId]?.completed === true
}

const isModuleUnlocked = (index) => {
  if (index === 0) return true
  const prevModuleId = modules.value[index - 1].id
  return isModuleCompleted(prevModuleId)
}

/**
 * Authentication & Navigation
 */
const onLogin = (data) => {
  employeeData.value = data
  
  // Check if already finished everything
  const allDone = modules.value.every(m => isModuleCompleted(m.id))
  if (data.status === 'completed' || allDone) {
    currentState.value = 3
  } else {
    currentState.value = 2
    // Jump to the first incomplete module
    const firstIncomplete = modules.value.findIndex(m => !isModuleCompleted(m.id))
    selectModule(firstIncomplete !== -1 ? firstIncomplete : 0)
  }
}

const selectModule = async (index) => {
  if (!isModuleUnlocked(index)) return
  
  activeIndex.value = index
  showQuiz.value = false
  
  // Update status to 'in_progress' in DB on first interaction
  if (employeeData.value.status === 'not_started') {
    const docRef = doc(db, 'employees', employeeData.value.id)
    await updateDoc(docRef, { status: 'in_progress' })
    employeeData.value.status = 'in_progress'
  }
}

/**
 * Bug Fix Logic: Module Completion Flow
 * Decides whether to show a quiz or finish the module when the video ends.
 */
const handleVideoEnded = async () => {
  if (activeModule.value.quiz) {
    showQuiz.value = true
  } else if (!isModuleCompleted(activeModule.value.id)) {
    // BUG FIX: Automatically complete module if no quiz exists
    await completeModule()
  }
}

const completeModule = async () => {
  isSubmitting.value = true
  const moduleId = activeModule.value.id
  const currentProgress = employeeData.value.progress || {}
  
  const updatedProgress = {
    ...currentProgress,
    [moduleId]: { 
      completed: true, 
      timestamp: new Date().toISOString() 
    }
  }
  
  const isLast = activeIndex.value === modules.value.length - 1
  const newStatus = isLast ? 'completed' : 'in_progress'
  
  try {
    const docRef = doc(db, 'employees', employeeData.value.id)
    await updateDoc(docRef, { 
      progress: updatedProgress,
      status: newStatus
    })
    
    employeeData.value.progress = updatedProgress
    employeeData.value.status = newStatus
    
    // If it was the last module, move to the Success State
    if (isLast) currentState.value = 3

  } catch (err) {
    console.error("Error saving progress:", err)
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Account Actions
 */
const reviewMaterials = () => {
  currentState.value = 2
  selectModule(0)
}

const handleSignOut = () => {
  currentState.value = 1
  employeeData.value = null
  activeIndex.value = 0
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>  