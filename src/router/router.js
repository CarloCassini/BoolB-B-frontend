import { createRouter, createWebHistory } from "vue-router";
// vedi sotto

import HomePage from "../pages/HomePage.vue";
import AdvSearchPage from "../pages/AdvSearchPage.vue";
import ApartmentDetail from "../components/apartments/ApartmentDetail.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
    {
      path: "/search/:beds?/:rooms?/:distance?/:activeServices?",
      name: "search",
      component: AdvSearchPage,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: ApartmentDetail,
    },
    // {
    //   path:'',
    //   name:'',
    //   component:,
    // },
  ],
});

export { router };
