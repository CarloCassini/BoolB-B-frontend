<script>
// import MyComponent from "./components/MyComponent.vue";
import SearchBarUi from "./SearchBarUi.vue";
import { store } from "../../../data/store.js";

export default {
  data() {
    return {
      store
    }

  },

  components: {
    SearchBarUi,
  },

};
</script>

<template>
    
 <nav class="navbar navbar-expand-lg bg-gradient bg-light sticky-top" data-bs-theme="light">

  <div class="container-fluid">
    
    <router-link :to="{ name: 'homepage' }" aria-current="page" class="navbar-brand">
      
      <img src="../../../img/airbnb-logo-small-center.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top logo-img">
        <span class="logo-txt ms-1">Boolbnb</span>
    </router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">

      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">

        <li class="nav-item">
          
          <router-link :to="{ name: 'homepage' }" aria-current="page" class="nav-link">
            Home
          </router-link>
          
        </li>
        
        <li class="nav-item">
          
          <router-link :to="{ name: 'search' }"  class="nav-link">
            Search
          </router-link>
          
        </li>

      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <div class="dropdown">
          <button class="btn btn-outline dropdown-toggle mx-2" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            Filters
          </button>
          <ul class="dropdown-menu">
            <!--* serrvices list -->
            <li class="w-100">
              <span>Select Filters</span>
              <div class="d-flex justify-content-evenly">
                <li v-for="service in store.services" >
                  <label :for="service.label">
                    <span class="badge me-2 my-2 bg-gradient bg-dark fs-5"><font-awesome-icon :icon="service.symbol" style="color: #ff7977;" /></span>
                  </label>
                  <input type="checkbox" :name="service.label" :id="service.label" class="d-none">
  
                </li>
              </div>
            </li>
            <!-- other filters -->
            <li class="w-100">

              <div class="d-flex justify-content-evenly">
                <!--* Rooms -->
                <div class="filter-container d-flex">
                  <strong class="me-3">Rooms:</strong>
                  <input class="bg-light border" type="number">
                </div>
                <!--* Beds -->
                <div class="filter-container d-flex">
                  <strong class="me-3">Beds:</strong>
                  <input class="bg-light border" type="number">
                </div>
                <!--* Range -->
                <div class="filter- d-flex">
                  <strong class="me-3">Range:</strong>
                  <input class="bg-light border" type="range">
                </div>
      
              </div>
            </li>
    
          </ul>
          <!-- <ul class="dropdown-menu">
            <li>
              <span>
                Select services
              </span>
              <ul>
                <li v-for="service in store.services" >
                
                <span class="badge me-2 my-2 bg-gradient bg-dark fs-5"><font-awesome-icon :icon="service.symbol" style="color: #ff7977;" /></span>

                </li>
              </ul>
              <span>
                select rooms
              </span>
              <ul>

              </ul>
            </li>
          </ul> -->
        </div>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div>
 
</div>


</template>

<style lang="scss" scoped>
  .logo-txt{
    color: #ff7977;
    font-weight: 600;
  }
  .nav { margin-bottom: 0; }
  .dropdown { position: static; }
  .dropdown-menu { width: 100%; text-align: center; }
  .dropdown-menu>li { display: inline-block; }
  .filter-container{
    
  }
</style>
