<script>
import ApartmentCard from "./ApartmentCard.vue";
import {store} from '../../data/store'
import axios from "axios";


export default {
  data() {
    return {
    };
  },

  components: {
    ApartmentCard,
  },
  props:{
    'apartments':Array
  },
 
};
</script>

<template>
  <div class="container">
    <div class="row g-4">
      <div class="col-4" v-for="(apartment,index) in apartments" key="index" >

        <ApartmentCard :apartment="apartment"/>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
