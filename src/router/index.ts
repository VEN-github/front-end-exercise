import { createRouter, createWebHistory } from 'vue-router';
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
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

export default router;
