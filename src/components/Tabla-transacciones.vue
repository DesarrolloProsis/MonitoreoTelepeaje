<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>No Tag</th>
        <th>Fecha de Transacción</th>
        <th>Fecha de Envío</th>
        <th>Carril</th>
        <th>Clase Cajero</th>
        <th>Tarifa</th>
      </tr>
      <tr v-for="(transaccion, index) in dataTransacciones" :key="index">
        <td>{{transaccion.idTag}}</td>
        <td>{{ moment.utc(transaccion.fechaDeCruce).local().format('YYYY-MM-DD HH:mm:ss a') }}</td>
        <td>{{ moment.utc(transaccion.fechaEnvio).local().format('YYYY-MM-DD HH:mm:ss a') }}</td>
        <td>{{transaccion.carril}}</td>
        <td>{{transaccion.claseCajero}} </td>
        <td>${{transaccion.tarifa}} </td>
      </tr>
    </table>
  </div>
</template>


<script>
import moment from 'moment'
export default {
  name: "TablaTransacciones",
  props: ["dataTransacciones"],
  created: function () {
    this.moment = moment;
  },
};
</script>
<style scoped>

.responsive-table {
  padding-top: 20px;
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

</style>