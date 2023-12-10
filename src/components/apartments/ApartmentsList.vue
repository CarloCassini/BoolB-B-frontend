<script>
import ApartmentCard from "./ApartmentCard.vue";
import { store } from "../../data/store";
import axios from "axios";
import Map from "../partials/ui/Map.vue";

export default {
  data() {
    return {};
  },

  methods: {},

  components: {
    ApartmentCard,
    Map,
  },
  props: {
    apartments: Object,
    apartments_all: Object,
    sponsorized: Array,
    isSearch: Boolean,
    colNumSm: Number,
    colNumMd: Number,
    colNumLg: Number,
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
};
</script>

<template>
  <!-- <div :class="'row row-cols-' +colNum+  'row-cols-lg-' + colNumLg+ 'g-2 g-lg-3'"> -->
  <div v-if="!isSearch" class="mb-5">
    <div class="row g-2 g-lg-3 display-back scroll-display">
      <div
        :class="
          'col-lg-' + colNumLg + ' col-md-' + colNumMd + ' col-sm-' + colNumSm
        "
        v-for="(apartment, index) in apartments"
        key="index"
      >
        <ApartmentCard :apartment="apartment" :isDetail="false" />
      </div>

      <div
        v-for="(apartment, index) in apartments_all"
        :class="
          'col-lg-' + colNumLg + ' col-md-' + colNumMd + ' col-sm-' + colNumSm
        "
        key="index"
      >
        <ApartmentCard :apartment="apartment" :isDetail="false" />
      </div>
    </div>
  </div>
  <div v-if="isSearch" class="mb-5 d-flex">
    <div class="col-6 row g-2 g-lg-3 display-back scroll-display">
      <div
        :class="
          'col-lg-' + colNumLg + ' col-md-' + colNumMd + ' col-sm-' + colNumSm
        "
        v-for="(apartment, index) in apartments"
        key="index"
      >
        <ApartmentCard :apartment="apartment" :isDetail="false" />
      </div>

      <div
        v-for="(apartment, index) in apartments_all"
        :class="
          'col-lg-' + colNumLg + ' col-md-' + colNumMd + ' col-sm-' + colNumSm
        "
        key="index"
      >
        <ApartmentCard :apartment="apartment" :isDetail="false" />
      </div>
    </div>
    <div class="ms-3 col-6 display-back scroll-display debug">
      <div class="col-md-6">
        <h3>Mappa appartamenti</h3>
        <div id="map" class="map">
          {{ arrLat }}
          {{ arrLong }}
          <Map :latitude="0" :longitude="0"></Map>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
