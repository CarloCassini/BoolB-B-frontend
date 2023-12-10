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

  props: {
    latitude: Array,
    longitude: Array,
  },

  methods: {
    fetchMap() {
      //chiamata appartamento singolo per latitudine e longitudine (TomTom)
      if (this.latitude && this.longitude) {
        const latitude = parseFloat(this.latitude[0]);
        const longitude = parseFloat(this.longitude[0]);
        this.map = tt.map({
          key: "t7a52T1QnfuvZp7X85QvVlLccZeC5a9P",
          container: "map",
          center: [longitude, latitude],
          zoom: 16,
        });
        this.latitude.forEach((element, index) => {
          this.map.on("load", () => {
            let center = [this.longitude[index], this.latitude[index]];
            let marker = new tt.Marker().setLngLat(center).addTo(this.map);
            console.log(center);
          });
        });
      } else {
        console.error("I dati dell'appartamento non sono validi!");
      }
      // console.log("ARRAY");
      // console.log(this.latitude);
      // console.log(this.longitude);
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
