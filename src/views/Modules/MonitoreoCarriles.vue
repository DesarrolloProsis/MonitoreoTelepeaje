<template>
  <Navbar></Navbar>
  <h1 class="title-center">Monitoreo de Carriles</h1>
  <TablaCarriles></TablaCarriles>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import TablaCarriles from "../../components/Tabla-carriles.vue";
export default {
  components: {
    Navbar,
    TablaCarriles
  },
};
</script>
<style scoped>
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
</style>