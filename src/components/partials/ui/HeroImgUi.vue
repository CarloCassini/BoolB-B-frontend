<script>
import FiltersBoxUi from "./FiltersBoxUi.vue";
import SearchBarUi from "./SearchBarUi.vue";

export default {
  data() {
    return {
      title: "Boolbnb"
    }
  },

  components: {
    SearchBarUi,
    FiltersBoxUi
},
};
</script>

<template>
  <div class="hero-image">
  <div class="hero-text">

    <h2 class="display-6" style="color: #ffffff">Welcome to</h2>
    <h1 class="display-3" style="color: #ff7977">{{ title }}</h1>
    
    <FiltersBoxUi />
    <!-- <SearchBarUi /> -->
  </div>
</div>
</template>

<style lang="scss" scoped>



.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg");

  /* Set a specific height */
  height: 50vh;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

/* Place text in the middle of the image */
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
</style>