import { createRouter, createWebHistory } from "vue-router";
// vedi sotto

import HomePage from '../pages/HomePage.vue'
import AdvSearchPage from '../pages/AdvSearchPage.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path:'/',
      name:'homepage',
      component:HomePage,
    },
    {
      path:'/search',
      name:'search',
      component:AdvSearchPage,
    },
    // {
    //   path:'',
    //   name:'',
    //   component:,
    // },
  ],
});
export { router };
