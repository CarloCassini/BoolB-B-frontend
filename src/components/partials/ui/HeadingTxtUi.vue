<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
    }
  },
  props:{
    subtitle:String,
    title:String
  }

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
    <div class="my-5"> 
        <h2 class="display-6 text-center" style="color: #ffffff">{{ subtitle }}</h2>
        <h1 class="display-3 text-center" style="color: #ff7977">{{ title }}</h1>
    </div>
</template>

<style lang="scss" scoped></style>