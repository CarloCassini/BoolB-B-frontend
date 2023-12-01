<script>
import NavbarUi from "./components/partials/ui/NavbarUi.vue";
import {store} from './data/store'
import axios from "axios";


export default {

  components: {
    NavbarUi,
  },
  methods:{
    fetchServices(apiUri = store.apiUrl +'/services'){
      axios.get(apiUri).then((response)=>{

        // console.log(response);
        
        store.services = response.data
        // store.load++

        // console.log(store.services[0].label);
      })

    }
  },
  created() {
    this.fetchServices();
  },
};
</script>

<template>
  <NavbarUi />
  <!-- <h1>ciao</h1> -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>