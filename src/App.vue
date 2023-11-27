<script>
import NavbarUi from "./components/partials/ui/NavbarUi.vue";

export default {

  components: {
    NavbarUi,
  },
};
</script>

<template>
  <NavbarUi/>
  <!-- <h1>ciao</h1> -->
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>