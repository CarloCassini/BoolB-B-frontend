<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";
import { store } from "../../data/store";
import ApartmentCard from "./ApartmentCard.vue";
import Map from "../partials/ui/Map.vue";

export default {
  data() {
    return {
      apartment: null,
    };
  },

  components: {
    ApartmentCard,
    Map,
  },
  created() {
    axios
      .get(store.apiUrl + "/apartments/" + this.$route.params.id)
      .then((response) => {
        this.apartment = response.data.results;
        console.log(this.apartment);
        console.log(store.apiUrl + "/apartments/" + this.$route.params.id);
      });
  },
};
</script>

<template>
  <div class="container">
    <h1 class="m-3">Dettagli appartamento {{ this.$route.params.id }}</h1>
    <ApartmentCard :apartment="apartment" :isDetail="true" v-if="apartment" />
    <!-- <Map /> -->
  </div>
</template>

<style lang="scss" scoped></style>
