<script>
// importo axios
import axios from "axios";

// importare store
// bisogna importarlo con le grafe perchè ha bisogno del destructuring
import { store } from "../../data/store";

export default {
  components: {},

  data() {
    return {
      store,
      places: [],
    };
  },

  computed: {},

  methods: {},

  created() {
    axios
      .get(
        "https://api.tomtom.com/search/2/geocode/roma.json?key=t7a52T1QnfuvZp7X85QvVlLccZeC5a9P"
      )
      .then((response) => {
        console.log(response);
        this.places = response.data;
      });
  },

  props: {},

  emits: [],
};
</script>

<template>
  <div class="container">
    ciccio 2
    <div class="debug my-5">cicciolone</div>
  </div>
  <div class="debug">store = {{ store.esempio }}</div>

  <font-awesome-icon icon="fa-solid fa-envelope" />
  <div class="div">
    latitudine : {{ places.results[0].position.lat }}
    <br />
    longitudine :
    {{ places.results[0].position.lon }}
  </div>
</template>

<style lang="scss" scoped></style>
