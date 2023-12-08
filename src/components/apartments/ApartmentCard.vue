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
<!-- * card on grid -->
<template>
<router-link v-if="!isDetail" :to="{ name: 'detail', params:{id: apartment.id}, }" class="text-decoration-none active-sense">

<div class="card mb-3 h-100 bg-light p-0 bg-gradient text-dark overflow-hidden ">
  <div class="container-overlay text-white ">
    <div class="overlayed h-100 w-100 d-flex flex-column justify-content-between">

      <!--* apartment Title -------------------------------------------------------------------->
      <h5 class="card-title heading-size m-2">{{apartment.title}}</h5>

      <!--* apartment Services ----------------------------------------------------------------->
      <div class="d-flex flex-wrap">
       
        
          <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 bg-gradient bg-dark">

            <abbr :title="service.label" class="initialism">

              <font-awesome-icon :icon="service.symbol" style="color: #ff7977;" />
            
            </abbr>

          </span>
        
      </div>
      <!--* apartment Data --------------------------------------------------------------------->
      <div class="d-flex justify-content-between">
        <div>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-bed" /> <span style="color: #ff7977;">{{apartment.beds}}</span></span> <br>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-door-open" /> <span style="color: #ff7977;">{{apartment.rooms}}</span></span> <br>
        </div>
        <div>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-toilet" /> <span style="color: #ff7977;">{{apartment.bathrooms}}</span></span> <br>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-maximize" /> <span style="color: #ff7977;">{{apartment.m2}}</span> &#13217</span> <br>
        </div>
        
      </div>
    </div>
    <!--* apartment Cover ---------------------------------------------------------------------->
    <img v-if="!apartment.cover_image_path" src="https://via.placeholder.com/2000x1500.png/333333?text=Placeholder" class="card-img-top h-100" alt="Placeholder">
    <img v-else-if="apartment.cover_image_path.startsWith('http://') || apartment.cover_image_path.startsWith('https://')" :src="apartment.cover_image_path" class="card-img-top h-100" alt="External Image">
    <img v-else :src="store.storageUrl + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image"> 
  </div>

  <div class="card-body p-0">

    <p class="normal-txt-size m-0 px-1"><small>{{apartment.address}}</small></p>
    <!-- <p class="card-text normal-txt-size">{{ apartment.description }}</p> -->
    <!-- <div class="d-flex flex-column normal-txt-size">
      <span><strong class="me-1">Rooms:</strong>{{ apartment.rooms }}</span>
      <span><strong class="me-1">Beds:</strong>{{ apartment.beds }}</span>
      <span><strong class="me-1">Bathrooms:</strong>{{ apartment.bathrooms }}</span>
      <span><strong class="me-1">Surface:</strong>{{ apartment.m2 }}&#13217</span>
    </div> -->

  </div>
</div>
</router-link>
<!-- * card on detail -->

<div v-else class="card mb-3 h-100 bg-light p-0 bg-gradient text-dark">
  <div>
    <img v-if="!apartment.cover_image_path" src="https://via.placeholder.com/2000x1500.png/333333?text=Placeholder" class="card-img-top h-100" alt="Placeholder">
    <img v-else-if="apartment.cover_image_path.startsWith('http://') || apartment.cover_image_path.startsWith('https://')" :src="apartment.cover_image_path" class="card-img-top h-100" alt="External Image">
    <!-- <img v-else :src="'http://127.0.0.1:8000/storage/' + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image">  -->
    <img v-else :src="store.storageUrl + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image"> 
  </div>
  <div class="card-body">
    <h5 class="card-title title-responsive">{{apartment.title}}</h5>
    <p class="card-text text-responsive">{{ apartment.description }}</p>
    <div class="d-flex flex-column">
      <div class="d-flex justify-content-between">
        <span class="text-responsive"><strong class="me-1">Rooms:</strong>{{ apartment.rooms }}</span>
        <span class="text-responsive"><strong class="me-1">Beds:</strong>{{ apartment.beds }}</span>

      </div>
      <div class="d-flex justify-content-between">
        <span class="text-responsive"><strong class="me-1">Bathrooms:</strong>{{ apartment.bathrooms }}</span>
        <span class="text-responsive"><strong class="me-1">Surface:</strong>{{ apartment.m2 }}&#13217</span>

      </div>
    </div>
    <span  class="badge text-responsive" style="background-color: #ff7977;">{{apartment.beds}} <font-awesome-icon icon="fa-solid fa-bed" /></span> <br>
    <strong class="text-responsive" >Servizi:</strong>
    <div class="d-flex flex-wrap title-responsive">
     

        <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 bg-gradient bg-dark"><!-- {{ service.label }} --> <font-awesome-icon :icon="service.symbol" style="color: #ff7977;" /></span>
      
    </div>
    <p class="card-text"><small class="text-responsive">{{apartment.address}}</small></p>
    <div class="card-footer text-responsive" v-if="!isDetail">
      <router-link :to="{ name: 'detail', params:{id: apartment.id},  }" class="btn btn-secondary text-responsive" >
      Vedi dettaglio
    </router-link>
    </div>

  </div>
</div>

</template>

<style lang="scss" scoped>
.heading-size{
  font-size: 1.1rem;
  max-height: 1rem;
  overflow: hidden;
}
.normal-txt-size{
  font-size:rem;
}
.overlayed{
  position: absolute;
  background: linear-gradient(#000000, #00000000);
  opacity: .5;
}
.overlayed:hover{
  opacity: .8;
}
.active-sense:focus{
  .overlayed{
    opacity: .8;
  }

}
.container-overlay{
  position: relative;
  // overflow: hidden;
}
// .text-responsive {
//   font-size: 1.5vw; /* o puoi utilizzare 2vmin, o regola il valore in base alle tue esigenze */
// }
// .title-responsive {
//   font-size: 2vw; /* o puoi utilizzare 2vmin, o regola il valore in base alle tue esigenze */
// }
</style>