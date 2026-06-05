import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Mobile IV Therapy & Clinical Wellness | GC IV Concierge' }
  },
  {
    path: '/packages',
    name: 'packages',
    component: () => import('../views/PackagesView.vue'),
    meta: { title: 'IV Therapy Packages & Pricing | GC IV Concierge' }
  },
  {
    path: '/treatments/:id',
    name: 'treatment-detail',
    component: () => import('../views/TreatmentDetailView.vue'),
    meta: { title: 'Treatment Clinical Profile | GC IV Concierge' }
  },
  {
    path: '/how-it-works',
    name: 'how-it-works',
    component: () => import('../views/HowItWorksView.vue'),
    meta: { title: 'How Our Mobile IV Service Works | GC IV Concierge' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About Our Clinical Standards | GC IV Concierge' }
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../views/LocationsView.vue'),
    meta: { title: 'Service Areas | GC IV Concierge' }
  },
  {
    path: '/faqs',
    name: 'faqs',
    component: () => import('../views/FaqsView.vue'),
    meta: { title: 'Frequently Asked Questions | GC IV Concierge' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Book Your IV Therapy | GC IV Concierge' }
  },
  {
    path: '/weddings',
    name: 'weddings',
    component: () => import('../views/BridalLandingView.vue'),
    meta: { title: 'Bridal & Wedding Party IV Therapy | GC IV Concierge' }
  },
  {
    path: '/clubhouse',
    name: 'clubhouse',
    component: () => import('../views/ClubhouseLandingView.vue'),
    meta: { title: 'Golf & Tennis IV Performance | GC IV Concierge' }
  },
  {
    path: '/inquire',
    name: 'inquire',
    component: () => import('../views/InquireView.vue'),
    meta: { title: 'Contact Us | GC IV Concierge' }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('../views/SuccessView.vue'),
    meta: { title: 'Request Received | GC IV Concierge' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/LegalView.vue'),
    props: { type: 'privacy' },
    meta: { title: 'Privacy Policy | GC IV Concierge' }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/LegalView.vue'),
    props: { type: 'terms' },
    meta: { title: 'Terms of Service | GC IV Concierge' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      title: 'Admin Portal | GC IV Concierge',
      robots: 'noindex, nofollow',
      hideNav: true
    }
  },
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('../views/OnboardingView.vue'),
    meta: {
      title: 'Employee Portal | GC IV Concierge',
      robots: 'noindex, nofollow',
      hideNav: true
    }
  },
  // B2B Partnership Hub
  {
    path: '/partnerships',
    name: 'partnerships',
    component: () => import('../views/PartnershipsHubView.vue'),
    meta: {
      title: 'Partner with Us | GC IV Concierge',
      robots: 'index, follow'
    }
  },
  // B2B Partnership Spokes (Dynamic)
  {
    path: '/partnerships/:industry',
    name: 'partnership-spoke',
    component: () => import('../views/PartnershipsSpokeView.vue'),
    meta: {
      robots: 'index, follow'
    }
  }
]