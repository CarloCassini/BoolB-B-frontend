<script>
// import MyComponent from "./components/MyComponent.vue";
import axios from "axios";
import { store } from "../../data/store";
import ApartmentCard from "./ApartmentCard.vue";
import Map from "../partials/ui/Map.vue";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";

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
  mounted() {
    axios
      .get(store.apiUrl + "/apartments/" + this.$route.params.id)
      .then((response) => {
        this.apartment = response.data.results;
        console.log(this.apartment.latitude);
        console.log(this.apartment.longitude);

        if (this.apartment.latitude && this.apartment.longitude) {
          const latitude = parseFloat(this.apartment.latitude);
          const longitude = parseFloat(this.apartment.longitude);

          this.map = tt.map({
            key: "t7a52T1QnfuvZp7X85QvVlLccZeC5a9P",
            container: "map",
            center: [latitude, longitude],
            zoom: 7,
          });
          this.map.on("load", () => {
            let center = [latitude, longitude];
            let marker = new tt.Marker().setLngLat(center).addTo(this.map);
          });
        } else {
          console.error("I dati dell'appartamento non sono validi!");
        }
      })
      .catch((error) => console.error(error));
  },
};
</script>

<template>
  <div class="container">
    <h1 class="m-3">Dettagli appartamento {{ this.$route.params.id }}</h1>
    <ApartmentCard :apartment="apartment" :isDetail="true" v-if="apartment" />
    <div id="map" class="map">
      <Map
        :latitude="apartment.latitude"
        :longitude="apartment.longitude"
        v-if="apartment"
      ></Map>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
  width: 100%;
}
</style>
