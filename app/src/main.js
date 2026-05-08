import './assets/main.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  { 
    routes, 
    base: import.meta.env.BASE_URL,
    
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    }
  },
  ({ app, router, isClient }) => {
    router.afterEach((to) => {
      if (isClient) {
        document.title = to.meta.title || 'Gulf Coast IV Concierge'
      }
    })
  }
)