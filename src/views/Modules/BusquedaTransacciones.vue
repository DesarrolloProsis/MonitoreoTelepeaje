<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 pb-100">
    <h1 class="title-center font-titulo font-bold pb-4">Búsqueda de Transacciones en Plaza</h1>
  <div>
    <div class="mt-2 mx-2 md:mx-0">
      <p>Filtros de Búsqueda:</p>
        <div class="flex flex-col md:flex-row border-gray-200 pb-0 mb-4">          
            <div class="flex-1 flex flex-col md:flex-row md:space-x-2">
              <div class="w-full flex-2">
                  <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Transacciones'"></FormTramoPlaza>
                </div>
              <div class="w-full flex-2 ">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <input class="inp-icon p-1 px-2 appearance-none outline-none w-full text-gray-800 " placeholder="Buscar No. Tag" type="text" id="tag" />
                    </div>
                </div>
                <div class="w-full flex-2">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
                        <input type="date" id="fecha"  class="p-1 px-2 appearance-none outline-none w-full text-gray-800 "> 
                      </div>
                </div>
                <div class="w-full flex-1">
                    <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search ">                      
                        <button class="p-1 px-2 appearance-none outline-none w-full text-white " :disabled="isLoading" :class="{'cursor-not-allowed': isLoading}" @click="buscar()">Buscar</button>
                    </div>
                </div>
                <FilesDownload @download-api="downloadApi"></FilesDownload>
            </div>
        </div>
        <hr>
    </div>
  </div>
    <TablaBusquedaTransacciones
      v-if="isLoading == false"
      :dataCruces="cruces"
    ></TablaBusquedaTransacciones>
    <div class="loading" v-else>Cargando Datos...</div>
    <button v-if="paginaActual > 1" class="button-pagination" @click="left()">Anterior</button>
    <button v-if="paginaActual < paginas" class="button-pagination" @click="right()">Siguiente</button>
    <p v-if="isLoading == false" class="desc-paginacion">
      Página {{ paginaActual }} de {{ paginas }}
    </p>
  </div>
  <Footer></Footer>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaBusquedaTransacciones from "../../components/Tabla-busquedatransacciones.vue";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue'
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
import FilesDownload from '../../components/Files-descargar.vue'
import ServiceFiles from '../../Servicios/Files-Service'
export default {
  name: "BusquedaCruces",
  components: {
    TablaBusquedaTransacciones,
    Navbar,
    Footer,
    FormTramoPlaza,    
    FilesDownload
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
        rowsofpage: 5,
        tagfilter: null,
        plaza: null,
        fechainicial: null,
      },
      value: '',
      formato:'',
      tramo:'',
      plaza:''
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
      axios.get(`${API}/Plazas`, config)
        .then((res) => {
          this.isLoading = false;
          this.plazas = res.data;

          return axios.post(`${API}/Transacciones`,this.data,config)
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
                  clase: e.descripcion,
                  pago: e.nombrePago
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
      this.data["idplaza"] = plazas;
      this.data["fechainicial"] = fecha;
      axios.post(`${API}/Transacciones`,this.data,config)
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
                  clase: e.descripcion,
                  pago: e.nombrePago
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
        let fecha = document.getElementById("fecha").value;
        let tag = document.getElementById("tag").value;
        this.paginaActual = 1;
        let plaza = this.plaza
        this.pedirDatos(this.paginaActual, tag, plaza , fecha);
        document.getElementById("fecha").value = "";
        document.getElementById("tag").value = ""; 
    },
    downloadApi: function (tipo) {
      console.log(tipo)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + this.token);
      myHeaders.append("Content-Type", "application/json");
      let fecha = document.getElementById("fecha").value;
      let tag = document.getElementById("tag").value;
      let plaza = this.plaza
      let carril = ''
      let fechaInicial = fecha
      let fechaFinal = ''
      if (tipo == "csv") {
        ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Csv?tag=${tag}&carril=${carril}&plaza=${plaza}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`, 'transacciones.csv')
      } 
      else if (tipo == "excel") {        
        ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/Excel?tag=${tag}&carril=${carril}&plaza=${plaza}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`, 'transacciones.xlsx')            
      } 
      else if (tipo == "txt") {
        ServiceFiles.xml_hhtp_request(`${API}/Transacciones/Download/txt?tag=${tag}&carril=${carril}&plaza=${plaza}&fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`, 'transacciones.txt')
      }
    },
    recibir_tramo_plaza(value){
      this.plaza = value.plaza == undefined ? 0 : value.plaza
      console.log(value);
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