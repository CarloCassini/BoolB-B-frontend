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
  <h1>{{ title }}</h1>
  <div @click="fetchApartments()" class="btn">ciccio</div>
  <ApartmentsList :apartments="this.apartments" :key="fetch" />
</template>

<style lang="scss" scoped></style>
