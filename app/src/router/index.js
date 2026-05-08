import HomeView from '../views/HomeView.vue'

export const routes = [
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
    meta: { title: 'IV Therapy Packages & Pricing | Gulf Coast IV Concierge' }
  },
  {
    path: '/how-it-works',
    name: 'how-it-works',
    component: () => import('../views/HowItWorksView.vue'),
    meta: { title: 'How Our Mobile IV Service Works | Gulf Coast IV Concierge' }
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../views/LocationsView.vue'),
    meta: { title: 'Service Areas | Gulf Coast IV Concierge' }
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
    meta: { title: 'Book Your IV Therapy | Gulf Coast IV Concierge' }
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
    meta: { title: 'Terms of Service | Gulf Coast IV Concierge' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      title: 'Admin Portal | Gulf Coast IV Concierge',
      robots: 'noindex, nofollow'
    }
  }
]