<template>
  <div class="min-h-screen bg-[#FAF9F6] text-[#021E36] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- State 1: Login -->
      <div v-if="currentState === 1" class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
        <h1 class="text-4xl md:text-5xl font-serif text-[#021E36] mb-8 text-center">Employee Portal</h1>
        <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100 w-full">
          <p class="mb-4 text-gray-700 text-center">Please enter your Employee ID to access training materials.</p>
          <input 
            v-model="employeeIdInput" 
            @keyup.enter="handleLogin"
            type="text" 
            placeholder="e.g. EMP-101" 
            class="w-full px-4 py-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#C1A172] uppercase"
          />
          <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">{{ errorMessage }}</p>
          <button 
            @click="handleLogin" 
            :disabled="isLoading"
            class="w-full bg-[#C1A172] hover:bg-[#a88b60] disabled:bg-opacity-50 text-white font-medium py-3 px-8 rounded transition duration-300 shadow-md">
            {{ isLoading ? 'Checking...' : 'Access Portal' }}
          </button>
        </div>
      </div>

      <!-- State 2: Video Player -->
      <div v-else-if="currentState === 2" class="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 class="text-3xl md:text-4xl font-serif text-[#021E36] mb-4 text-center">Welcome, {{ employeeData?.name }}</h1>
        <p class="mb-8 text-gray-700 text-center">Please watch the following training video completely. Your progress will be recorded automatically when the video ends.</p>
        
        <div class="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
          <div id="youtube-player" class="w-full h-full"></div>
        </div>
        
        <button 
          @click="handleSignOut" 
          class="mt-8 text-sm text-gray-500 hover:text-gray-800 underline">
          Sign out
        </button>
      </div>

      <!-- State 3: Completed -->
      <div v-else-if="currentState === 3" class="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto">
        <h1 class="text-4xl md:text-5xl font-serif text-[#021E36] mb-8 text-center">Training Complete</h1>
        <div class="bg-white p-8 rounded-lg shadow-md border border-gray-100 w-full text-center">
          <div class="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-lg text-gray-700 mb-8">Thank you, {{ employeeData?.name }}. Your training completion has been successfully recorded.</p>
          <button 
            @click="handleSignOut" 
            class="w-full bg-[#021E36] hover:bg-[#011424] text-white font-medium py-3 px-8 rounded transition duration-300">
            Sign Out
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const employeeIdInput = ref('');
const employeeData = ref(null);
const errorMessage = ref('');
const currentState = ref(1); // 1 = Login, 2 = Video, 3 = Complete
const isLoading = ref(false);

let ytPlayer = null;

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
      employeeData.value = { id: uppercaseId, ...docSnap.data() };
      if (employeeData.value.status === 'completed') {
        currentState.value = 3;
      } else {
        currentState.value = 2;
        initYouTubePlayer();
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
  // Wait a moment for Vue to render the DOM element in State 2
  setTimeout(() => {
    ytPlayer = new window.YT.Player('youtube-player', {
      videoId: 'M7lc1UVf-VE',
      playerVars: { 
        playsinline: 1, 
        rel: 0, 
        modestbranding: 1 
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  }, 100);
};

const onPlayerStateChange = async (event) => {
  // YT.PlayerState.ENDED is typically 0
  if (event.data === window.YT.PlayerState.ENDED) {
    try {
      const docRef = doc(db, 'employees', employeeData.value.id);
      await updateDoc(docRef, { status: 'completed' });
      employeeData.value.status = 'completed';
      currentState.value = 3;
    } catch (error) {
      console.error("Error updating status:", error);
      // Even if update fails, we might want to let them proceed, 
      // but for strictness we just log it.
    }
  }
};

const handleSignOut = () => {
  currentState.value = 1;
  employeeData.value = null;
  employeeIdInput.value = '';
  errorMessage.value = '';
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
