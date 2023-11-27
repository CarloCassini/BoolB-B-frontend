<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Card"
    }
  },
  props:{
    'apartment': Object
  }

  // components: {
  //   MyComponent,
  // },

};
</script>

<template>
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-2">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">{{apartment.title}}</h5>
        <p class="card-text">{{ apartment.description }}</p>
        <p class="card-text"><small class="text-body-secondary"></small></p>
      </div>
    </div>
    <div class="col-md-2">
      servizi font awesome
    </div>
    <div class="col-md-2">
      statistiche tipo rooms e m2 ecc ecc
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped></style>