<template>
  <Navbar></Navbar>
  <div class="container mx-auto mh-full">
    <div class="flex flex-wrap justify-center content-center h-full">
      <div class="flex-none">
        <h1 class="title">Creación de nuevo Perfil de Usuario</h1>
        <div class="bg-form p-5 mb-8 md:p-14">
          <p><label>Perfil</label></p>
          <input id="perfilInput" class="input-w-100" type="text" />
          <p><label>Modulo</label></p>
          <button class="input-w-100 btn2 btn-seleccionar" @click="showModulos()">
            Seleccionar
          </button>
          <p><label>Plaza</label></p>
          <select class="flex-none p-1 input-w-100" name="select">
            <option value="100" selected>A01</option>
            <option value="200">A02</option>
          </select>
          <button class="btn-crear" @click="guardarPerfil()">Crear</button>
        </div>
      </div>
      {{ usuario }}
    </div>
  </div>

  <Footer></Footer>
  <!--Modal Actualizar-->
  <div v-if="isModulosActive == true">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-900 opacity-10"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
            <h2
              class="text-lg leading-6 font-bold text-gray-900"
              id="modal-headline"
            >
              Seleccionar Módulos
            </h2>
          </div>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div>
                  <!-- <p class="text-lg text-gray-500">
                    Data: {{ perfilSelected }}
                  </p>-->

                  <p v-for="(modulos, index) in usuario.modulos" :key="index">
                    {{ modulos.nombre }}:

                    <button
                      class="btn btn-active"
                      @click="cambiarModulos(index, modulos.seleccionado)"
                      v-if="modulos.seleccionado == true"
                    >
                      Activo
                    </button>
                    <button
                      class="btn btn-inactive"
                      @click="cambiarModulos(index, modulos.seleccionado)"
                      v-if="modulos.seleccionado == false"
                    >
                      Inactivo
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="hideModulos()"
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--Fin Modal Actualizar-->
</template>
<script>
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  name: "PerfilUsuario",
  components: { Navbar, Footer },
  data() {
    return {
      usuario: {
        perfil: "",
        estatus: true,
        modulos: [
          {
            nombre: "Bitacora Alarmas",
            seleccionado: false,
          },
          {
            nombre: "Busqueda de Cruces",
            seleccionado: false,
          },
          {
            nombre: "Configuración",
            seleccionado: false,
          },
        ],
        plazas: [],
      },
      isModulosActive: false,
    };
  },
  methods: {
    // !MODULOS
    showModulos: function () {
      this.isModulosActive = true;
      console.log(this.usuario);
    },
    hideModulos: function () {
      this.isModulosActive = false;
      //AGREGAR CONSULTA API PARA ENVIAR DATOS ACTUALIZADOS YA SEA ENVIANDO TODOS LOS DATOS O SOLO PERFILSELECTED
    },
    cambiarModulos: function (index, estatus) {
      this.usuario.modulos[index].seleccionado = !estatus;
      //console.log(this.perfilSelected.modulos[index].seleccionado)
    },
    guardarPerfil: function () {
      this.usuario.perfil = document.getElementById("perfilInput").value;

      if (this.usuario.perfil != "") {

        console.log("campo perfil lleno");
        console.log("perfil guardado...")
        //Peticion para guardar usuario
        console.log("Se reiniciaron campos");
        this.usuario = {
        perfil: "",
        estatus: true,
        modulos: [
          {
            nombre: "Bitacora Alarmas",
            seleccionado: false,
          },
          {
            nombre: "Busqueda de Cruces",
            seleccionado: false,
          },
          {
            nombre: "Configuración",
            seleccionado: false,
          },
        ],
        plazas: [],
      }

      } else {
        console.log("campo de perfil vacío");

      }
    },
  },
};
</script>
<style scoped>
.btn {
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px;
}
.btn2 {
  padding: 3px;
  border-radius: 5px;
  margin-top: 10px;
}
.btn-active {
  background-color: green;
  color: white;
}
.btn-inactive {
  background-color: grey;
  color: white;
}
.btn-crear {
  background-color: #017296;
  padding: 5px 15px;
  color: white;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
.btn-seleccionar{
    background-color: #f2f3f4 ;
    padding: 3px 15px;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    color: gray;
    text-align: left;
    font-size: 15px !important;
}
.input-w-100 {
  width: 100%;
  font-size: 18px;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 5px;
}
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.mh-full {
  height: calc(100vh - 85px);
  min-height: 400px;
}
.bg-form {
  background-color: #bcf5ff;
  border-radius: 20px;
}
@media (max-width: 750px) {
  .title {
    font-size: 18px;
    padding-bottom: 20px;
  }
}
</style>
