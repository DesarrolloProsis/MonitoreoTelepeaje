<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center pb-4">Búsqueda de Cruces en Plaza</h1>
  <div>
    <div class="mt-2 mx-2 md:mx-0">
      <p>Filtros de Búsqueda:</p>
        <div class="flex flex-col md:flex-row border-gray-200 pb-0 mb-4">
           
            <div class="flex-1 flex flex-col md:flex-row md:space-x-2">
              <div class="w-full flex-2 ">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <input class="inp-icon p-1 px-2 appearance-none outline-none w-full text-gray-800 " placeholder="Buscar No. Tag" type="text" id="tag" />
                    </div>
                </div>
                <div class="w-full flex-2 ">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                     
                       <select
          class="p-1 px-2  outline-none w-full text-gray-800"
          name="select"
          id="selectorPlaza"
        >
          <option v-if="isLoading == true">Cargando Plazas...</option>
                                                                    
          <option v-else-if="plazas.length == 0 && isLoading == false"> No hay plazas</option>
          <option v-else value="0">Todas las Plazas</option>
          <option v-for="(plaza, key) in plazas" :value="key + 1" :key="key">
            {{ plaza.nombre }}
          </option>
        </select>
                    </div>
                        
                </div>
                <div class="w-full flex-2">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <input type="date" id="fecha"  class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "> 
                       
                      </div>
                </div>
                 
                 <div class="w-full flex-1">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search ">
                      
                        <button class="p-1 px-2 appearance-none outline-none w-full text-white " @click="buscar()">Buscar</button>
                    </div>
                </div>
                  <div class="w-full flex-2">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                      
                        <button class="p-1 px-2 appearance-none outline-none w-full text-gray-800 " @click="descargarArchivo('excel')">Exportar Excel</button>
                    </div>
                </div>
                  <div class="w-full flex-2">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                      
                        <button class="p-1 px-2 appearance-none outline-none w-full text-gray-800 " @click="descargarArchivo('csv')">Exportar CSV</button>
                    </div>
                </div>
                  <div class="w-full flex-2">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                      
                        <button class="p-1 px-2 appearance-none outline-none w-full text-gray-800 " @click="descargarArchivo('txt')">Exportar Txt</button>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    
</div>


    <TablaBusquedaCruces
      v-if="isLoading == false"
      :dataCruces="cruces"
    ></TablaBusquedaCruces>
    <div class="loading" v-else>Cargando Datos...</div>
    <button v-if="paginaActual > 1" class="button-pagination" @click="left()">
      Anterior
    </button>
    <button
      v-if="paginaActual < paginas"
      class="button-pagination"
      @click="right()"
    >
      Siguiente
    </button>
    <p v-if="isLoading == false" class="desc-paginacion">
      Página {{ paginaActual }} de {{ paginas }}
    </p>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaBusquedaCruces from "../../components/Tabla-busquedacruces.vue";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
//import * as download from "downloadjs";
import axios from "axios";
export default {
  name: "BusquedaCruces",
  components: {
    TablaBusquedaCruces,
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoading: true,
      cruces: [],
      paginas: 1,
      paginaActual: 1,
      token: "",
      plazas: [],
      data: {
        pagenumber: 1,
        rowsofpage: 7,
        tagfilter: null,
        carril: null,
        plaza: null,
        fechainicial: null,
        fechafinal: null,
        plazas: null,
      },
    };
  },
  mounted() {
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    if (getCookie("TipoUser") != "" && getCookie("Token")) {
      this.token = getCookie("Token");
      let config = {
        headers: {
          Authorization: "Bearer " + getCookie("Token"),
        },
      };

      axios
        .get("http://prosisdev.sytes.net:84/api/Plazas", config)
        .then((res) => {
          this.isLoading = false;
          this.plazas = res.data;
          this.data["plazas"] = res.data;
          console.log("Plazas:" + res.data)
          return axios
            .post(
              "http://prosisdev.sytes.net:84/api/Transacciones",
              this.data,
              config
            )
            .then((res) => {
              console.log(res.data);
              this.paginas = res.data.numberOfPages;
              res.data.transacciones.forEach((e) => {
                let obj = {
                  plaza: e.plaza,
                  num_tag: e.noTag,
                  fecha: e.fecha,
                  carril: e.carril,
                  tipo_vehiculo: e.tipoVehiculo,
                  tarifa: e.tarifa,
                };
                this.cruces.push(obj);
              });
            });
        });
    }
  },
  methods: {
    pedirDatos: function (pagina, tag, plazas, fecha) {
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      if (tag === "") {
        tag = null;
      }
      if (fecha === "") {
        fecha = null;
      }
      this.data["pagenumber"] = pagina;
      this.data["tagfilter"] = tag;
      this.data["plazas"] = plazas;
      this.data["fechainicial"] = fecha;

      axios
        .post(
          "http://prosisdev.sytes.net:84/api/Transacciones",
          this.data,
          config
        )
        .then((res) => {
          this.cruces = [];
          this.paginas = res.data.numberOfPages;
          this.paginas = res.data.numberOfPages;
          res.data.transacciones.forEach((e) => {
            let obj = {
              plaza: e.plaza,
              num_tag: e.noTag,
              fecha: e.fecha,
              carril: e.carril,
              tipo_vehiculo: e.tipoVehiculo,
              tarifa: e.tarifa,
            };
            this.cruces.push(obj);
          });
        });
    },
    left: function () {
      if (this.paginaActual <= this.paginas) {
        this.paginaActual = this.paginaActual - 1;
        this.pedirDatos(
          this.paginaActual,
          this.data.tagfilter,
          this.data.plazas,
          this.data.fechainicial
        );
      } else {
        console.log("No se puede regresar la pagina");
      }
    },
    right: function () {
      if (this.paginaActual < this.paginas) {
        this.paginaActual = this.paginaActual + 1;
        this.pedirDatos(
          this.paginaActual,
          this.data.tagfilter,
          this.data.plazas,
          this.data.fechainicial
        );
      } else {
        console.log("No se puede cambiar la pagina");
      }
    },
    buscar: function () {
      let plaza = document.getElementById("selectorPlaza").value;
      if (plaza == 0) {
        var plaza_select = this.plazas;
      } else {
        plaza_select = [this.plazas[plaza - 1]];
      }
      let fecha = document.getElementById("fecha").value;
      let tag = document.getElementById("tag").value;

      this.paginaActual = 1;
      this.pedirDatos(this.paginaActual, tag, plaza_select, fecha);
      document.getElementById("fecha").value = "";
      document.getElementById("tag").value = "";
    },
    downloadApi: function (tipo) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(this.data);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,

        body: raw,
        //redirect: "follow",
      };
      if (tipo == "csv") {
        fetch(
          "http://prosisdev.sytes.net:84/api/Transacciones/Download/Csv",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            let today = new Date().toISOString().slice(0, 10);
            const url = window.URL.createObjectURL(new Blob([result]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", today + ".csv");
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => console.log("error", error));
      } else if (tipo == "excel") {
        fetch(
          "http://prosisdev.sytes.net:84/api/Transacciones/Download/Excel/",
          requestOptions
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            let today = new Date().toISOString().slice(0, 10);
            link.href = url;
            link.setAttribute("download", `${today}.xls`);
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
          })

          .catch((error) => console.log("error", error));
      } else if (tipo == "txt") {
        fetch(
          "http://prosisdev.sytes.net:84/api/Transacciones/Download/Txt",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            let today = new Date().toISOString().slice(0, 10);
            const url = window.URL.createObjectURL(new Blob([result]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", today + ".txt");
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => console.log("error", error));
      }
    },
    descargarArchivo: function (tipo) {
      this.downloadApi(tipo);
    },
  },
};
</script>
<style global>
@keyframes example {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  font-size: 17px;
  font-weight: bold;
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.desc-paginacion {
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

.btn-search {
  background-color: #017296;
  color: white;
  
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
