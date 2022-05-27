<template>
  <!-- Tabla Estatus Tag -->
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Tag</th>
        <th>Estatus</th>
        <th>Saldo</th>
        <th>Tipo Tag</th>
        <th v-if="bandera == 'En Lista Negra'">Lista Negra</th>
        <th>Última Actualización</th>
      </tr>
      <tr v-for="(tags, index) in datatag" :key="index">
        <td>{{ tags.tag }}</td>
        <td>{{ tags.estatus }}</td>
        <td>{{ tags.saldo }}</td>
        <td>{{ tags.tipo_tag }}</td>
        <td v-if="tags.bandera != null">
            <img class="img-search" src="~@/assets/opcion.png" @click="abrirModal(tags)"/>
        </td>
        <td>{{ moment(tags.ult_act).format("YYYY-MM-DD  HH:mm:ss a") }}</td>
      </tr>
    </table>
  </div>
  <!-- Modal Información Lista Negra -->
  <div class="sticky inset-0 " :class="{'modal-container': modalListaNegra}">
    <div v-if="modalListaNegra" class="rounded-lg  justify-center border absolute inset-x-0 bg-white border-gray-400 w-69  mx-auto px-12 py-10 shadow-2xl mt-66">
      <p class="text-gray-900 font-bold text-2xl -mt-8 mb-8 text-center">Información de Lista Negra</p>     
      <div class="grid grid-cols-2 mt-2">
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Fecha Entrada</p>
        <!-- <input v-model="newRol.nombre" type="text" class="border rounded-lg"> -->
        <span>{{ moment(fechaEntrada).format("YYYY-MM-DD  HH:mm:ss a") }}</span>
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Fecha Salida</p>
        <span>{{ moment(fechaSalida).format("YYYY-MM-DD  HH:mm:ss a") }}</span>
        <!-- <input v-model="newRol.nombre" type="text" class="border rounded-lg"> -->
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Tipo de Causa</p>
        <span>{{ tipoCausa }}</span>
        <p class="text-sm mb-1 font-semibold text-gray-700 sm:-ml-6">Descripción de la Causa</p>
        <span style="text-align: justify;" class="text-aling">{{ descripcionCausa }}</span>
        <!-- <input v-model="newRol.nombre" type="text" class="border rounded-lg"> -->
      </div>
      <div class="mt-5 text-center ml-6">
        <button @click="modalListaNegra = false" class="botonIconOk">Ok</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue' // se importa para poder generar una referencia reactiva para tipos primitivos (números, strings o booleanos)
import moment from 'moment' //
export default {
  name: "TablaEstatusTag",//Nombre del componente para mostrar en vuex
  props: {
    datatag: Array, //Propiedad que trea toda la información del tag, viene desde el componente padre
    bandera: String //Propiedad para saber si está en la lista negra el tag, viene desde el componente padre
  },
    //["datatag"],//propiedad que trae toda la infromación sobre el tag
  created: function () {
    this.moment = moment; //moment funciona para dar un formato a la fecha
  },
  setup(){

    const modalListaNegra = ref(false) // variable que indica si se abre el modal de la información de la lista negra
    const fechaEntrada = ref('') //variable que indica la fecha de entrada a la lista negra
    const fechaSalida = ref('') //variable que indica la fecha de salida de la lista negra
    const tipoCausa = ref('') //variable que indica el tipo de causa de la entrada a lista negra
    const descripcionCausa = ref('') //variable que indica la descripción de la causa 
    function abrirModal (tags) { //función para abrir el modal de la infromación de la lista negra
    console.log('tabla');
      fechaEntrada.value = tags.fechaEntrada //asignación de valor de la fecha de entrada
      fechaSalida.value = tags.fechaSalida //asignación de valor de la fecha de salida
      tipoCausa.value = tags.idCausa // asignación de valor del tipo de causa de entrada a la lista negra
      descripcionCausa.value = tags.descripcion // asignación de valor de la descripción de la causa
      modalListaNegra.value = true //se abre el modal
    }
    return { modalListaNegra, fechaEntrada, fechaSalida, tipoCausa, descripcionCausa, abrirModal }
  }
};
</script>
<style scoped>
.responsive-table {
  padding-top: 20px;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 500px;
}
.tftable {
  font-size: 12px;
  color: #333333;
  width: 100%;
}
.tftable th {
  font-size: 14px;
  background-color: #2c5282;
  border-width: 5px;
  padding: 8px;
  border-style: solid;
  border-color: white;
  text-align: left;
  color: white;
  font-weight: 400;
  text-align: center;
  margin: 3px;
  border-radius: 15px;
}

.tftable td {
  font-size: 14px;
  border-bottom-width: 2px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-top-width: 2px;
  padding: 8px;
  border-style: solid;
  border-bottom-color: #a1a1a1;
  border-left-color: white;
  border-right-color: white;

  text-align: center;
}
.img-search {
  display: inline;
  width: 20px;
  cursor: pointer;
}
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
</style>
