<template>
  <Navbar/>
  <div class="h-screen md:h-full md:mb-0 mb-9">
    <h1 class="title-center font-titulo font-bold pb-1">Antenas</h1>        
    <MenuAntenas></MenuAntenas>
  </div>
  <Footer/>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import MenuAntenas from "../../components/MenuDesplegable.vue";
import Footer from "../../components/Footer-login";


export default {
  components: {
    Navbar,
    MenuAntenas,
    Footer,
  },
  setup(){  
    return {  }    
  }
};
</script>
<style scoped>
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
</style>
