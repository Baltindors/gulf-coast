<template>
  <div class="min-h-screen bg-[#FAF9F6] text-[#021E36] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- State 1: Login -->
      <div v-if="currentState === 1" class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
        <h1 class="text-4xl md:text-5xl font-serif text-[#021E36] mb-8 text-center">Employee Portal</h1>
        <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100 w-full">
          <p class="mb-4 text-gray-700 text-center font-sans">Please enter your Employee ID to access training materials.</p>
          <input 
            v-model="employeeIdInput" 
            @keyup.enter="handleLogin"
            type="text" 
            placeholder="e.g. GC-1234" 
            class="w-full px-4 py-3 border border-[#C1A172]/20 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#C1A172] uppercase font-sans"
          />
          <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center font-sans">{{ errorMessage }}</p>
          <button 
            @click="handleLogin" 
            :disabled="isLoading"
            class="w-full bg-[#C1A172] hover:bg-[#a88b60] disabled:bg-opacity-50 text-white font-medium py-3 px-8 rounded transition duration-300 shadow-md font-sans tracking-widest uppercase text-sm">
            {{ isLoading ? 'Checking...' : 'Access Portal' }}
          </button>
        </div>
      </div>

      <!-- State 2: LMS Dashboard -->
      <div v-else-if="currentState === 2" class="flex flex-col min-h-[80vh]">
        <div class="flex justify-between items-center mb-8 border-b border-[#C1A172]/20 pb-4">
          <h1 class="text-3xl font-serif text-[#021E36]">Welcome, {{ employeeData?.name }}</h1>
          <button 
            @click="handleSignOut" 
            class="text-sm text-[#021E36] hover:text-[#C1A172] transition font-sans border border-[#021E36] px-4 py-2 rounded">
            Sign out
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow">
          
          <!-- Sidebar (Modules List) -->
          <div class="lg:col-span-1 bg-white border border-[#C1A172]/20 rounded-lg p-4 shadow-sm h-fit">
            <h2 class="text-xl font-serif text-[#021E36] mb-4 border-b border-[#C1A172]/20 pb-2">Training Modules</h2>
            <ul class="space-y-2">
              <li v-for="(mod, index) in modules" :key="mod.id">
                <button 
                  @click="selectModule(index)"
                  :disabled="!isModuleUnlocked(index)"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-md transition duration-300 flex items-center justify-between font-sans text-sm',
                    activeModuleIndex === index ? 'bg-[#021E36] text-white' : 'hover:bg-gray-50',
                    !isModuleUnlocked(index) ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-[#021E36]',
                    isModuleCompleted(mod.id) && activeModuleIndex !== index ? 'bg-[#FAF9F6]' : ''
                  ]">
                  <span class="flex-grow">{{ index + 1 }}. {{ mod.title }}</span>
                  <svg v-if="isModuleCompleted(mod.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#C1A172] ml-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="!isModuleUnlocked(index)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>

          <!-- Main Content (Video & Quiz) -->
          <div class="lg:col-span-3">
            <div v-if="activeModule" class="bg-white rounded-lg shadow-sm border border-[#C1A172]/20 p-6 lg:p-8">
              <h2 class="text-3xl font-serif text-[#021E36] mb-6">{{ activeModule.title }}</h2>
              
              <!-- Video Player Section -->
              <div v-show="!showQuiz || isModuleCompleted(activeModule.id) || !activeModule.quiz">
                <div class="w-full aspect-video bg-black rounded-lg shadow-md overflow-hidden mb-6">
                  <div id="youtube-player" class="w-full h-full"></div>
                </div>
                <div v-if="activeModule.instructions" class="prose max-w-none font-sans text-gray-700">
                  <p>{{ activeModule.instructions }}</p>
                </div>
                
                <!-- Resources -->
                <div v-if="activeModule.resources && activeModule.resources.length > 0" class="mt-6">
                  <h3 class="text-xl font-serif text-[#021E36] mb-3">Downloadable Resources</h3>
                  <div class="flex flex-col gap-3">
                    <a 
                      v-for="(res, idx) in activeModule.resources" 
                      :key="idx"
                      :href="res.url"
                      target="_blank"
                      class="flex items-center p-3 bg-white border border-[#C1A172]/20 rounded hover:bg-gray-50 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#C1A172] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span class="font-sans text-sm text-[#021E36]">{{ res.title }}</span>
                    </a>
                  </div>
                </div>
                
                <div v-if="isModuleCompleted(activeModule.id)" class="mt-8 p-4 bg-green-50 border border-green-200 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div class="flex items-center text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium font-sans">Module Completed</span>
                  </div>
                  <button 
                    v-if="activeModuleIndex < modules.length - 1"
                    @click="selectModule(activeModuleIndex + 1)"
                    class="bg-[#021E36] hover:bg-[#011424] text-white px-4 py-2 rounded text-sm font-sans transition whitespace-nowrap">
                    Next Module &rarr;
                  </button>
                  <button
                    v-else
                    @click="checkAllCompleted"
                    class="bg-[#C1A172] hover:bg-[#a88b60] text-white px-4 py-2 rounded text-sm font-sans transition whitespace-nowrap">
                    Finish Training
                  </button>
                </div>
              </div>

              <!-- Quiz Section -->
              <div v-if="showQuiz && !isModuleCompleted(activeModule.id) && activeModule.quiz" class="mt-8 border-t border-[#C1A172]/20 pt-8 animate-fade-in">
                <h3 class="text-2xl font-serif text-[#021E36] mb-2">Knowledge Check</h3>
                <p class="text-gray-600 font-sans mb-6">Please answer the question below to complete this module.</p>
                
                <div class="bg-[#FAF9F6] p-6 rounded border border-[#C1A172]/20">
                  <p class="text-lg font-medium text-[#021E36] font-sans mb-4">{{ activeModule.quiz.question }}</p>
                  
                  <div class="space-y-3">
                    <label 
                      v-for="(option, optIndex) in activeModule.quiz.options" 
                      :key="optIndex"
                      :class="[
                        'flex items-center p-4 border rounded cursor-pointer transition font-sans',
                        selectedAnswer === optIndex ? 'border-[#C1A172] bg-white ring-1 ring-[#C1A172]' : 'border-gray-300 bg-white hover:bg-gray-50'
                      ]">
                      <input 
                        type="radio" 
                        :name="'quiz-'+activeModule.id" 
                        :value="optIndex" 
                        v-model="selectedAnswer"
                        class="h-4 w-4 text-[#C1A172] focus:ring-[#C1A172] border-gray-300"
                      />
                      <span class="ml-3 text-gray-700">{{ option }}</span>
                    </label>
                  </div>
                  
                  <div v-if="quizError" class="mt-4 text-red-500 text-sm font-sans font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Incorrect answer. Please try again or re-watch the video.
                  </div>
                  
                  <button 
                    @click="submitQuiz"
                    :disabled="selectedAnswer === null || isSubmitting"
                    class="mt-6 bg-[#C1A172] hover:bg-[#a88b60] disabled:bg-opacity-50 text-white font-medium py-3 px-8 rounded transition duration-300 shadow-sm font-sans text-sm tracking-wide">
                    {{ isSubmitting ? 'Submitting...' : 'Submit Answer' }}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- State 3: Completed All -->
      <div v-else-if="currentState === 3" class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-serif text-[#021E36] mb-8 text-center">Training Complete</h1>
        <div class="bg-white p-8 rounded-lg shadow-md border border-[#C1A172]/20 w-full text-center">
          <div class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-lg text-gray-700 mb-8 font-sans">Congratulations, {{ employeeData?.name }}. You have successfully completed all onboarding modules. Your status has been fully updated in our system.</p>
          <button 
            @click="reviewMaterials" 
            class="w-full bg-transparent border border-[#021E36] text-[#021E36] hover:bg-gray-50 font-medium py-3 px-8 rounded transition duration-300 font-sans tracking-widest text-sm uppercase mb-4">
            Review Training Materials
          </button>
          <button 
            @click="handleSignOut" 
            class="w-full bg-[#021E36] hover:bg-[#011424] text-white font-medium py-3 px-8 rounded transition duration-300 font-sans tracking-widest text-sm uppercase">
            Sign Out
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted, nextTick } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import onboardingJson from '../data/onboarding.json';

const modules = ref(onboardingJson.modules);
const employeeIdInput = ref('');
const employeeData = ref(null);
const errorMessage = ref('');
const currentState = ref(1); // 1 = Login, 2 = Dashboard, 3 = Complete All
const isLoading = ref(false);

const activeModuleIndex = ref(0);
const showQuiz = ref(false);
const selectedAnswer = ref(null);
const quizError = ref(false);
const isSubmitting = ref(false);

let ytPlayer = null;

const activeModule = computed(() => modules.value[activeModuleIndex.value]);

// Completion Helpers
const isModuleCompleted = (moduleId) => {
  if (!employeeData.value || !employeeData.value.progress) return false;
  return employeeData.value.progress[moduleId]?.completed === true;
};

const isModuleUnlocked = (index) => {
  if (index === 0) return true; // First module always unlocked
  // Unlocked if the previous module is completed
  const prevModuleId = modules.value[index - 1].id;
  return isModuleCompleted(prevModuleId);
};

const checkAllCompleted = () => {
  const allDone = modules.value.every(m => isModuleCompleted(m.id));
  if (allDone) {
    currentState.value = 3;
  }
};

const handleLogin = async () => {
  errorMessage.value = '';
  if (!employeeIdInput.value.trim()) {
    errorMessage.value = 'Please enter an Employee ID.';
    return;
  }
  
  isLoading.value = true;
  const uppercaseId = employeeIdInput.value.trim().toUpperCase();
  
  try {
    const docRef = doc(db, 'employees', uppercaseId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      employeeData.value = { id: uppercaseId, progress: {}, ...docSnap.data() };
      
      // Check if completely done
      if (employeeData.value.status === 'completed' || modules.value.every(m => isModuleCompleted(m.id))) {
        currentState.value = 3;
      } else {
        currentState.value = 2;
        
        // Find first unlocked & incomplete module
        let startIdx = 0;
        for (let i = 0; i < modules.value.length; i++) {
          if (!isModuleCompleted(modules.value[i].id)) {
            startIdx = i;
            break;
          }
        }
        
        selectModule(startIdx);
      }
    } else {
      errorMessage.value = 'Invalid Employee ID.';
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    errorMessage.value = 'An error occurred connecting to the database. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const selectModule = async (index) => {
  if (!isModuleUnlocked(index)) return;
  
  activeModuleIndex.value = index;
  showQuiz.value = false;
  selectedAnswer.value = null;
  quizError.value = false;
  
  // Update status to in_progress if not already
  if (employeeData.value.status === 'not_started') {
    const docRef = doc(db, 'employees', employeeData.value.id);
    await updateDoc(docRef, { status: 'in_progress' });
    employeeData.value.status = 'in_progress';
  }

  // Always initialize/re-initialize the player when a module is selected,
  // regardless of whether it is completed or not, so they can review it.
  initYouTubePlayer();
};

const initYouTubePlayer = () => {
  if (window.YT && window.YT.Player) {
    createPlayer();
    return;
  }
  
  if (!document.getElementById('yt-iframe-api')) {
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
  }
  
  const previousCallback = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (previousCallback) previousCallback();
    createPlayer();
  };
};

const createPlayer = () => {
  // Destroy existing player if needed
  if (ytPlayer && ytPlayer.destroy) {
    ytPlayer.destroy();
    ytPlayer = null;
  }
  
  nextTick(() => {
    // Make sure we have a container
    if (!document.getElementById('youtube-player')) return;
    
    ytPlayer = new window.YT.Player('youtube-player', {
      videoId: activeModule.value.videoId,
      playerVars: { 
        playsinline: 1, 
        rel: 0, 
        modestbranding: 1 
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  });
};

const completeModule = async () => {
  const moduleId = activeModule.value.id;
  const currentProgress = employeeData.value.progress || {};
  
  const updatedProgress = {
    ...currentProgress,
    [moduleId]: { completed: true, quizPassed: activeModule.value.quiz ? true : undefined, timestamp: new Date().toISOString() }
  };
  
  const isLastModule = activeModuleIndex.value === modules.value.length - 1;
  const newStatus = isLastModule ? 'completed' : 'in_progress';
  
  const docRef = doc(db, 'employees', employeeData.value.id);
  await updateDoc(docRef, { 
    progress: updatedProgress,
    status: newStatus
  });
  
  employeeData.value.progress = updatedProgress;
  employeeData.value.status = newStatus;
  
  if (isLastModule) {
    checkAllCompleted();
  }
};

const onPlayerStateChange = async (event) => {
  if (event.data === window.YT.PlayerState.ENDED) {
    if (activeModule.value.quiz) {
      showQuiz.value = true;
      if (ytPlayer && ytPlayer.destroy) {
        ytPlayer.destroy();
        ytPlayer = null;
      }
    } else if (!isModuleCompleted(activeModule.value.id)) {
      isSubmitting.value = true;
      try {
        await completeModule();
      } catch (err) {
        console.error("Error auto-completing module", err);
      } finally {
        isSubmitting.value = false;
      }
    }
  }
};

const submitQuiz = async () => {
  if (selectedAnswer.value === null) return;
  quizError.value = false;
  
  const correctIdx = activeModule.value.quiz.correctAnswer;
  if (selectedAnswer.value !== correctIdx) {
    quizError.value = true;
    return;
  }
  
  // Passed
  isSubmitting.value = true;
  try {
    await completeModule();
  } catch (err) {
    console.error("Error saving progress", err);
  } finally {
    isSubmitting.value = false;
  }
};

const reviewMaterials = () => {
  currentState.value = 2;
  selectModule(0);
};

const handleSignOut = () => {
  currentState.value = 1;
  employeeData.value = null;
  employeeIdInput.value = '';
  errorMessage.value = '';
  activeModuleIndex.value = 0;
  if (ytPlayer && ytPlayer.destroy) {
    ytPlayer.destroy();
    ytPlayer = null;
  }
};

onUnmounted(() => {
  if (ytPlayer && ytPlayer.destroy) {
    ytPlayer.destroy();
  }
});
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
