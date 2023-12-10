<script>
import axios from "axios";

import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import HeroImgUi from "../components/partials/ui/HeroImgUi.vue";

import { store } from "../data/store";
import FiltersBoxUi from "../components/partials/ui/FiltersBoxUi.vue";
import HeadingTxtUi from "../components/partials/ui/HeadingTxtUi.vue";

export default {
  data() {
    return {
      title: "Boolbnb",
      subTitle: "Welcome to",
      apartments: [],
    };
  },
  components: {
    ApartmentsList,
    HeroImgUi,
    FiltersBoxUi,
    HeadingTxtUi,
  },
  methods: {
    fetchApartments(apiUri = store.apiUrl + "/sponsored") {
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
  <div class="scroll-main">
    <!-- <HeroImgUi /> -->

    <!-- <div class="text-center my-5">
      <h2 class="display-6" style="color: #ffffff">Welcome to</h2>
      <h1 class="display-3" style="color: #ff7977">{{ title }}</h1>
    </div> -->
    <div class="container">
      <HeadingTxtUi :subtitle="this.subTitle" :title="this.title" />
      <div class="search-container my-5">
        <FiltersBoxUi />
      </div>
      <div class="my-1">
        <ApartmentsList
          :colNumSm="12"
          :colNumMd="4"
          :colNumLg="2"
          :apartments="this.apartments"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-main {
  height: calc(100vh - 56px);
  overflow-y: scroll;
}
.search-container {
  position: sticky;
  top: 10px;
  z-index: 2;
}
</style>
