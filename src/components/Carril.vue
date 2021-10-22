<template>

  <div
    class="flex flex-col flex-wrap flex-none mr-2"
    v-for="(carril, index) in carrilesdata"
    :key="index"
  >
    <div class="flex-1 bg-carriles-cian mh-cuerpo">
      {{ carril.cuerpo }}
      <div v-if="carril.status == 'Green'">
        <span class="circulo-green"></span>
      </div>
      <div v-else-if="carril.status == 'Red'">
        <span class="circulo-red"></span>
        <ModalCarriles :carril="carril.cuerpo" tipoalarma="ejemplotipoalarma"></ModalCarriles>
      </div>
       <div v-else>
        <span class="circulo-none"></span>
      </div>
    </div>
    <!-- <div class="flex-1 bg-carriles-green mh-other">
      {{ carril.lectura_valida }}
    </div>
    <div class="flex-1 bg-carriles-red mh-other">
      {{ carril.lectura_invalida }}
    </div> -->
    <div class="flex-1 bg-carriles-blue mh-other">
      {{ carril.ultimo_cruce }}
    </div>
  </div>

  <div
    class="flex flex-col flex-wrap flex-none mr-2"
    v-for="(carril, index) in carrilesB"
    :key="index"
  >
    <div class="flex-1 bg-carriles-cian mh-cuerpo">
      {{ carril.cuerpo }}
      <div v-if="carril.status == 'Green'">
        <span class="circulo-green"></span>
      </div>
      <div v-else-if="carril.status == 'Red'">
        <span class="circulo-red"></span>
        <ModalCarriles :carril="carril.cuerpo" tipoalarma="ejemplotipoalarma"></ModalCarriles>
      </div>
       <div v-else>
        <span class="circulo-none"></span>
      </div>
    </div>
    <!-- <div class="flex-1 bg-carriles-green mh-other">
      {{ carril.lectura_valida }}
    </div>
    <div class="flex-1 bg-carriles-red mh-other">
      {{ carril.lectura_invalida }}
    </div> -->
    <div class="flex-1 bg-carriles-blue mh-other">
      {{ carril.ultimo_cruce }}
    </div>
  </div>
  
</template>
<script>
import ModalCarriles from "../components/Modal-carriles";
export default {
  name: "Carril",
  components:{
      ModalCarriles
  },
  
  props: ["carrilesdata", "carrilesB"],
  
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