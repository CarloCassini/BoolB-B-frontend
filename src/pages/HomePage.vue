<script>
import ApartmentList from "../components/apartments/ApartmentList.vue";

export default {
  data() {
    return {
      title: "Welcome to Bool B&B"
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