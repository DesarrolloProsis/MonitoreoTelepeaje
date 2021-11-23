<template>
<Navbar/>
<h1 class="title">Estatus Tags</h1>
<div class="flex justify-center pt-4 filter-style">
  <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="''"/>
</div>
<div class="flex justify-center">
  <div class="flex-auto text-center pt-4">
    <input id="tag" v-model="tag" class="input-tags" type="text" placeholder="IMDM0000" />
    <img class="img-search" src="~@/assets/search.png" @click="buscar(plaza,tag)"/>
  </div>
</div>

<div class="container mx-auto px-0 md:px-60 pb-24 pt-4">
  <TablaEstatusTag :datatag="tags"/>
</div>
  <!-- MODAL CARGANDO -->
<Spinner :modalLoading="modalLoading"/>
<Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import TablaEstatusTag from "../../components/Tabla-estatustag";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import FormTramoPlaza from '../../components/Form-tramoplaza.vue'
import Spinner from '../../components/Spn.vue'
import { notify } from "@kyvg/vue3-notification";
import { ref } from 'vue'
import axios from "axios";
export default {
  components: {
    TablaEstatusTag,
    Navbar,
    Footer,
    FormTramoPlaza,
    Spinner
  },
  setup() {
    const plazas = ref([])
    const token = ref('')     
    const tags = ref([])
    const isLoading = ref(true)
    const tramo = ref('')
    const plaza = ref('')
    const tag = ref(null)
    const modalLoading = ref(false)
    
    function buscar(plaza,tag){
      modalLoading.value = true
      if(plaza != null && tag != null){
        axios.get(`${API}/Tags/BusquedaTag/${plaza}/${tag}`)
        .then((result)=>{
          modalLoading.value = false
          if(result.statusText == 'OK'){
            tags.value = []
            let obj = {
              tag: result.data.tag,
              estatus: result.data.estado,
              saldo: result.data.saldo,
              tipo_tag: result.data.tipoTag,
              ult_act: result.data.actualizacion,
            }
            tags.value.push(obj)
          }else{
            notify({
              title:'Sin Información',
              text:'No se encontró el tag ingresado',
              type: 'warn'
            });    
          }
        })
        .catch(()=>{
          modalLoading.value = false
          notify({
              title:'Sin Información',
              text:'No se tiene conexión a la plaza seleccionada',
              type: 'warn'
            });
        })
      }else{
        modalLoading.value = false
        notify({
          title:'Sin Información',
          text:'Se debe de seleccionar la plaza e ingresar el tag para realizar una busqueda',
          type: 'warn'
        });
      }
    }
    function recibir_tramo_plaza(value){
      tramo.value = value.tramo
      plaza.value = value.plaza
    }

    return { buscar, recibir_tramo_plaza, plazas, token, tags, isLoading, tramo, plaza, tag, modalLoading }
  }
}
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
