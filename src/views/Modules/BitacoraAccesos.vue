<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Accesos</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Usuario:
        <input v-model="nombre" type="text" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        Fecha:
        <input type="date" class="rounded"/>
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <div class="container mx-auto px-0 md:px-60">
      <TablaAccesos :dataAccesos="accesos"></TablaAccesos>
    </div>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaAccesos from "../../components/Tabla-accesos.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "BitacoraAccesos",
  components: { TablaAccesos, Navbar, Footer },
  data() {
    return {
      accesos: [
        {
          usuario: "RMendoza",
          nombre: "Rodrigo Mendoza",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
        {
          usuario: "AMitra",
          nombre: "Alejandro Mitra",
          rol: "Admin",
          fecha_inicio: "2021/01/01 14:00:00",
          fecha_fin: "2020/01/01 15:00:30",
        },
      ],
    };
  },
};
</script>
<style scoped>
.pb-100 {
  padding-bottom: 100px;
}
.title-center {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.bg-blue {
  background-color: #2c5282;
  padding: 10px 5px;
}
.ml-right {
  display: block;
  margin-left: auto;
  margin-right: 10px;
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

.btn-carriles {
  background-color: #017296;
  color: white;
  font-size: 15px;
  height: 100%;
  padding: 0px 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.btn-buscar {
  background-color: #017296;
  color: white;
  height: 100%;
  padding: 0px 10px;
  border-radius: 5px;
  border: 1px solid black;
}
.btn-buscar:focus {
  outline: 0;
}
.btn-carriles:focus {
  outline: 0;
}
.color-black {
  color: black !important;
}
.color-black:focus {
  outline: 0;
}
@media (max-width: 769px) {
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
