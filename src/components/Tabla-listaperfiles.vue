<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Perfil</th>
        <th>Modulos</th>
        <th>Plazas</th>
        <th>Estatus</th>
      </tr>
      <tr v-for="(perfiles, index) in dataPerfiles" :key="index">
        <td>{{ perfiles.perfil }}</td>
        <td><button class="button btn-actualizar">Actualizar</button></td>
        <td><button class="button btn-seleccionar">Seleccionar</button></td>
        <td v-if="perfiles.estatus == 'Activo'">
          <button class="button btn-activo">Activo</button>
        </td>
          <td v-else-if="perfiles.estatus == 'Inactivo'">
          <button class="button btn-inactivo">Inactivo</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaListaPerfiles",
  props: ["dataPerfiles"],
};
</script>
<style scoped>
.button{
    padding: 5px 10px;
    border-radius: 10px;
    min-width: 100px;
}
.button:focus{
    outline: 0;
}
.btn-actualizar{
    background-color: #F7AC55;
    color: #6E0400;
}
.btn-seleccionar{
    background-color: #4DFFEA;
    color:#025C51;
}
.btn-activo{
    background-color: #614DFF;
    color:#000071;
}
.btn-inactivo{
    background-color: #FF3131;
    color:#6F0404;
}
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
  background-color: #2ED0E1;
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