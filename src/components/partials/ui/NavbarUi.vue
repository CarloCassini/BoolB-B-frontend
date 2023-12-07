<script>
// import MyComponent from "./components/MyComponent.vue";

import { store } from "../../../data/store.js";

export default {
  data() {
    return {
      store,
    };
  },

  components: {},
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-gradient bg-light sticky-top"
    data-bs-theme="light"
  >
    <div class="container-fluid">
      <router-link
        :to="{ name: 'homepage' }"
        aria-current="page"
        class="navbar-brand"
      >
        <img
          src="../../../img/airbnb-logo-small-center.png"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top logo-img"
        />
        <span class="logo-txt ms-1">Boolbnb</span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <router-link
              :to="{ name: 'homepage' }"
              aria-current="page"
              class="nav-link"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'search' }" class="nav-link">
              Search
            </router-link>
          </li>

          <li>
            <a href="http://localhost:8000/" class="nav-link">
              Private section
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div></div>
</template>

<style lang="scss" scoped>
.logo-txt {
  color: #ff7977;
  font-weight: 600;
}
</style>
