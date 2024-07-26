import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      redirect: '/',
    },
    {
      path: '/products/:slug/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      strict: true,
      sensitive: true,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: {
        requiresAuth: true,
      },
      beforeEnter: async (to, from, next) => {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/RegisterView.vue'),
      beforeEnter: async (to, from, next) => {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          next('/');
        } else {
          next();
        }
      },
    },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

router.beforeEach(async to => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        path: '/login',
      };
    }
  }
});

export default router;
