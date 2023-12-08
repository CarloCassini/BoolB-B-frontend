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
        tempDistance:this.$route.params.distance ? this.$route.params.distance :20,
        tempBeds: this.$route.params.beds ? this.$route.params.beds: 1,
        tempRooms:this.$route.params.rooms ? this.$route.params.rooms : 1,
        searchTerm: '',
        searchResults: [],
        addressLong:this.$route.params.long ? this.$route.params.long : 0,
        addressLat:this.$route.params.lat ? this.$route.params.lat : 0,
        pagination :{
        next: null,
        prev: null,
        links: null
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // !!!! DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
        // todo DECIDERE COME PASSARE PAGINATION DOVREI METTERE UN VALORE A STORE PERCHE QUESTO COMPONENTE NN HA IL TEMPLATE DELLA PAGINATION
      }
      }
    },
  computed: {
    isSearchRoute() {
      // Controlla se la parola "search" è presente nella rotta dell'URL
      return this.$route.fullPath.includes('search');
    }
  },
    // components: {
    //   MyComponent,
    // },
  methods:{
    // * get all services
    fetchServices(){
      // chiamata axios a tutti i servizi
        axios.get(store.apiUrl + '/services').then((response) =>{
            this.services = response.data.map((service) => {
                return{
                  ...service,
                    active: false,
                }
              })
            })
    },
    //*  toggle active services
    toggleService(service){
        // do la classe active all occorrenza e vice versa
        service.active = !service.active
        // eseguo la funzione handle inputs
        this.handleInputs()
    },
    //* handle inputs and search
    handleInputs(){
        // recupero dal dom gli elementi che userò
        const distanceEl = document.getElementById("distance");
        const bedsEl = document.getElementById("beds");
        const roomsEl = document.getElementById("rooms");
        // se l elemento a dom ha un valore, allora asegno il valore al corrispondente nel return
        console.log(distanceEl.value, 'distace el');
        
        if (distanceEl.value) {
          this.tempDistance = distanceEl.value;
          console.log(this.tempDistance, 'tempDistanceLog');
        }
        if (bedsEl.value) {
            this.tempBeds = bedsEl.value;
        }
        if (roomsEl.value) {
            this.tempRooms = roomsEl.value;
        }
        
        this.tempActiveServices = [];

        this.services.forEach((service) => {
            if (service.active){
                this.tempActiveServices.push(service.id);
            } 
        });

        this.updateRoute()

        this.getApartments()
        

    },
    // *refresh route values
    updateRoute() {
      console.log(this.tempDistance,'on update route distance');
      this.$router.push({
        name: 'search',
        params: {
          lat:this.addressLat,
          long:this.addressLong,
          rooms: this.tempRooms,
          beds: this.tempBeds,
          distance: this.tempDistance,
          activeServices: this.tempActiveServices.join('-'),
        },
      });
      console.log(this.$router,'router val');
      
    },
    // * get all apartment filtered 
    // TODO SOMETHING IS'NT RIGHT
    getApartments(){
      // TODO THIS DOES NOT WORK, YOU MUST RECHECK
/*       let rooms = parseInt(this.$route.params.rooms);
      console.log(rooms, 'rooms');
      let beds = parseInt(this.$route.params.beds);
      console.log(beds, 'beds');
      let distance = parseInt(this.$route.params.distance);
      console.log(distance, 'distance');
      const activeServices = this.$route.params.activeServices ? this.$route.params.activeServices.split('-') : []
      console.log(activeServices, 'services'); */
      // * THIS WORKS
      let query = this.searchTerm
      console.log(query,'search term');
      let lat = this.addressLat
      console.log(this.addressLat,'lat');
      let long = this.addressLong
      console.log(this.addressLong,'long');
      let rooms =this.tempRooms;
      console.log(rooms, 'rooms');
      let beds = this.tempBeds;
      console.log(beds, 'beds');
      let distance =this.tempDistance;
      console.log(distance, 'distance');
      const activeServices = this.$route.params.activeServices ? this.$route.params.activeServices.split('-') : this.tempActiveServices
      console.log(activeServices, 'services');

        axios
        .post(
          store.apiUrl + "/apartments-by-filters",

          {lat:lat, long:long, rooms:rooms, beds:beds, distance:distance,  activeServices:activeServices },
          {
            headers: {
              "content-type": "application/json",
              },
          }
        )
        .then((response) => {
          store.filteredApartments = response.data.data;
          console.log(store.filteredApartments);
          this.pagination.prev =response.data.prev_page_url;
          this.pagination.next =response.data.next_page_url;
          this.pagination.links =response.data.links;
        });
    },
        fillFromSuggestion(event) {
      let whereEl = document.getElementById('where');
      let list = document.getElementById('sg-list');
      let selectedResult = this.searchResults.find(result => result.address.freeformAddress === event.target.innerHTML);

      if (selectedResult) {
        // Visualizza l'indirizzo completo all'utente
        whereEl.value = selectedResult.address.freeformAddress;
        this.searchTerm = selectedResult.address.freeformAddress;

        // Valorizza long e lat nei dati con le coordinate corrispondenti
        this.addressLat = selectedResult.position.lat;
        this.addressLong = selectedResult.position.lon;

        list.classList.add('d-none');
      }
      this.updateRoute()
      this.getApartments();
    },
    handleQuery(){
      let list = document.getElementById('sg-list')
      let query = document.getElementById('where')
      this.searchTerm = query.value
      list.classList.remove('d-none')

      axios.get('https://api.tomtom.com/search/2/search/' + this.searchTerm + '.json', {
        params: {
          key: 't7a52T1QnfuvZp7X85QvVlLccZeC5a9P',
          language: 'it-IT', // Imposta la lingua desiderata
        },
      })
        .then(response => {
          // Gestisci la risposta e aggiorna i risultati di ricerca
          this.searchResults = response.data.results;
        })
        .catch(error => {
          console.error('Errore nella ricerca fuzzy:', error);
        });
        
        
    }
  },
  created() {
    this.fetchServices();
    this.getApartments()
  }
};
</script>

<template>
  <div class="card" data-bs-theme="light">
    <div class="card-body">
        <!--* inputs -->
        <div class="d-flex justify-content-center flex-wrap w-100">


            <div class="d-flex flex-column suggestions-container align-items-center w-50">
                <span>Where</span>
                <input @change="handleQuery()" type="text" class="input-styler big-input w-100 my-3" id="where">
                <ul class="suggestions p-0 d-none" id="sg-list">
                  <li v-for="(suggestion, index) in this.searchResults" :key="index" @click="fillFromSuggestion($event)">
                    {{suggestion.address.freeformAddress}}
                  </li>
                </ul>
            </div>
            <div class="d-flex flex-column align-items-center"  v-if="isSearchRoute">
                <span>Rooms</span>
                <input @change="handleInputs()" type="number" id="rooms" class="small-input text-dark  my-3 input-styler">
            </div>
            <div class="d-flex flex-column align-items-center"  v-if="isSearchRoute">
                <span>Beds</span>
                <input @change="handleInputs()" type="number" id="beds" class="small-input text-dark  my-3 input-styler">
            </div>
            <div class="d-flex flex-column align-items-center"  v-if="isSearchRoute">
                <span>Distance</span>
                <input @change="handleInputs()" type="range"  id="distance"  class="range-styler mx-3 my-3" min="0" max="300">
            </div>
            <div class="d-flex flex-column align-items-center"  v-if="isSearchRoute">
                <span>Services</span>
                <button class="btn-style my-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                   +
               </button>
            </div>
            <router-link @click="getApartments()" :to="{ name: 'search', params: { rooms: tempRooms,  beds: tempBeds, distance: tempDistance, activeServices: tempActiveServices.join('-') } }" class="mx-3 p-3 my-3 btn-style text-decoration-none">
                Cerca!
            </router-link>
            <!-- TODO OTHER VERSION, MAY CAUSE ERROS -->
<!--        <router-link @click="getApartments()" v-else :to="{ name: 'search', params: { activeServices: tempActiveServices.join('-'), distance: tempDistance, beds: tempBeds, rooms: tempRooms } }" class="mx-3 p-3 btn-style text-decoration-none">
                Cerca!
            </router-link> -->
            
        </div>
        <!--* services collapse hideout -->
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
             <div class="d-flex justify-content-between flex-wrap">
 
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
    // max-width: 20rem;
}
.input-styler{
    background-color: #fff;
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