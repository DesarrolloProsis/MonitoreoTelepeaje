<template>
<div class="responsive-table">
  <table class="tftable">
    <tr>
      <th>Plaza</th>
      <th>Carril</th>
      <th>Fecha de Cruce</th>
      <th>ID TAG</th>
      <th>Clase Marcada</th>
    </tr>
    <tr v-for="(cruce, index) in dataCruces" :key="index">
      <td>{{cruce.plaza}}</td>
      <td>{{cruce.carril}}</td>
      <td>{{cruce.fecha_cruce}}</td>
      <td>{{cruce.id_tag}}</td>
      <td>{{cruce.clase_marcada}} </td>
    </tr>
  </table>
</div>
</template>


<script>
export default {
  name: "Tabla",
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
  background-color: #2ED0E1;
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
