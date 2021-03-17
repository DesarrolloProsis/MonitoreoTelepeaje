<template>
  <div class="w-full p-5 md:w-1/2">
    <router-link :to="ruta" tag="div">
      <div class="border p-8">
        <img class="img" :src="require('@/assets/' + img_src)" />
        <h1>{{ nombre }}</h1>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "ModuloConfiguracion",
  props: ["nombre", "img_src", "ruta"],
};
</script>
<style scoped>
.border {
  border: 1px solid #707070;
  border-radius: 15px;
  -webkit-box-shadow: 5px 5px 14px -5px rgba(0, 0, 0, 0.44);
  box-shadow: 5px 5px 14px -5px rgba(0, 0, 0, 0.44);
}
.img {
  display: block;
  margin: auto;
}
.border h1 {
  text-align: center;
  padding-top: 15px;
}
</style>