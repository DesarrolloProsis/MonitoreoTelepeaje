<template>
<div style="padding-bottom:80px">
 <div class="responsive-table">
    <table class="tftable">
      <tr>
        
        <th id="left-border">Plaza</th>
        <th>Última Actualización Proveedor</th>
        <th>Última Actualización Carriles</th>
        <th id="right-border">Último Lstabint</th>
      </tr>
      <tr v-for="(lista, index) in dataListas" :key="index">
        <td>{{lista.plaza}}</td>
        <td :class="`${lista.actualizacionProveedor == null ? 'sinconexion' : ''}`">{{lista.actualizacionProveedor == null ? "Sin conexión":lista.actualizacionProveedor}}</td>
         <td :class="`${lista.ultactCarriles == null ? 'sinconexion' : ''}`">{{lista.ultactCarriles == null ? "Sin conexión":lista.ultactCarriles}}</td>
          <td :class="`${lista.ultimoLstabint == null ? 'sinconexion' : ''}`">{{lista.ultimoLstabint == null ? "Sin conexión":lista.ultimoLstabint}}</td>
      </tr>
    </table>
  </div>
</div>
 
</template>


<script>
export default {
  name: "Tabla",
  props: ["dataListas"],
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
  background-color: #0187a0;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #0187a0;
  text-align: left;
  color: white;
  font-weight: 400;
  text-align: center;
}
.tftable tr {
  background-color: #d4e3e5;
  border-bottom: 20px solid white;
}
.tftable td {
  font-size: 12px;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #cff09a;
  background-color: #cff09a;
  border: 5px solid white;
  text-align: center;
}
.tftable tr:hover {
  background-color: #ffffff;
}
.sinconexion{
  
  background-color:#F1948A !important;
}
</style>