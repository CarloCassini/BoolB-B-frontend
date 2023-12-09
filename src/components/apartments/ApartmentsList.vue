<script>
import ApartmentCard from "./ApartmentCard.vue";
import { store } from "../../data/store";
import axios from "axios";

export default {
  data() {
    return {
      sponsorized: [],
    };
  },
  mounted() {
    this.addToSponsorized();
  },

  methods: {
    addToSponsorized() {
      this.apartments.forEach((element) => {
        this.sponsorized.push(element["id"]);
      });
    },
  },

  components: {
    ApartmentCard,
  },
  props: {
    apartments: Object,
    apartments_all: Object,
    colNumSm: Number,
    colNumMd: Number,
    colNumLg: Number,
  },
};
</script>

<template>
  <!-- <div :class="'row row-cols-' +colNum+  'row-cols-lg-' + colNumLg+ 'g-2 g-lg-3'"> -->
  <div class="mb-5">
    <div class="row g-2 g-lg-3">
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
        :class="
          'col-lg-' + colNumLg + ' col-md-' + colNumMd + ' col-sm-' + colNumSm
        "
        v-for="(apartment, index) in apartments_all"
        key="index"
      >
        <ApartmentCard
          v-if="!sponsorized.includes(apartment['id'])"
          :apartment="apartment"
          :isDetail="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
