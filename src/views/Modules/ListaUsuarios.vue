<template>
  <Navbar></Navbar>
  <h1 class="title">Lista de Usuarios Registrados</h1>
  <div class="container mx-auto px-0 pb-24 pt-4">
    <div class="flex flex-wrap bg-blue">
      <div class="flex-none filter-style">
        Nombre:
        <input type="text" />
      </div>
      <div class="flex-none filter-style">
        Estatus:
        <select class="flex-none filter-style color-black" name="select">
          <option value="100" selected>Inactivo</option>
          <option value="200">Activo</option>
        </select>
      </div>
      <div class="flex-none filter-style">
        <button class="btn-buscar">Buscar</button>
      </div>
      <div class="flex-1">
        <button class="btn-carriles ml-right">Descargar Excel</button>
      </div>
    </div>
    <TablaListaUsuarios :dataUsuarios="perfiles"></TablaListaUsuarios>
    <button class="button-pagination" v-if="paginaAct > 1" @click="anterior()">Anterior</button>
    <button class="button-pagination" v-if="paginaAct < maxPages" @click="siguiente()">Siguiente</button>
    <p  class="desc-paginacion">
      Página {{ paginaAct }} de {{ maxPages }}
    </p>
  </div>

  <Footer></Footer>
</template>
<script>
import TablaListaUsuarios from "../../components/Tabla-listausuarios";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  components: {
    TablaListaUsuarios,
    Navbar,
    Footer,
  },
  data() {
    return {
      perfiles: [],
      token: "",
      paginaAct: 1,
      maxPages: 1,
    };
  },
  beforeMount() {
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
    // Get token config
    if (getCookie("Token")) {
      let config = {
        headers: {
          Authorization: "Bearer " + getCookie("Token"),
        },
      };
      this.token = getCookie("Token");
      axios
        .get(
          `http://prosisdev.sytes.net:84/api/Usuario?Page=${this.paginaAct}&Rows=5`,
          config
        )
        .then((result) => {
          console.log(result.data);
          this.maxPages = result.data.totalPages;
          result.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    }
  },
  methods: {
    anterior: function () {
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.paginaAct = this.paginaAct - 1;
      axios
        .get(
          `http://prosisdev.sytes.net:84/api/Usuario?Page=${this.paginaAct}&Rows=5`,
          config
        )
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    },
    siguiente: function () {
      
      let config = {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.paginaAct = this.paginaAct + 1;
      axios
        .get(
          `http://prosisdev.sytes.net:84/api/Usuario?Page=${this.paginaAct}&Rows=5`,
          config
        )
        .then((res) => {
          this.perfiles = []
          this.maxPages = res.data.totalPages;
          res.data.page.forEach((e) => {
            let obj = {
              nombre: e.nombre,
              apellido: e.apellidoPaterno,
              rol: e.rol,
              estatus: e.estatus,
            };
            this.perfiles.push(obj);
          });
        });
    },
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.button-pagination {
  padding: 2px;
  border: 1px solid black;
  margin-right: 5px;
  font-size: 12px;
  margin-top: 20px;
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
.color-black {
  color: black !important;
}
.color-black:focus {
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
