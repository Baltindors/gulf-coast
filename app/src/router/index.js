import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Mobile IV Therapy in Naples & SWFL | Gulf Coast IV Concierge' }
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('../views/PackagesView.vue'),
      meta: { title: 'IV Therapy Packages in Naples, FL | Gulf Coast IV Concierge' }
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('../views/HowItWorksView.vue'),
      meta: { title: 'How IV Therapy Works | Gulf Coast IV Concierge' }
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('../views/LocationsView.vue'),
      meta: { title: 'Mobile IV Therapy Service Areas | Naples & SWFL' }
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: () => import('../views/FaqsView.vue'),
      meta: { title: 'Frequently Asked Questions | Gulf Coast IV Concierge' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: 'Contact Us | Gulf Coast IV Concierge' }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/LegalView.vue'),
      props: { type: 'privacy' },
      meta: { title: 'Privacy Policy | Gulf Coast IV Concierge' }
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/LegalView.vue'),
      props: { type: 'terms' },
      meta: { title: 'Terms & Conditions | Gulf Coast IV Concierge' }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Gulf Coast IV Concierge'
})

export default router
