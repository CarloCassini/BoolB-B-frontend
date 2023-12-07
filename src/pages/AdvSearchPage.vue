<script>
import axios from "axios";
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/ApartmentsList.vue";
import FilterBoxUi from "../components/partials/ui/FiltersBoxUi.vue";
import HeadingTxtUi from "../components/partials/ui/HeadingTxtUi.vue";
import { store } from "../data/store";

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
  components: {
    ApartmentsList,FilterBoxUi,HeadingTxtUi
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
  <div class="container">
    <HeadingTxtUi :subtitle="this.subTitle" :title="this.title" />
    
    <div class="my-5 search-container">
      <FilterBoxUi />

    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="cards-container">
          
          <ApartmentsList :key="fetch" :colNumSm="12" :colNumMd="6" :colNumLg="4" :apartments="store.filteredApartments" />

        </div>
      </div>
      <div class="col-md-6">mappa</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  filter: grayscale(1);
}
.search-container{
  position: sticky;
  top: 60px;
  z-index: 2;
}
.cards-container{
  overflow-y: scroll;
  overflow-x: hidden;
  // height: 80vh;
}
</style>
