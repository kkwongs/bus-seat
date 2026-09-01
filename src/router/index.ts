import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        const authStore = useAuthStore()

        return authStore.isAdmin ? '/admin' : '/user'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/LoginPage.vue'),
    },
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout.vue'),
      meta: { requiresAuth: true, role: 'USER' },
      children: [
        {
          path: 'my',
          name: 'user-my',
          component: () => import('@/pages/user/MyPage.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/admin/AdminHomePage.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return authStore.isAdmin ? { name: 'admin' } : { name: 'user' }
  }

  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    return authStore.isAdmin ? { name: 'admin' } : { name: 'user' }
  }

  return true
})

export default router
