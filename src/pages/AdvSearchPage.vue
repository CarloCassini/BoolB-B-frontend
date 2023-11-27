<script>
// import MyComponent from "./components/MyComponent.vue";
import ApartmentList from "../components/apartments/ApartmentList.vue";


export default {
  data() {
    return {
      title: "Search Your perfect Apartment"
    }
  },
  components: {
    ApartmentList,
  },
};
</script>

<template>
  <h1>{{ title }}</h1>
  <ApartmentList />
</template>

<style lang="scss" scoped></style>