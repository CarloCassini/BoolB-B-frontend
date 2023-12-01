<script>
import axios from "axios";

import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import HeroImgUi from "../components/partials/ui/heroimgui.vue";
import SearchBarUi from "../components/partials/ui/SearchBarUi.vue";

import { store } from "../data/store";

export default {
  data() {
    return {
      title: "Welcome to Boolbnb",
      apartments: [],
    };
  },
  components: {
    ApartmentsList,
    HeroImgUi,
    SearchBarUi,
  },
  methods: {
    fetchApartments(apiUri = store.apiUrl + "/apartments") {
      console.log("call");
      console.log(apiUri);

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
  <HeroImgUi />
  <div class="container">
    <ApartmentsList :colNum="3" :apartments="this.apartments" />
  </div>
</template>

<style lang="scss" scoped></style>
