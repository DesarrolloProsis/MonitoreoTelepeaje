<template>
<div style="padding-bottom:80px">
 <div class="responsive-table">
    <table class="tftable">
      <tr>        
        <th id="left-border">Plaza</th>
        <th>Última Actualización Proveedor</th>        
        <th id="right-border">Último Transaccion Enviada al Operador</th>
        <th>Última Transaccion en Plaza de Telepeaje</th>
        <th>#Tag</th>
      </tr>
      <tr v-for="(lista, index) in dataListas" :key="index">
        <td>{{lista.nombrePlaza}}</td>
        <td :class="`${lista.fechaActualizacionOperador == '' ? 'sinconexion' : ''}`">{{moment(lista.fechaActualizacionOperador == '' ? "Sin conexión":lista.fechaActualizacionOperadorn).format("YYYY-MM-DD  HH:mm a")}}</td> 
          <td :class="`${lista.fechaEnvioOperador == '' ? 'sinconexion' : ''}`">{{moment(lista.fechaEnvioOperador == '' ? "Sin conexión":lista.fechaEnvioOperador).format("YYYY-MM-DD  HH:mm a")}}</td>
          <td :class="`${lista.fechaDeCruce == '' ? 'sinconexion' : ''}`">{{moment(lista.fechaDeCruce == '' ? "Sin conexión":lista.fechaDeCruce).format("YYYY-MM-DD  HH:mm a")}}</td>
          <td :class="`${lista.idTag == '' ? 'sinconexion' : ''}`">{{lista.idTag == '' ? "Sin conexión":lista.idTag}}</td>
      </tr>
    </table>
  </div>
</div>
 
</template>


<script>
import moment from 'moment'
export default {
  name: "Tabla",
  props: ["dataListas"],
  created: function () {
    this.moment = moment;
    },
};
</script>
<style scoped>
#right-border {
  border-right: 5px solid white;
}
#left-border {
  border-left: 5px solid white;
}
.responsive-table {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 600px;
  
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
  border-radius: 15px;
  margin: 3px;
}

.tftable tr {
  background-color: #d4e3e5;
  border-bottom: 20px solid white;
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

.tftable tr:hover {
  background-color: #ffffff;
}
.sinconexion{
  
  background-color:#F1948A !important;
}
</style>