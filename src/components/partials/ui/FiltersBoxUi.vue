<script>
import axios from 'axios';
import {store} from '../../../data/store';

// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
        store,
        services: [],
        tempActiveServices:[],
        tempDistance:20,
        tempBeds:1,
        tempRooms:1,
      
    }
  },
  methods:{
/*     fetchApartments() {
      const activeServices = [];
      let distance = 20;
      let beds = 1;
      let rooms = 1;
      const distanceEl = document.getElementById("distance");
      const bedsEl = document.getElementById("beds");
      const roomsEl = document.getElementById("rooms");
      if (distanceEl.value) {
        distance = distanceEl.value;
        this.tempDistance = distanceEl.value;
    }
      if (bedsEl.value) {
          beds = bedsEl.value;
          this.tempBeds = bedsEl.value;
      }
      if (roomsEl.value) {
        rooms = roomsEl.value;
        this.tempRooms = roomsEl.value;
      }
      this.services.forEach((service) => {
        if (service.active) activeServices.push(service.id);
      });
      this.tempActiveServices = activeServices
      // console.log(activeServices,distance,beds,rooms);

      axios
        .post(
          store.apiUrl + "/apartments-by-filters",
          { activeServices, distance, beds, rooms },
          {
            headers: {
              "content-type": "multypart/form-data",
            },
          }
        )
        .then((response) => {
          this.apartments = response.data.data;
        });
    },
     */
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
    // * get all services
    toggleService(service){
        service.active = !service.active
        // this.fetchApartments()
        this.handleInputs()
    },
    // * handle inputs
    handleInputs(){

        const distanceEl = document.getElementById("distance");
        const bedsEl = document.getElementById("beds");
        const roomsEl = document.getElementById("rooms");

        if (distanceEl.value) {
            this.tempDistance = distanceEl.value;
    }
        if (bedsEl.value) {
            this.tempBeds = bedsEl.value;
        }
        if (roomsEl.value) {
            this.tempRooms = roomsEl.value;
        }
        // Pulisci l'array tempActiveServices
        this.tempActiveServices = [];
        this.services.forEach((service) => {
            if (service.active){
                this.tempActiveServices.push(service.id);
            } 
        });
        

    },
    // * get all apartment filtered
    getApartments(){
        // todo DEVI RECUPERARE ANCHE I SERVIZI DALL URL SENZA CHE SI SPACCHI TUTTO
        // if (this.$route.params.activeServices) console.log('esiste');
        
        //      if(this.$route.params.activeServices.includes('-')) console.log('si');
        //         const activeServices = this.$route.params.activeServices.split('-');
             
        // }else{
        //     const activeServices = this.$route.params.activeServices;
        // }
        const activeServices = this.$route.params.activeServices ? this.$route.params.activeServices.split('-') : []
        // const activeServices = this.tempActiveServices;
        console.log(activeServices, 'services');
        
        // let distance = this.$route.params.distance;
        
        let distance = parseInt(this.$route.params.distance);
        
        // let distance = this.tempDistance;
        console.log(distance, 'distance');
        
        // let distance = this.$route.params.beds;
        let beds = parseInt(this.$route.params.beds);

        // let beds = this.tempBeds;
        console.log(beds, 'beds');
        
        let rooms = parseInt(this.$route.params.rooms);

        // let rooms = this.tempRooms;
        console.log(rooms, 'rooms');

        axios
        .post(
          store.apiUrl + "/apartments-by-filters",
          { activeServices:activeServices, distance:distance, beds:beds, rooms:rooms },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then((response) => {
          store.filteredApartments = response.data.data;
          console.log(store.filteredApartments);
          
        });
    },
    fillFromSuggestion(event){
      let whereEl = document.getElementById('where')
      let list = document.getElementById('sg-list')
      whereEl.value = event.target.innerHTML
      list.classList.add('d-none')

    },
    handleQuery(){
      let list = document.getElementById('sg-list')
      list.classList.remove('d-none')

    }
  },

  // components: {
  //   MyComponent,
  // },
  created() {
    this.fetchServices();
    this.getApartments()
  }
};
</script>

<template>
  <div class="card" data-bs-theme="light">
    <div class="card-body">
        <div class="d-flex justify-content-center">


            <div class="d-flex flex-column suggestions-container align-items-center">
                <span>Where</span>
                <input @change="handleQuery()" type="text" class="input-styler big-input" id="where">
                <ul class="suggestions p-0 d-none" id="sg-list">
                  <li @click="fillFromSuggestion($event)">
                    test
                  </li>
                  <li @click="fillFromSuggestion($event)">
                    testds
                  </li>
                  <li @click="fillFromSuggestion($event)">
                    testdssdfsd
                  </li>
                  <li @click="fillFromSuggestion($event)">
                    diofa
                  </li>
                  <li @click="fillFromSuggestion($event)">
                    sanremo
                  </li>
                  <li @click="fillFromSuggestion($event)">
                    torino
                  </li>
                </ul>
            </div>
            <div class="d-flex flex-column align-items-center">
                <span>Rooms</span>
                <input @change="handleInputs()" type="number" id="rooms" class="small-input bg-light text-dark input-styler">
            </div>
            <div class="d-flex flex-column align-items-center">
                <span>Beds</span>
                <input @change="handleInputs()" type="number" id="beds" class="small-input bg-light text-dark input-styler">
            </div>
            <div class="d-flex flex-column align-items-center">
                <span>Distance</span>
                <input @change="handleInputs()" type="range"  id="distance"  class="range-styler mx-3" min="0" max="30">
            </div>
            <div class="d-flex flex-column align-items-center">
                <span>Services</span>
                <button class="btn-style" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                   +
               </button>
            </div>
            <router-link @click="getApartments()" :to="{ name: 'search', params: {  distance: tempDistance, beds: tempBeds, rooms: tempRooms, activeServices: tempActiveServices.join('-') } }" class="mx-3 p-3 btn-style text-decoration-none">
                Cerca!
            </router-link>
<!--             <router-link @click="getApartments()" v-else :to="{ name: 'search', params: { activeServices: tempActiveServices.join('-'), distance: tempDistance, beds: tempBeds, rooms: tempRooms } }" class="mx-3 p-3 btn-style text-decoration-none">
                Cerca!
            </router-link> -->
            
        </div>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
             <div class="d-flex justify-content-between">
 
                <span v-for="(service,index) in this.services" 
                :class="{disabled: !service.active}" 
                class="badge me-2 my-2 bg-gradient bg-dark fs-5"
                @click="toggleService(service)">

                <font-awesome-icon :icon="service.symbol" style="color:#ff7977;" />
                </span>
             </div>
            </div>
        </div>
    
    </div>
  </div>
</template>

<style lang="scss" scoped>

.suggestions-container{
  position: relative;
}
.suggestions{
  background-color: #ddd;
  z-index: 9;
  border: 1px solid #ff7977;
  border-radius: .5rem;
  box-shadow: 0px 5px 15px 3px #222222;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 5rem;
  overflow-y: auto;
  list-style: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar{
    display: none;
  }
  li{
    cursor: pointer;
  }
  li:hover{
    // border-bottom: 1px solid #ff7977;
    box-shadow: inset 0 -2px 2px 0px #ff7977;

    background-color: #fff;
    
  }
}
.disabled{
    filter: grayscale(1);
}

.small-input{
    max-width: 5rem;
}
.big-input{
    max-width: 20rem;
}
.input-styler{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ff7977;
    color: #ff7977;
    text-align: center;
}
.input-styler:focus {
  outline: none; /* Rimuovi il bordo quando l'input è selezionato */
}

.primary-col{
    color: #ff7977;
    border:1px solid #ff7977;
    border-radius: .5rem;
}
.range-styler{
    color: #ff7977;
    background-color: #ff7977;
    
}
/* Stili per il tipo "range" */
input[type="range"] {
  height: 10px; /* Altezza del cursore */
  appearance: none; /* Nasconde l'aspetto predefinito del cursore */
  background-color: #ddd; /* Colore di sfondo */
  outline: none; /* Rimuove il bordo di contorno */
  border-radius: 5px; /* Bordo arrotondato */
  margin: 10px 0; /* Margine superiore e inferiore */
  
}
/* Stili per il cursore del tipo "range" */
input[type="range"]::-webkit-slider-thumb {
  width: 20px; /* Larghezza del cursore */
  height: 20px; /* Altezza del cursore */
  background-color: #ff7977; /* Colore del cursore */
  border-radius: 50%; /* Bordo arrotondato */
  cursor: pointer; /* Cambia il cursore al passaggio sopra */
  -webkit-appearance: none; /* Nasconde l'aspetto predefinito del cursore in WebKit (Chrome, Safari, ecc.) */
  margin-top: 0px; /* Alcuni piccoli aggiustamenti di posizione */
  transition: 1s;

}
input[type="range"]::-webkit-slider-thumb:hover {
    transform: translate(2px, -2px);
    box-shadow: 0px 3px 10px 1px #222222;
    transition: .5s ease-in-out;
    
}
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.btn-style{
    background-color: transparent;
    border-radius: .5rem;
    border: 1px solid #ff7977;
    color: #ff7977;
    font-weight: 700;
    transition: 1s;
  }
  .btn-style:hover{
    
    background-color: #ff7977;
    color: #ffffff;
    transform: translate(2px, -2px);
    box-shadow: -3px 3px 10px 1px #222222;
    transition: .5s ease-in-out;
}


</style>