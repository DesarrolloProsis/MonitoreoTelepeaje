<template>
  <Navbar></Navbar>
  <div class="container mx-auto mh-full">
    <div class="flex flex-wrap justify-center content-center h-full">
      <div class="flex-none">
         <h1 class="title">Creación de nuevo Perfil de Usuario</h1>
        <form class="bg-form p-5 mb-8 md:p-14">
          <p><label>Perfil</label></p>
          <input class="input-w-100" type="text" />
          <p><label>Modulo</label></p>
          <input class="input-w-100"  type="text" />
          <p><label>Plaza</label></p>
          <input class="input-w-100"  type="text" />
          <button class="btn-crear">Crear</button>
        </form>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "PerfilUsuario",
  components: { Navbar, Footer },
};
</script>
<style scoped>
.btn-crear{
    background-color: #017296;
    padding: 5px 15px;
    color: white;
    width: 100%;
    margin-top: 10px;
     border-radius: 10px;
}
.input-w-100{
    width: 100%;
    font-size: 18px;
    border-radius: 10px;
    padding-left: 5px;
    padding-right: 5px;
}
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.mh-full {
  height: calc(100vh - 85px);
  min-height: 400px;
}
.bg-form {
  background-color: #bcf5ff;
  border-radius: 20px;
}
@media (max-width: 750px) {
  .title {
    font-size: 18px;
    padding-bottom: 20px;
  }
}
</style>