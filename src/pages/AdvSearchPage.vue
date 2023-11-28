<script>
import axios from "axios";
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import { store } from "../data/store";

export default {
  data() {
    return {
      title: "Search Your perfect Apartment",
      fetch: 0,
    };
  },
  components: {
    ApartmentsList,
  },
  methods: {
    fetchApartments(apiUri = store.apiUrl + "/apartments/service/" + 1) {
      console.log("call search");

      axios.get(apiUri).then((response) => {
        console.log(response.data.results.data);
        this.apartments = response.data.results.data;
        this.fetch++;
      });
    },
  },
  created() {
    this.fetchApartments();
  },
};
</script>

<template>
  <div class="container">

    <h1>{{ title }}</h1>
    <!-- <div @click="fetchApartments()" class="btn">ciccio</div> -->
    <div class="row">
      <div class="col-md-6">
        <!-- <ApartmentsList :apartments="this.apartments" :key="fetch" /> -->
        apartments list
      </div>
      <div class="col-md-6">
        mappa
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped></style>
