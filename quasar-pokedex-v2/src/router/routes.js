
const routes = [
  {
    path: '/',
    component: () => import('layouts/PokedexLayout.vue'),
    // component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Pokedex.vue') }
      // { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/pokedex',
    component: () => import('layouts/PokedexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Pokedex.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
