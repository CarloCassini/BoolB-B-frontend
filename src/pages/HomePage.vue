<script>
import axios from "axios";

import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import { store } from "../data/store";

export default {
  data() {
    return {
      title: "Welcome to Bool B&B",
      apartments: [],
    };
  },
  components: {
    ApartmentsList,
  },
  methods: {
    fetchApartments(apiUri = store.apiUrl + "/apartments") {
      console.log("call");

      axios.get(apiUri).then((response) => {
        this.apartments = response.data.results.data;
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
  <ApartmentsList :apartments="this.apartments" />
</template>

<style lang="scss" scoped></style>
