<script>
import axios from "axios";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";
import { store } from "../../../data/store";

export default {
  data() {
    return {
      apartments: [],
      map: null,
      store,
    };
  },

  props: {
    arrLat: Array,
    arrLong: Array,
  },

  methods: {
    fetchSearchMap() {
      console.log("CICCIO");
      console.log(store.arrLat);
      // this.map = tt.map({
      //   key: "t7a52T1QnfuvZp7X85QvVlLccZeC5a9P",
      //   container: "map",
      //   zoom: 15,
      // });

      //   this.arrLat.forEach((apartment) => {
      //   const { latitude, longitude } = apartment;
      //   let center = [longitude, latitude];
      //   let marker = new tt.Marker().setLngLat(center).addTo(this.map);
      //   marker.setPopup(new tt.Popup().setHTML(title)).addTo(this.map);
      // });
    },
  },

  mounted() {
    this.fetchSearchMap();
  },
};
</script>

<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.searchMap {
  height: 400px;
  width: 100%;
}
</style>
