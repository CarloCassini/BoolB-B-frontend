<script>
import axios from "axios";
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import FilterBoxUi from "../components/partials/ui/FiltersBoxUi.vue";
import { store } from "../data/store";

export default {
  data() {
    return {
      store,
      title: "Search Your perfect Apartment",
      fetch: 0,
      services: [],
      apartments: [],
    };
  },
  components: {
    ApartmentsList,FilterBoxUi,
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
  <div class="container">
    <h1>{{ title }}</h1>
    <hr />
<!--     <div class="card" data-bs-theme="light">
      <div class="card-header text-center">
        <h5>Filters</h5>
      </div>
      <div class="card-body">
        <span> services </span>
        <span
          v-for="(service, index) in this.services"
          :class="{ disabled: !service.active }"
          class="badge me-2 my-2 bg-gradient bg-dark fs-5"
          @click="toggleService(service)"
        >
          <font-awesome-icon :icon="service.symbol" style="color: #ff7977" />
        </span>
        <hr />
        <span> distance </span>
        <input
          @change="fetchApartments()"
          type="number"
          id="distance"
          class="bg-light text-dark border"
        />
        <hr />
        <span> beds </span>
        <input
          @change="fetchApartments()"
          type="number"
          id="beds"
          class="bg-light text-dark border"
        />
        <hr />
        <span> rooms </span>
        <input
          @change="fetchApartments()"
          type="number"
          id="rooms"
          class="bg-light text-dark border"
        />
      </div>
      <div class="card-footer"></div>
    </div> -->
    <!-- <div @click="fetchApartments()" class="btn">ciccio</div> -->
     <FilterBoxUi />
    <div class="row">
      <div class="col-md-6">
        <!-- <ApartmentsList :apartments="this.apartments" :key="fetch" /> -->
        <ApartmentsList :key="fetch" :colNumSm="12" :colNumMd="6" :colNumLg="4" :apartments="store.filteredApartments" />
      </div>
      <div class="col-md-6">mappa</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
</style>
