<script>
import ApartmentCard from "./ApartmentCard.vue";
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {};
  },

  components: {
    ApartmentCard,
  },
  props: {
    apartments: Array,
    'colNum':Number
  },
};
</script>

<template>
 
    <div class="row g-4">
      <div :class="'col-' + colNum" v-for="(apartment,index) in apartments" key="index" >

        <ApartmentCard :apartment="apartment" :isDetail="false"/>

      </div>
    </div>
  
</template>

<style lang="scss" scoped></style>
