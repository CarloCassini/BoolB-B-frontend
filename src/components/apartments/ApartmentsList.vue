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
  <ApartmentCard v-for="(apartment,index) in apartments" key="index" :apartment="apartment"/>
</template>

<style lang="scss" scoped></style>
