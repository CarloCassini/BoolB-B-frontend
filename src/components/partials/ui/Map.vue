<script>
import axios from "axios";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";
import { store } from "../../../data/store";

export default {
  data() {
    return {
      apartment: null,
      store,
    };
  },
  methods: {
    fetchMap() {
      //chiamata appartamento singolo per latitudine e longitudine (TomTom)
      axios
        .get(this.store.apiUrl + "/apartments/" + this.$route.params.id)
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
              center: [longitude, latitude],
              zoom: 16,
            });

            this.map.on("load", () => {
              let center = [longitude, latitude];
              let marker = new tt.Marker().setLngLat(center).addTo(this.map);
              console.log(center);
            });
          } else {
            console.error("I dati dell'appartamento non sono validi!");
          }
        })
        .catch((error) => console.error(error));
    },
  },

  mounted() {
    this.map = null;
    this.fetchMap();
  },
};
</script>

<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 400px;
  width: 100%;
}
</style>
