<script setup>
import { ref } from 'vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'

// You can update these with your real Google reviews later
const reviews = ref([

  { 
    author: "Evelyn A.", 
    rating: 5, 
    text: "After eating something that didn't agree with me, I became very sick. Within an hour, a nurse arrived at my home. She was professional, compassionate, and highly skilled, taking the time to walk me through the entire process and make sure I was comfortable. Before she left, my nausea was gone, I had stopped vomiting, and I was already feeling significantly better. The care was convenient, effective, and reassuring. I highly recommend their service!", 
    time: "1 week ago",
    initial: "E"
  },
    { 
    author: "eric A.", 
    rating: 5, 
    text: "Synthia was amazing. Very knowledgeable, professional and timely. Will definitely use again when under the weather.", 
    time: "1 week ago",
    initial: "E"
  },
  { 
    author: "Judy L.", 
    rating: 5, 
    text: "I had an outstanding experience with my IV therapy. From the moment the nurse arrived, she was professional, knowledgeable, and incredibly compassionate. She explained everything clearly, made me feel completely at ease, and her IV was quick and painless. Her attention to detail, excellent bedside manner, and genuine care for her patients truly set her apart...", 
    time: "1 day ago",
    initial: "J"
  }
])
</script>

<template>
  <section class="py-32 px-6 md:px-16 bg-ivory border-y border-line">
    <div class="container mx-auto max-w-6xl">
      <SectionHeader
        tag="Client Testimonials"
        title="What Our Clients"
        accent="Are Saying"
        description="Read about the experiences of our clients across Southwest and East Florida."
        data-aos="fade-up"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div 
          v-for="(review, index) in reviews" 
          :key="index"
          class="bg-white p-8 rounded-xl border border-gold/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          data-aos="fade-up"
          :data-aos-delay="index * 150"
        >
          <div class="flex items-center gap-4 mb-5">
            <div class="w-12 h-12 rounded-full bg-navy text-ivory flex items-center justify-center font-serif text-xl shadow-sm">
              {{ review.initial }}
            </div>
            <div>
              <h4 class="font-serif text-navy font-semibold text-lg">{{ review.author }}</h4>
              <p class="text-slate text-[10px] uppercase tracking-wider">{{ review.time }}</p>
            </div>
          </div>

          <div class="flex gap-1 mb-4">
            <svg v-for="i in review.rating" :key="i" class="w-4 h-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <p class="text-slate text-sm leading-relaxed flex-grow">
            "{{ review.text }}"
          </p>

          <div class="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
            <span class="text-[10px] font-bold tracking-widest text-navy/50 uppercase">Verified Review</span>
            <svg class="w-4 h-4 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="400">
        <a 
          href="https://www.google.com/maps/place/Gulf+Coast+IV+Concierge/@26.0773704,-82.0500762,9z/data=!4m18!1m9!3m8!1s0xa818e0384fa7d4d:0x7a8a656ec92c2317!2sGulf+Coast+IV+Concierge!8m2!3d26.332801!4d-81.9236772!9m1!1b1!16s%2Fg%2F11z79lhvdw!3m7!1s0xa818e0384fa7d4d:0x7a8a656ec92c2317!8m2!3d26.332801!4d-81.9236772!9m1!1b1!16s%2Fg%2F11z79lhvdw?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase border rounded-sm transition-all duration-250 cursor-pointer border-navy/30 text-navy bg-transparent hover:border-navy hover:bg-navy hover:text-white"
        >
          Read More on Google
        </a>
      </div>
    </div>
  </section>
</template>