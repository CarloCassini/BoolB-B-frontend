<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Hello world"
    }
  }

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
    
 <nav class="navbar navbar-expand-lg bg-body-tertiary">

  <div class="container-fluid">
    <!-- todo router link -->
    <a class="navbar-brand" href="#">Bool B&B</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">

      <ul class="navbar-nav">

        <li v-for="(item, index) in munuItems" key="index" class="nav-item">
          
          <router-link :to="{ name: item.routeName }"  class="nav-link">

          </router-link>
          
        </li>

      </ul>
    </div>
  </div>
</nav>
</template>

<style lang="scss" scoped>

</style>
