<template>
<Navbar></Navbar>
<div class="container mx-auto px-0 pb-100">
  <h1 class="title-center pb-4">Búsqueda de Cruces en Plaza</h1>
  <div class="flex flex-wrap bg-blue">
    <div class="flex-none filter-style-2">
      <input class="inp-icon" type="text" />
    </div>
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
      Fecha:
      <input type="date" />
    </div>

    <div class="flex-none filter-style">
      <button class="btn-buscar">Buscar</button>
    </div>
    <div class="flex-1">
      <button class="btn-carriles ml-right">Descargar Excel</button>
    </div>
  </div>

  <TablaBusquedaCruces :dataCruces="cruces"></TablaBusquedaCruces>

  <button v-if="paginaActual > 1" class="button-pagination" @click="left()">Anterior</button>
  <button v-if="paginaActual < paginas" class="button-pagination" @click="right()">Siguiente</button>
  <p class="desc-paginacion">Página {{paginaActual}} de {{paginas}}</p>
</div>
<Footer></Footer>
</template>
<script>
import TablaBusquedaCruces from "../../components/Tabla-busquedacruces.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  name: "BusquedaCruces",
  components: {
    TablaBusquedaCruces,
    Navbar,
    Footer
  },
  data() {
    return {
      cruces: [],
      paginas: 1,
      paginaActual: 1,
      token: ""
    };
  },
  mounted() {
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    if (getCookie("TipoUser") != "" && getCookie("Token")) {
      this.token = getCookie("Token")
      let config = {
        headers: {
          'Authorization': 'Bearer ' + getCookie("Token")
        }
      }
      let data = {
        "pagenumber": 1,
        "rowsofpage": 5,
        "tagfilter": null,
        "carril": null,
        "plaza": null,
        "fechainicial": null,
        "fechafinal": null
      }
      axios.post("http://prosisdev.sytes.net:84/api/Transacciones", data, config)
        .then((res) => {
          res.data.forEach(e => {
            let obj = {
              plaza: e.plaza,
              num_tag: e.noTag,
              fecha: e.fecha,
              carril: e.carril,
              tipo_vehiculo: e.tipoVehiculo,
              tarifa: e.tarifa,
            }
            this.cruces.push(obj)
          })
        })
      // Obtener num de paginas
      axios.get("http://prosisdev.sytes.net:84/api/Transacciones/5", config)
        .then((res) => {
          //console.log(res.data)
          this.paginas = res.data
        })
    }
  },
  methods: {
    pedirDatos: function(pagina) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }
      let data = {
        "pagenumber": pagina,
        "rowsofpage": 5,
        "tagfilter": null,
        "carril": null,
        "plaza": null,
        "fechainicial": null,
        "fechafinal": null
      }
      axios.post("http://prosisdev.sytes.net:84/api/Transacciones", data, config)
        .then(res => {
          this.cruces = []
          res.data.forEach(e => {
            let obj = {
              plaza: e.plaza,
              num_tag: e.noTag,
              fecha: e.fecha,
              carril: e.carril,
              tipo_vehiculo: e.tipoVehiculo,
              tarifa: e.tarifa,
            }
            this.cruces.push(obj)
          })
        })

    },
    left: function() {
      if (this.paginaActual <= this.paginas) {
        this.paginaActual = this.paginaActual - 1;
        this.pedirDatos(this.paginaActual)
      } else {
        console.log("No se puede regresar la pagina")
      }

    },
    right: function() {
      if (this.paginaActual < this.paginas) {
        this.paginaActual = this.paginaActual + 1;
        this.pedirDatos(this.paginaActual)
      } else {
        console.log("No se puede cambiar la pagina")
      }
    
    }
  }
};
</script>
<style scoped>
.desc-paginacion{
  padding-top: 5px;
  font-size: 12px;
}
.button-pagination {
  padding: 2px;
  border: 1px solid black;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 20px;

}

.filter-style-2 {
  color: white;
  font-size: 16px;
  margin-left: 10px;
}

.filter-style-2 input {
  margin-left: 20px;
  color: black;
  border-bottom: 1px solid black;
  padding: 0px 5px;
  color: white;
}

.inp-icon {
  background: url("~@/assets/search.png") no-repeat 100%;

  background-size: 16px;
}

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
