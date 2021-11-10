<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center">Monitoreo de Carriles</h1>
    <TablaCarriles/>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import TablaCarriles from "../../components/Tabla-carriles.vue";
import Footer from "../../components/Footer-login";
export default {
  components: {
    Navbar,
    TablaCarriles,
    Footer,
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