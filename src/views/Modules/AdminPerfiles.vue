<template>
  <Navbar></Navbar>
  <h1 class="title">Administración de Perfiles</h1>
  <div class="container mx-auto px-0 pb-24 pt-4">
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Nombre:
        <input type="text" />
      </div>
      <div class="flex-none filter-style">
        Estatus:
        <input type="text" />
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <TablaListaPerfiles :dataPerfiles="perfiles"></TablaListaPerfiles>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaListaPerfiles from "../../components/Tabla-listaperfiles";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  components: {
    TablaListaPerfiles,
    Navbar,
    Footer,
  },
  data() {
    return {
      perfiles: [
        {
          perfil: "Administrador",
          estatus: "Activo",
          modulos: [
            {
              nombre: "Bitacora Alarmas",
              seleccionado: true
            },
            {
              nombre: "Busqueda de Cruces",
              seleccionado: false
            },
            
          ],
        },
        {
          perfil: "Sistemas",
          estatus: "Inactivo",
           modulos: [
            {
              nombre: "Bitacora Alarmas",
              seleccionado: true
            },
            {
              nombre: "Busqueda de Cruces",
              seleccionado: true
            },
            
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.bg-blue {
  background-color: #0195b0;
  padding: 10px 5px;
}
.filter-style {
  color: white;
  font-size: 16px;
  margin-left: 10px;
}
.filter-style input {
  margin-left: 20px;
  color: black;
  border: 1px solid black;
  padding: 0px 5px;
}
.ml-right {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}
.btn-carriles {
  background-color: #017296;
  color: white;
  font-size: 15px;
  height: 100%;
  padding: 0px 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.btn-carriles:focus {
  outline: 0;
}
.btn-buscar {
  background-color: #017296;
  color: white;
  height: 100%;
  padding: 0px 5px;
  border-radius: 5px;
}
.btn-buscar:focus {
  outline: 0;
}
@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
  .filter-style {
    padding-top: 5px;
    padding-bottom: 15px;
  }
  .btn-carriles {
    background-color: #017296;
    color: white;
    font-size: 15px;
    padding: 10px 5px;
    border: 1px solid black;
    border-radius: 5px;
  }
}
</style>

