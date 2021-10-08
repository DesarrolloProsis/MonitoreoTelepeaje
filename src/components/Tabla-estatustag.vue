<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Tag</th>
        <th>Plaza</th>
        <th>Estatus</th>
        <th>Saldo</th>
        <th>Tipo Tag</th>
        <th>Última Actualización</th>
      </tr>
      <tr v-for="(tags, index) in datatag" :key="index">
        <td>{{ tags.tag }}</td>
        <td>{{tags.plaza}}</td>
        <td>{{ tags.estatus }}</td>
        <td>{{ tags.saldo }}</td>
        <td>{{ tags.tipo_tag }}</td>
        <td>{{ tags.ult_act }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaEstatusTag",
  props: ["datatag"],
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
