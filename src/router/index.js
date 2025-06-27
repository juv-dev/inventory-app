import { createRouter, createWebHistory } from 'vue-router';
import ProductosList from '../components/ProductosList.vue';
import ProductosCrud from '../components/ProductosCrud.vue';
import PreviewOrder from '../views/previewOrder.vue';
import Login from '../components/Login.vue';

const routes = [
  {
    path: '/productos',
    name: 'ProductosList',
    component: ProductosList
  },
  {
    path: '/productos/crud',
    name: 'ProductosCrud',
    component: ProductosCrud,
    meta: { requiresAuth: true }
  },
    {
    path: '/preview-order',
    name: 'carrito',
    component: PreviewOrder,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/productos'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && localStorage.getItem('auth') !== 'true') {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && localStorage.getItem('auth') === 'true') {
    next({ name: 'ProductosCrud' });
  } else {
    next();
  }
});

export default router;
