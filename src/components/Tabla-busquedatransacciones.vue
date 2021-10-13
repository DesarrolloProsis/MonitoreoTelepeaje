<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Fehca</th>
        <th>Carril</th>
        <th>Clase Cajero</th>
        <th>Medio Pago</th>
        <th>Tarifa</th>
        <th>Tag</th>
      </tr>
      <tr v-for="(cruces, index) in dataCruces" :key="index">
        <td>{{moment(cruces.fecha).format("YYYY-MM-DD  HH:mm a")}}</td>
        <td>{{cruces.carril}}</td>
        <td>{{cruces.clase}}</td>
        <td>{{cruces.pago}}</td>
        <td>{{cruces.tarifa}} </td>
        <td>{{cruces.num_tag}} </td>
      </tr>
    </table>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: "TablaBusquedaCruces",
  props: ["dataCruces"],
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
  font-weight: 500;
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

</style>