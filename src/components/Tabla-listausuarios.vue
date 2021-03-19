<template>
  <div class="responsive-table">
    <table class="tftable">
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Rol</th>
        <th>Cambiar Contraseña</th>
         <th>Estatus</th>
      </tr>
      <tr v-for="(usuario, index) in dataUsuarios" :key="index">
        <td>{{usuario.nombre }}</td>
        <td>{{usuario.apellido }}</td>
         <td>{{usuario.rol}}</td>
        <td><button class="button btn-actualizar">Actualizar</button></td>
        <td v-if="usuario.estatus == 'Activo'">
          <button class="button btn-activo">Activo</button>
        </td>
          <td v-else-if="usuario.estatus == 'Inactivo'">
          <button class="button btn-inactivo">Inactivo</button>
        </td>
       <!-- <h1>{{perfiles[index]}}</h1>--> 
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaListaUsuarios",
  props: ["dataUsuarios"],
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
    background-color: #55F768;
    color: #00BE0F;
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