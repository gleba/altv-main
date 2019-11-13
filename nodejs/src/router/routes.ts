import { RouteConfig } from 'vue-router'
import {rmap} from "~/router/rmap";



// const defalutLayout = import('layouts/default.vue')
// const dLayout = () => defalutLayout
const clear = () => import('layouts/clear.vue')
const routes: RouteConfig[] = [
  rmap('/', clear, () => import('pages/Index.vue')),
  rmap('/vicast/', clear, () => import('pages/Vicast.vue')),
  rmap('/auth/', clear, () => import('pages/Auth.vue')),
  rmap('/auth/:authRune', clear, () => import('pages/AuthRune.vue'))
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
