<script setup>
import { ref } from 'vue'

const props = defineProps({
  quiz: { type: Object, required: true }
})
const emit = defineEmits(['passed'])

const selectedAnswer = ref(null)
const quizError = ref(false)

const submit = () => {
  if (selectedAnswer.value === props.quiz.correctAnswer) {
    quizError.value = false
    emit('passed')
  } else {
    quizError.value = true
  }
}
</script>

<template>
  <div class="mt-8 border-t border-gold/20 pt-8 animate-in fade-in">
    <h3 class="text-2xl font-serif text-navy mb-2">Knowledge Check</h3>
    <div class="bg-ivory p-6 rounded border border-gold/20">
      <p class="text-lg font-medium text-navy mb-4">{{ quiz.question }}</p>
      <div class="space-y-3">
        <label v-for="(opt, i) in quiz.options" :key="i" 
          class="flex items-center p-4 border rounded cursor-pointer bg-white">
          <input type="radio" :value="i" v-model="selectedAnswer" class="accent-gold" />
          <span class="ml-3 text-gray-700">{{ opt }}</span>
        </label>
      </div>
      <p v-if="quizError" class="mt-4 text-red-500 text-sm font-bold">Incorrect. Please try again.</p>
      <button @click="submit" class="mt-6 bg-gold text-white px-8 py-3 rounded text-sm uppercase tracking-widest">
        Submit Answer
      </button>
    </div>
  </div>
</template>