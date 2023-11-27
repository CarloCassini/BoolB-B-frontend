<script>
// import MyComponent from "./components/MyComponent.vue";
import ApartmentsList from "../components/apartments/ApartmentsList.vue";

export default {
  data() {
    return {
      title: "Search Your perfect Apartment",
    };
  },
  components: {
    ApartmentsList,
  },
};
</script>

<template>
  <h1>{{ title }}</h1>
  <ApartmentsList />
</template>

<style lang="scss" scoped></style>
