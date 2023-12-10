<script>
import axios from "axios";
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/apartmentslist.vue";
import FilterBoxUi from "../components/partials/ui/FiltersBoxUi.vue";
import HeadingTxtUi from "../components/partials/ui/HeadingTxtUi.vue";
import SearchMap from "../components/partials/ui/SearchMap.vue";
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
    SearchMap,
    Map,
  },
  methods: {
    /*     fetchApartments() {
      const activeServices = [];
      let distance = 20;
      let beds = 1;
      let rooms = 1;
      const distanceEl = document.getElementById("distance");
      const bedsEl = document.getElementById("beds");
      const roomsEl = document.getElementById("rooms");
      if (distanceEl.value) {
        distance = distanceEl.value;
      }
      if (bedsEl.value) {
        beds = bedsEl.value;
      }
      if (roomsEl.value) {
        rooms = roomsEl.value;
      }
      this.services.forEach((service) => {
        if (service.active) activeServices.push(service.id);
      });
      // console.log(activeServices,distance,beds,rooms);

      axios
        .post(
          store.apiUrl + "/apartments-by-filters",
          { activeServices, distance, beds, rooms },
          {
            headers: {
              "contet-type": "multypart/form-data",
            },
          }
        )
        .then((response) => {
          this.apartments = response.data.data;
        });
    }, */
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
    this.fetchServices();
  },
  mounted() {
    // this.fetchApartments();
  },
};
</script>

<template>
  <div class="debug">{{ arrLat }}</div>
  <div class="debug">{{ arrLong }}</div>
  <div class="scroll-main">
    <div class="container">
      <HeadingTxtUi :subtitle="this.subTitle" :title="this.title" />

      <div class="my-5 search-container">
        <FilterBoxUi />
      </div>
      <div class="row">
        <div class="col-md-6">
          <ApartmentsList
            :key="fetch"
            :colNumSm="12"
            :colNumMd="6"
            :colNumLg="4"
            :apartments="store.filteredApartmentsSponsor"
            :apartments_all="store.filteredApartmentsAll"
            :sponsorized="store.sponsorized"
          />
        </div>
        <div class="col-md-6" v-if="arrLat">
          <h3>Mappa appartamenti</h3>
          <!-- <div id="map" class="map">
            <Map :latitude="arrLat" :longitude="arrLong"></Map>
          </div> -->
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
