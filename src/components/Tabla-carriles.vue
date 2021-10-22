<template>
  <div class="container mx-auto px-0 pt-4 py-8">
    <div class="mt-2 mx-2 md:mx-0">
      <p>Filtros de Búsqueda:</p>
      <div class="flex flex-col md:flex-row border-gray-200 pb-0 mb-4">
        <div class="flex-1 flex flex-col md:flex-row md:space-x-2">
          <div class="flex-2">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <select
                class="p-1 px-2 outline-none w-full text-gray-800"
                name="select"
              >
                <option value="" selected disabled hidden>
                  Seleccionar Tramo
                </option>
                <option value="0">Opción 1</option>
              </select>
            </div>
          </div>
          <div class="flex-2">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <select
                class="p-1 px-2 outline-none w-full text-gray-800"
                name="select"
              >
                <option value="" selected disabled hidden>
                  Seleccionar Plaza
                </option>
                <option value="0">Opción 1</option>
              </select>
            </div>
          </div>

          <div class="flex-2">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded btn-search">
              <button
                class="
                  p-1
                  px-2
                  appearance-none
                  outline-none
                  w-full
                  text-white
                "
              >
                Buscar
              </button>
            </div>
          </div>
          <div class="flex-2">
            <div class="my-2 p-1 bg-white flex border border-gray-200 rounded">
              <router-link
                to="/inicio/monitoreo-carriles/bitacora-alarmas"
                tag="div"
              >
                <button
                  class="
                    p-1
                    px-2
                    appearance-none
                    outline-none
                    w-full
                    text-gray-800
                    hidden
                  "
                >
                  Ir a Bitácora de Alarmas
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    
    <div class="flex ta-center overflow-x-auto pt-6">
      <div class="flex justify-center items-center flex-none bg-carriles-gray p-5">
        <div>Plaza:<br />Tepozotlan<br />Cuerpo A</div>
      </div>
      <div class="flex flex-col flex-none">
        <div class="flex-1 bg-carriles-gray mh-cuerpo lh-cuerpo">Carril</div>
        <div class="flex-1 bg-carriles-gray mh-other ">Último Cruce</div>
      </div>
      <Carril :carrilesdata="carriles"></Carril>
    </div>
    <div class="flex ta-center overflow-x-auto pt-6">
      <div class="flex justify-center items-center flex-none bg-carriles-gray p-5">
        <div>Plaza:<br />Tepozotlan<br />Cuerpo B</div>
      </div>
      <div class="flex flex-col flex-none">
        <div class="flex-1 bg-carriles-gray mh-cuerpo lh-cuerpo">Cuerpo</div>
        <div class="flex-1 bg-carriles-gray mh-other ">Último Cruce</div>
      </div>
      <Carril :carrilesB="carrilesB"></Carril>
    </div>
  </div>
</template>
<script>
import Carril from "../components/Carril";

export default {
  name: "TablaCarriles",
  components: {
    Carril,
  },
  data() {
    return {
      carriles: [
        {
          cuerpo: "A09",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A10",
          status: "Red",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A11",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A12",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A13",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A14",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A15",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A19",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "A20",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
      ],
      carrilesB: [
        {
          cuerpo: "B02",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B03",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B04",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B05",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B06",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B07",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B08",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B17",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
        {
          cuerpo: "B19",
          status: "Green",
          lectura_valida: "1280",
          lectura_invalida: "1180",
          ultimo_cruce: "11:10",
        },
      ]
    };
  },
};
</script>
<style scoped>
.color-black {
  color: black !important;
}
.color-black:focus {
  outline: 0;
}
.ta-center {
  text-align: center;
}

.bg-carriles-gray {
  background-color: #d6e8eb;
  border: 1px solid black;
}

.mh-cuerpo {
  min-height: 80px;
  padding: 10px;
}
.lh-cuerpo {
  line-height: 59px;
}
.mh-other {
  min-height: 20px;
  line-height: 20px;
  padding: 10px;
}
.bg-blue {
  background-color: #0195b0;
  padding: 10px 5px;
}
.ml-right {
  display: block;
  margin-left: auto;
  margin-right: 10px;
}
.filter-style {
  color: white;
  font-size: 16px;
  margin-left: 10px;
}
.filter-style input {
  margin-left: 20px;
  color: black;
  border: 1px solid black;
  padding: 0px 5px;
}
.btn-carriles {
  background-color: #017296;
  color: white;
  font-size: 15px;
  height: 100%;
  padding: 0px 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.btn-search {
  background-color: #017296;
  color: white;
  
}
.btn-buscar:focus {
  outline: 0;
}
.btn-carriles:focus {
  outline: 0;
}
@media (max-width: 769px) {
  .filter-style {
    padding-top: 5px;
    padding-bottom: 15px;
  }
  .btn-carriles {
    background-color: #017296;
    color: white;
    font-size: 15px;
    padding: 10px 5px;
    border: 1px solid black;
    border-radius: 5px;
  }
}
</style>
