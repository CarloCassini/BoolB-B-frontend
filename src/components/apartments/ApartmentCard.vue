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
  <!-- <div class="card text-bg-light mb-3 ">
  <div class="row g-0">
    <div class="col-md-2">
      <img src="{{apartment.cover_image_path}}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-4">
      <div class="card-body">
        <h5 class="card-title">{{apartment.title}}</h5>
        <p class="card-text">{{ apartment.description }}</p>
        <p class="card-text"><small class="text-body-secondary"></small></p>
      </div>
    </div>
    <div class="col-md-2">
      <div class="d-flex flex-column">
        <span><strong class="me-1">Stanze:</strong>{{ apartment.rooms }}&#13217</span>
        <span><strong class="me-1">bagni:</strong>{{ apartment.bathrooms }}&#13217</span>
        <span><strong class="me-1">Grandezza:</strong>{{ apartment.m2 }}&#13217</span>
      </div>
    </div>
    <div class="col-md-2">
      servizi font awesome
    </div>
  </div>
</div> -->
<div class="card mb-3 h-100 bg-light p-2 bg-gradient text-dark">
  <div >
    <img v-if="apartment.cover_image_path" :src="apartment.cover_image_path" class="card-img-top h-100" alt="...">
    <img v-else src="https://via.placeholder.com/200x150.png/333333?tex" class="card-img-top h-100" alt="...">
  </div>
  <div class="card-body">
    <h5 class="card-title">{{apartment.title}}</h5>
    <p class="card-text">{{ apartment.description }}</p>
    <div class="d-flex flex-column">
        <span><strong class="me-1">Stanze:</strong>{{ apartment.rooms }}&#13217</span>
        <span><strong class="me-1">bagni:</strong>{{ apartment.bathrooms }}&#13217</span>
        <span><strong class="me-1">Grandezza:</strong>{{ apartment.m2 }}&#13217</span>
      </div>
      <span class="badge fs-5" style="background-color: #ff7977;">{{apartment.beds}} <font-awesome-icon icon="fa-solid fa-bed" /></span> <br>
    <strong>Servizi:</strong>
    <div class="d-flex flex-wrap">
     

        <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 bg-gradient bg-dark fs-5"><!-- {{ service.label }} --> <font-awesome-icon :icon="service.symbol" style="color: #ff7977;" /></span>
      
    </div>
    <p class="card-text"><small class="text-secondary">{{apartment.address}}</small></p>
  </div>
</div>
</template>

<style lang="scss" scoped></style>