<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {};
  },
  props: {
    subtitle: String,
    title: String,
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <div class="carousel-conts my-5">
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://www.casacastelli.it/wp-content/uploads/2022/06/Case-di-Lusso-FB-835x467.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://media.gqitalia.it/photos/62bebc8053339891195f603b/16:9/w_2560%2Cc_limit/Tinos%2520Luxury%2520Estate.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://www.domemilano.com/wp-content/uploads/2019/12/interni_moderni_di_lusso_italian_luxury_interiors.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> -->
      <div class="my-5 txt">
        <h2 class="display-6 text-center" style="color: #ffffff">
          {{ subtitle }}
        </h2>
        <h1 class="display-3 text-center" style="color: #ff7977">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.txt {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  border-radius: 0.5rem;
  background-color: #22222288;
  box-shadow: 0px 0px 20px 1px #222222;
}
.carousel-conts {
  position: relative;
  overflow: hidden;
  height: 25rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>
