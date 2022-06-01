<template>
  <div v-for="(carril, index) in carriles" :key="index" class="flex flex-col flex-wrap flex-none mr-2">
    <div class="flex-1 bg-carriles-cian mh-cuerpo">
      {{ carril.carril }}
      <div v-if="carril.estado == 'NA' || carril.estado == 'NB'">
        <span class="circulo-green"></span>
      </div>
      <div v-else>
        <span class="circulo-red"></span>        
      </div>
      <!-- <div v-else>
        <span class="circulo-none"></span>
      </div> -->
    </div>
    <!-- <div class="flex-1 bg-carriles-green mh-other">
      {{ carril.lectura_valida }}
    </div> --->
    <!-- <div class="flex-1 bg-carriles-red mh-other">
      {{ carril.lectura_invalida }}
    </div> -->
    <div class="flex-1 bg-carriles-blue mh-other">
      <span v-if="carril.ultimoCruce == null || carril.ultimoCruce == '' ">Sin Fecha de Cruce</span>
      <span v-else>{{ carril.ultimoCruce }}</span>
    </div>
  </div>  
</template>
<script>
import { reactive} from 'vue';

//import ModalCarriles from "../components/Modal-carriles";
export default {
  name: "Carril",
  components:{
      //ModalCarriles
  },
  props: ["carrilesdata"],
  setup(props){

    let carriles = reactive(props.carrilesdata)
    //let newEventAntena = reactive({})        
    // function change_color(index){     
    //   if(carriles[index].estado != 'NA')
    //     carriles[index].estado = 'NA'
    //   else
    //     carriles[index].estado = ''
    // }
    return { carriles }
  }
  
  
};
</script>
<style scoped>
.mh-cuerpo {
  min-height: 80px;
  padding: 10px;
}
.mh-other {
  min-height: 20px;
  line-height: 20px;
  padding: 10px;
}
.bg-carriles-blue {
  background-color: #6aeaff;
  border: 1px solid black;
}
.bg-carriles-red {
  background-color: #ffddde;
  border: 1px solid black;
}
.bg-carriles-green {
  background-color: #dbffdf;
  border: 1px solid black;
}

.bg-carriles-cian {
  background-color: #dbf9ff;
  border: 1px solid black;
}
.circulo-green {
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #5afa05;
}
.circulo-green {
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #5afa05;
}
.circulo-red {
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: red;
}
.circulo-none{
    display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color:gray;
}
</style>