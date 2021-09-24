<template>
<Navbar></Navbar>
<h1 class="title">Estatus Tags</h1>
<div class="flex justify-center pt-4 filter-style">
  Plaza:
  <select class="flex-none filter-style color-black" name="select" id="selectorPlaza">
    <option v-if="isLoading == true">Cargando...</option>
                                                              
    <option v-else-if="plazas.length == 0 && isLoading == false"> No hay plazas</option>
    <option v-else value="0" selected>Todas</option>
     
    <option v-for="(plaza, key) in plazas" :value="key + 1" :key="key">{{plaza.nombre}}</option>
  </select>
</div>
<div class="flex justify-center">
  <div class="flex-auto text-center pt-4">
    <input id="tag" class="input-tags" type="text" placeholder="IMDM0000" />
    <img class="img-search" src="~@/assets/search.png" @click="buscarTag()"/>
  </div>
</div>

<div class="container mx-auto px-0 md:px-60 pb-24 pt-4">
  <TablaEstatusTag :datatag="tags"></TablaEstatusTag>
</div>
<Footer></Footer>
</template>
<script>
import TablaEstatusTag from "../../components/Tabla-estatustag";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import axios from "axios";
export default {
  components: {
    TablaEstatusTag,
    Navbar,
    Footer,
  },
  data() {
    return {
      plazas: [],
      token:"",
      tags: [],
      isLoading: true
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
      axios.get("http://prosisdev.sytes.net:84/api/Plazas", config)

      .then((res) =>{
        console.log("plazas cargadas...")
        this.plazas = res.data;
        this.isLoading = false;
      })
    }
  },
  methods: {
    buscarTag: function(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }
      let tag = document.getElementById("tag").value;
      let plaza = document.getElementById("selectorPlaza").value;
      if (plaza == 0) {
        var plaza_select = this.plazas
      } else {
        plaza_select = [this.plazas[plaza - 1]]
      }
      if(tag != ""){
        console.log("Buscando...")
        console.log("Plaza select:" + plaza_select)
        console.log(this.plazas)

        //TODO: eliminar esta y sustituir por palza_select
        var plaza_prueba = [{"Nombre":"defaultConnection"}]
        axios.post(`http://prosisdev.sytes.net:84/api/Tags/?tag=${tag}`, plaza_prueba, config)      
          .then((res) =>{
            this.tags = []
            res.data.forEach(e =>{
              let obj = {
                tag: e.tag,
                plaza:e.plaza,
                estatus: e.estado,
                saldo: e.saldo,
                tipo_tag: e.tipoTag,
                ult_act: e.actualizacion,
              }
              this.tags.push(obj)
            })
          })
      }

    }
  }
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}

.img-search {
  display: inline;
  width: 40px;
  cursor: pointer;
}

.input-tags {
  display: inline;
  border-bottom: 1px solid black;
  width: 200px;
  margin: 5px;
  text-align: center;
  font-size: 28px;
}

@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
