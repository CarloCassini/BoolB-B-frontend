<script>
// import MyComponent from "./components/MyComponent.vue";
import { store } from "../../data/store";
export default {
  data() {
    return {
      title: "Card",
      store,
    }
  },
  props:{
    apartment: Object,
    isDetail: Boolean,
  },

  // components: {
  //
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
  <div>
    <img v-if="!apartment.cover_image_path" src="https://via.placeholder.com/2000x1500.png/333333?text=Placeholder" class="card-img-top h-100" alt="Placeholder">
    <img v-else-if="apartment.cover_image_path.startsWith('http://') || apartment.cover_image_path.startsWith('https://')" :src="apartment.cover_image_path" class="card-img-top h-100" alt="External Image">
    <!-- <img v-else :src="'http://127.0.0.1:8000/storage/' + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image">  -->
    <img v-else :src="store.storageUrl + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image"> 
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
    <div class="card-footer" v-if="!isDetail">
      <router-link :to="{ name: 'detail', params:{id: apartment.id},  }" class="btn btn-secondary" >
      Vedi dettaglio
    </router-link>
    </div>

  </div>
</div>
</template>

<style lang="scss" scoped></style>