<template>
  <div v-if="modalShow">
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-10"></div>
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
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Alarma </h3>
                <div v-if="tipoalarma == 'CAMBIO_DE_ESTATUS'" class="mt-2">
                  <p v-if="antenaStateChange.newState == 'normal'"  class="text-lg text-gray-500">Se conectaron las antena en los carriles</p>
                  <p v-else class="text-lg text-gray-500">Se desconectaron las antena en los carriles</p>
                  <br/>
                  <li v-for="(antena,index) in antenas" :key="index">Antena Id: <b>{{antena.idAntena}}</b> Carril: <b>{{antena.lineaCarril}}</b></li>
                </div>
                <div v-else class="mt-2">
                  <p class="text-lg text-gray-500">
                    Existe un alarma de tipo <b> {{ tipoalarma }} </b> en el Reader con la siguiente direccion IP <b> {{ carril }} </b> con las siguientes antenas:
                  </p>
                  <br/>
                  <li v-for="(antena,index) in antenas" :key="index">Antena Id: <b>{{antena.idAntena}}</b> Carril: <b>{{antena.lineaCarril}}</b></li>
                </div>
              </div>
            </div>
            <img
              class="img-center"
              src="@/assets/MonitoreoCarriles/img-alerta.png"
            />
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="hideModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div></div>
  </div>
</template>
<script>
import { reactive} from 'vue';

export default {
  name: "ModalCarriles",
  props: ["carril", "tipoalarma", "modalOpen","antenas", "antenaStateChange"],  
  setup(props, { emit }){ 
    
    let modalShow = reactive(props.modalOpen)
    const hideModal = function(){      
      emit('cerrar-modal')            
    }

    return {  hideModal, modalShow }
  }
};
</script>
<style scoped>
.img-center {
  display: block;
  margin: auto;
  width: 100%;
  max-width: 150px;
  padding-top: 30px;
}
</style>
