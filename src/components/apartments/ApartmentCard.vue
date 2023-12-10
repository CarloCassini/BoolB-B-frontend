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

  components: {
  },

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
      <!-- <div class="d-flex flex-wrap">      
          <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 bg-gradient bg-dark">
            <abbr :title="service.label" class="initialism">
              <font-awesome-icon :icon="service.symbol" style="color: #ff7977;" />
            </abbr>
          </span>
      </div> -->
      <!--* apartment Data --------------------------------------------------------------------->
      <!-- <div class="d-flex justify-content-between">
        <div>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-bed" /> <span style="color: #ff7977;">{{apartment.beds}}</span></span> <br>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-door-open" /> <span style="color: #ff7977;">{{apartment.rooms}}</span></span> <br>
        </div>
        <div>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-toilet" /> <span style="color: #ff7977;">{{apartment.bathrooms}}</span></span> <br>
          <span  class="badge bg-gradient bg-dark me-1"><font-awesome-icon icon="fa-solid fa-maximize" /> <span style="color: #ff7977;">{{apartment.m2}}</span> &#13217</span> <br>
        </div>
        
      </div> -->
    </div>
    <!--* apartment Cover ---------------------------------------------------------------------->
    <div class="image-card">

      <img v-if="!apartment.cover_image_path" src="https://via.placeholder.com/2000x1500.png/333333?text=Placeholder" class="card-img-top h-100" alt="Placeholder">
      <img v-else-if="apartment.cover_image_path.startsWith('http://') || apartment.cover_image_path.startsWith('https://')" :src="apartment.cover_image_path" class="card-img-top h-100" alt="External Image">
      <img v-else :src="store.storageUrl + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image"> 
    </div>
  </div>

  <div class="card-body d-flex flex-column p-0 mx-2">
    <!-- feature -->
    <div class=" my-2 ">
        <div class="d-flex flex-wrap  justify-content-between">
          <span  class="badge bg-gradient badge-style col-3 p-1 "><font-awesome-icon icon="fa-solid fa-bed" /> <span >{{apartment.beds}}</span></span>
          <span  class="badge bg-gradient badge-style col-3 p-1"><font-awesome-icon icon="fa-solid fa-door-open" /> <span>{{apartment.rooms}}</span></span>
          <span  class="badge bg-gradient badge-style col-3 p-1"><font-awesome-icon icon="fa-solid fa-toilet" /> <span >{{apartment.bathrooms}}</span></span> 
          <span  class="badge bg-gradient badge-style col-3 p-1"><font-awesome-icon icon="fa-solid fa-maximize" /> <span >{{apartment.m2}}</span> &#13217 </span> 
        </div>
    </div>
    <!-- indirizzo -->
    <div >
      <p class="normal-txt-size m-0 px-1"><small>{{apartment.address}}</small></p>
    </div>
    <!-- servizi -->
    <div class="mt-auto">
      <div>
        services:      
      </div>
      <div class="d-flex flex-wrap justify-content-start">
        <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 badge-style col-2">
          <abbr :title="service.label" class="initialism">
            <font-awesome-icon :icon="service.symbol" />
          </abbr>
        </span>
      </div>
    </div>
  </div>
</div>

</router-link>
<!-- * card on detail -->

<div v-else class="card mb-3 h-100 bg-light p-0 bg-gradient text-dark">
  <div class="d-flex ">
    <div class="d-none d-md-block col-12 col-md-4 image-card-detail">
      <img v-if="!apartment.cover_image_path" src="https://via.placeholder.com/2000x1500.png/333333?text=Placeholder" class="card-img-top h-100" alt="Placeholder">
      <img v-else-if="apartment.cover_image_path.startsWith('http://') || apartment.cover_image_path.startsWith('https://')" :src="apartment.cover_image_path" class="card-img-top h-100" alt="External Image">
      <!-- <img v-else :src="'http://127.0.0.1:8000/storage/' + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image">  -->
      <img v-else :src="store.storageUrl + apartment.cover_image_path" class="card-img-top h-100" alt="Uploaded Image"> 
    </div>
    <div class="col-12 col-md-8 card-body d-flex flex-column">
      <h5 class="card-title title-responsive">{{apartment.title}}</h5>
      <div class=" apartment-description mt-3">
        <strong class="me-1">description:</strong>
        <p class="card-text text-responsive">{{ apartment.description }}</p>
      </div>
      <div class="d-flex flex-column mt-3">
        <div class="d-flex justify-content-between">
          <span class="text-responsive"><strong class="me-1">Rooms:</strong>{{ apartment.rooms }}</span>
          <span class="text-responsive"><strong class="me-1">Beds:</strong>{{ apartment.beds }}</span>

        </div>
        <div class="d-flex justify-content-between">
          <span class="text-responsive"><strong class="me-1">Bathrooms:</strong>{{ apartment.bathrooms }}</span>
          <span class="text-responsive"><strong class="me-1">Surface:</strong>{{ apartment.m2 }}&#13217</span>

        </div>
      </div>
      <div class="mt-3">
        <strong class="me-1">address:</strong>
        <p class="card-text"><small class="text-responsive">{{apartment.address}}</small></p>
      </div>
      <div class="mt-auto">
        <strong class="text-responsive" >services:</strong>
        <div class="d-flex flex-wrap title-responsive">
      </div>
          <span  v-for="(service,index) in apartment.services" class="badge me-2 my-2 bg-gradient badge-style"><!-- {{ service.label }} --> <font-awesome-icon :icon="service.symbol" /></span>
      </div>
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

.image-card{
width: 100%;
  aspect-ratio: 1;
}
.image-card>img{
  object-fit: cover;
}
.image-card-detail{
width: 40%;
  aspect-ratio: 1;
}
.image-card-detail>img{
  object-fit: cover;
}
.apartment-description{
  max-height: 30vh;
  overflow: auto;
}
.badge-style{
  background-color: #ff7977;
  border-radius: 0.5rem;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  font-weight: 700;
}

// .text-responsive {
//   font-size: 1.5vw; /* o puoi utilizzare 2vmin, o regola il valore in base alle tue esigenze */
// }
// .title-responsive {
//   font-size: 2vw; /* o puoi utilizzare 2vmin, o regola il valore in base alle tue esigenze */
// }
</style>