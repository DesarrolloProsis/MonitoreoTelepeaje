<template>
<Navbar></Navbar>
<h1 class="title">Estatus Tags</h1>
<div class="flex justify-center pt-4 filter-style">
  <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :carrilesForm="true" :tipo="''"></FormTramoPlaza>
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
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaEstatusTag from "../../components/Tabla-estatustag";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue'
import axios from "axios";
export default {
  components: {
    TablaEstatusTag,
    Navbar,
    Footer,
    FormTramoPlaza
  },  
  data() {
    return {
      plazas: [],      
      token:"",      
      tags: [],
      isLoading: true,
      tramo: '',
      plaza: ''
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
      axios.get(`${API}/Plazas`, config)

      .then((res) =>{
        console.log("plazas cargadas...")
        this.plazas = res.data;
        this.isLoading = false;
      })
    }
  },
  methods: {
    buscarTag: function(){
      let config = { headers: { 'Authorization': 'Bearer ' + this.token } }
      var tag = document.getElementById("tag").value;         
      if(tag != ""){
        console.log("Buscando...")                
        //TODO: eliminar esta y sustituir por palza_select        
        let urlQuery = ''
        
        if(this.plaza != '' && this.plaza != undefined)          
           urlQuery = `Tags?PlazaId=${this.plaza}&Tag=${tag}`        
        else
            urlQuery = `Tags?Tag=${tag}`
        
        axios.get(`${API}/${urlQuery}`, config)      
          .then((res) =>{
            console.log(res)
            this.tags = []
            
              let obj = {
                tag: res.data.tag,
                plaza: res.data.plaza,
                estatus: res.data.estado,
                saldo: res.data.saldo,
                tipo_tag: res.data.tipoTag,
                ult_act: res.data.actualizacion,
              }
              this.tags.push(obj)
            
          })
      }
    },
    recibir_tramo_plaza(value){
      this.tramo = value.tramo
      this.plaza = value.plaza
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
