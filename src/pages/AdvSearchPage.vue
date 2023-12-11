<script>
import axios from "axios";
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import FilterBoxUi from "../components/partials/ui/FiltersBoxUi.vue";
import HeadingTxtUi from "../components/partials/ui/HeadingTxtUi.vue";
import { store } from "../data/store";

import Map from "../components/partials/ui/Map.vue";

export default {
  data() {
    return {
      store,
      subTitle: "Search Your Next",
      title: "Apartment",
      fetch: 0,
      services: [],
      apartments: [],
    };
  },
  computed: {
    arrLat() {
      // console.log("cicico: " + store.filteredApartmentsAll[0]);
      let allLat = [];
      store.filteredApartmentsAll.forEach((apartment) => {
        allLat.push(apartment.latitude);
      });
      store.filteredApartmentsSponsor.forEach((apartment) => {
        allLat.push(apartment.latitude);
      });
      store.arrLat = allLat;
      return allLat;
    },
    arrLong() {
      let allLong = [];
      store.filteredApartmentsAll.forEach((apartment) => {
        allLong.push(apartment.longitude);
      });
      store.filteredApartmentsSponsor.forEach((apartment) => {
        allLong.push(apartment.longitude);
      });
      store.arrLong = allLong;
      return allLong;
    },
  },

  components: {
    ApartmentsList,
    FilterBoxUi,
    HeadingTxtUi,
    Map,
  },
  methods: {
    cercaZone() {},
    fetchServices() {
      axios.get(store.apiUrl + "/services").then((response) => {
        this.services = response.data.map((service) => {
          return {
            ...service,
            active: false,
          };
        });
      });
    },
    toggleService(service) {
      service.active = !service.active;
      // this.fetchApartments();
    },

    setError(element, message) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    },
  },
  created() {
    this.cercaZone();
    this.fetchServices();
  },
  mounted() {
    // this.fetchApartments();
  },
};
</script>

<template>
  <div class="scroll-main">
    <div class="container">
      <HeadingTxtUi :subtitle="this.subTitle" :title="this.title" />

      <div class="my-5 search-container">
        <FilterBoxUi />
      </div>
      <div class="row">
        <div class="col-12">
          <ApartmentsList
            :key="fetch"
            :colNumSm="12"
            :colNumMd="4"
            :colNumLg="2"
            :apartments="store.filteredApartmentsSponsor"
            :apartments_all="store.filteredApartmentsAll"
            :sponsorized="store.sponsorized"
            :isSearch="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
.search-container {
  position: sticky;
  top: 60px;
  z-index: 2;
}
.scroll-main {
  height: calc(100vh - 56px);
  overflow-y: scroll;
}
</style>
