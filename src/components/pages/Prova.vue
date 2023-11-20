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
    };
  },

  computed: {},

  methods: {},

  //created(): {},

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
</template>

<style lang="scss" scoped></style>
