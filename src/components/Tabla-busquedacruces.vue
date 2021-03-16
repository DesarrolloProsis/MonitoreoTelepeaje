<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Plaza</th>
        <th>No Tag</th>
        <th>Fecha</th>
        <th>Carril</th>
        <th>Tipo de Vehículo</th>
         <th>Tarifa</th>
      </tr>
      <tr v-for="(cruces, index) in dataCruces" :key="index">
        <td>{{cruces.plaza}}</td>
        <td>{{cruces.num_tag}}</td>
        <td>{{cruces.fecha}}</td>
        <td>{{cruces.carril}}</td>
        <td>{{cruces.tipo_vehiculo}} </td>
         <td>{{cruces.tarifa}} </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  name: "TablaBusquedaCruces",
  props: ["dataCruces"],
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
  background-color: #BEF265;
  border-width: 5px;
  padding: 8px;
  border-style: solid;
  border-color: white;
  text-align: left;
  color: BLACK;
  font-weight: 400;
  text-align: center;
  
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