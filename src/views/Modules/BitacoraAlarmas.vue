<template>

  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center pb-4">Bitácora de Alarmas</h1>
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Tramo:
        <select class="flex-none filter-style color-black" name="select">
          <option value="100" selected>opcion1</option>
          <option value="200">opcion2</option>
          <option value="300">opcion3</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        Plaza:
        <select class="flex-none filter-style color-black" name="select">
          <option value="100" selected>opcion1</option>
          <option value="200">opcion2</option>
          <option value="300">opcion3</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        Inicio:
        <input type="date" />
      </div>
      <div class="flex-none filter-style">
        Fin:
        <input type="date" />
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <TablaAlarmas :dataAlarmas="alarmas"></TablaAlarmas>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaAlarmas from "../../components/Tabla-alarmas";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "BitacoraAlarmas",
  components: { TablaAlarmas, Navbar, Footer },
  data() {
    return {
      alarmas: [
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
        },
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
        },
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
        },
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
        },
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
        },
        {
          plaza: "La Venta",
          alarma: "Corte de energía",
          fecha: "2021/01/01 14:00:00",
          carril: "A01",
          estatus: "Resuelto",
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
  background-color: #0195b0;
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
  padding: 0px 5px;
  border-radius: 5px;
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
