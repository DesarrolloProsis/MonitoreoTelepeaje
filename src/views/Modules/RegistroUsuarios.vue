<template>
  <Navbar></Navbar>
  <div class="container mx-auto mh-full">
    <div class="flex flex-wrap justify-center content-center h-full">
      <div class="flex-none">
        <h1 class="title">Registro de Usuarios</h1>
        <form class="bg-form p-5 mb-8 md:p-14" action="">
          <div class="flex flex-wrap pt-2">
            <div class="flex-1">Nombre</div>
            <div class="flex-1">
              <input class="input-w-100" type="text" />
            </div>
          </div>
          <div class="flex flex-wrap pt-2">
            <div class="flex-1">Apellido</div>
            <div class="flex-1"><input class="input-w-100" type="text" /></div>
          </div>
          <div class="flex flex-wrap pt-2">
            <div class="flex-1">Contraseña</div>
            <div class="flex-1">
              <input class="input-w-100" type="password" />
            </div>
          </div>
          <div class="flex flex-wrap pt-2">
            <div class="flex-1">Rol</div>
            <div class="flex-1">
              <select class="input-w-100" name="rol">
                <option value="value1">Administrador</option>
                <option value="value2" selected>Sistemas</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap pt-4">
            <div class="flex-1">
              <button class="button btn-aceptar">Aceptar</button>
            </div>
            <div class="flex-1">
              <button class="button btn-cancelar">Cancelar</button>
            </div>
          </div>
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
.button {
  text-align: center;
  width: 100%;

  padding: 5px;
  border-radius: 15px;
}
.btn-aceptar {
  border-right: 4px solid #c7c7c7;
  background-color: #73ff6e;
  color: #0f640c;
}
.btn-cancelar {
  border-left: 4px solid #c7c7c7;
  background-color: #ff4545;
  color: #9b0000;
}
.input-w-100 {
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
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
  background-color: #c7c7c7;
  border-radius: 20px;
}
@media (max-width: 750px) {
  .title {
    font-size: 18px;
    padding-bottom: 20px;
  }
}
</style>
