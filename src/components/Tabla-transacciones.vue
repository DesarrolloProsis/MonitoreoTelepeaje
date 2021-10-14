<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Plaza</th>
        <th>No Tag</th>
        <th>Fecha de Envío</th>
        <th>Carril</th>
        <th>Tipo de Vehículo</th>
        <th>Tarifa</th>
      </tr>
      <tr v-for="(transaccion, index) in dataTransacciones" :key="index">
        <td>{{transaccion.plaza}}</td>
        <td>{{transaccion.num_tag}}</td>
        <td>{{transaccion.fecha_envio}}</td>
        <td>{{transaccion.carril}}</td>
        <td>{{transaccion.tipo_vehiculo}} </td>
        <td>{{transaccion.tarifa}} </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  name: "TablaTransacciones",
  props: ["dataTransacciones"],
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