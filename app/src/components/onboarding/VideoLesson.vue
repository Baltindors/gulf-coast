<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  videoId: { type: String, required: true }
})
const emit = defineEmits(['video-ended'])

let player = null

const initPlayer = () => {
  if (player) { player.destroy(); player = null }
  
  nextTick(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
      window.onYouTubeIframeAPIReady = createPlayer
    } else {
      createPlayer()
    }
  })
}

const createPlayer = () => {
  player = new window.YT.Player('yt-player', {
    videoId: props.videoId,
    playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
    events: {
      onStateChange: (event) => {
        if (event.data === window.YT.PlayerState.ENDED) {
          emit('video-ended')
        }
      }
    }
  })
}

watch(() => props.videoId, initPlayer)
onMounted(initPlayer)
onUnmounted(() => player?.destroy?.())
</script>

<template>
  <div class="w-full aspect-video bg-black rounded-lg shadow-md overflow-hidden mb-6">
    <div id="yt-player" class="w-full h-full"></div>
  </div>
</template>