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
    };
  },

  props: {
    apartments: Array,
  },

  methods: {
    fetchSearchMap() {
      if (this.apartments.length > 0) {
        this.map = tt.map({
          key: "t7a52T1QnfuvZp7X85QvVlLccZeC5a9P",
          container: "searchMap",
          zoom: 15,
        });

        this.apartments.forEach((apartment) => {
          const { latitude, longitude, title } = apartment;
          let center = [longitude, latitude];
          let marker = new tt.Marker().setLngLat(center).addTo(this.map);
          marker.setPopup(new tt.Popup().setHTML(title)).addTo(this.map);
        });
      } else {
        console.error("Nessun dato sugli appartamenti fornito!");
      }
    },
  },

  mounted() {
    this.fetchSearchMap();
  },
};
</script>

<template>
  <div>
    <div id="searchMap" class="searchMap"></div>
  </div>
</template>

<style lang="scss" scoped>
.searchMap {
  height: 400px;
  width: 100%;
}
</style>
