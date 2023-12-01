<script>
import axios from 'axios';
import {store} from '../../../data/store';

// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      services: []
      
    }
  },
  methods:{
    fetchApartments(){
        const activeServices=[]
        let distance = 20
        let beds = 1
        let rooms = 1
        const distanceEl = document.getElementById('distance')
        const bedsEl = document.getElementById('beds')
        const roomsEl = document.getElementById('rooms')
        if (distanceEl.value) {
            distance = distanceEl.value
        }
        if (bedsEl.value) {
            beds = bedsEl.value
        }
        if (roomsEl.value) {
            rooms = roomsEl.value
        }
        this.services.forEach((service) => {
            if(service.active) activeServices.push(service.id)
            
        })
    // console.log(activeServices,distance,beds,rooms);
    
    axios.post(store.apiUrl + '/apartments-by-filters',{activeServices,distance,beds,rooms},{
        headers:{
            'contet-type' : 'multypart/form-data'
        }
    }).then(

    )
    
    },
    fetchServices(){
        axios.get(store.apiUrl + '/services').then((response) =>{
            this.services = response.data.map((service) => {
                return{
                    ...service,
                    active: false,
                }
            })
        })
    },
    toggleService(service){
        service.active = !service.active
        this.fetchApartments()
    }
  },

  // components: {
  //   MyComponent,
  // },
  created() {
    this.fetchServices();
  }
};
</script>

<template>
  <div class="card" data-bs-theme="light">
    <div class="card-header text-center">
        <h5>Filters</h5>
    </div>
    <div class="card-body">
    <span>
        services
    </span>
    <span v-for="(service,index) in this.services" 
    :class="{disabled: !service.active}" 
    class="badge me-2 my-2 bg-gradient bg-dark fs-5"
    @click="toggleService(service)">

    <font-awesome-icon :icon="service.symbol" style="color:#ff7977;" />
    </span>
    <hr>
    <span>
        distance
    </span>
    <input @change="fetchApartments()" type="number" id="distance" class="bg-light text-dark border">
    <hr>
    <span>
        beds
    </span>
    <input @change="fetchApartments()" type="number" id="beds" class="bg-light text-dark border">
    <hr>
    <span>
        rooms
    </span>
    <input @change="fetchApartments()" type="number" id="rooms" class="bg-light text-dark border">
    </div>
    <div class="card-footer">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled{
    filter: grayscale(1);
}
</style>