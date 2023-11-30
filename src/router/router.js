import { createRouter, createWebHistory } from "vue-router";
// vedi sotto
import Prova from "../components/pages/Prova.vue";
import HomePage from "../pages/HomePage.vue";
import AdvSearchPage from "../pages/AdvSearchPage.vue";
import ApartmentDetail from "../components/apartments/ApartmentDetail.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // in path troviamo l'url che vedremo anche nel browser
      path: "/prova",
      //   in name troviamo il nome della rotta. è il valore che verrà chiamato dai bottoni che implementano il tag <router-link :to="{name: 'home'}"> </router-link>
      name: "prova",
      //quale componente apparirà a questa rotta? lo abbiamo importato nel file router.js? vedi sopra
      component: Prova,
    },
    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
    {
      path: "/search",
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
