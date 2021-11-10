<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Usuario</th>
        <th>Nombre</th>
        <th>Rol</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
      </tr>
      <tr v-for="(accesos, index) in dataAccesos" :key="index">
        <td>{{ accesos.nombreUsuario }}</td>
        <td>{{ accesos.nombre + ' ' + accesos.apellidoP + ' ' + accesos.apellidoM}}</td>
        <td>{{ accesos.rol }}</td>
        <td>{{ moment(accesos.fecha_inicio).format("YYYY-MM-DD  HH:mm:ss a") }}</td>
        <td>{{ moment(accesos.fecha_fin).format("YYYY-MM-DD  HH:mm:ss a") }}</td>
      </tr>
    </table>
  </div>
</template>


<script>
import moment from 'moment'
export default {
  name: "TablaAccesos",
  props: ["dataAccesos"],
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

  font-weight: 400;
  text-align: center;
  border-radius: 15px;
  margin: 3px;
  color: white;
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