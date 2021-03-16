<template>
  <Navbar></Navbar>
  <div class="container mx-auto px-0 resp-cont">
    <h1 class="title">Monitoreo de Servicios de Con Proveedor de Telepeaje</h1>
    <button
      :style="{ 'background-color': isActive1 ? '#fcb32a' : 'gray' }"
      @click="btn1()"
      class="btn-listas"
    >
      Mex-Ira
    </button>
    <button
      :style="{ 'background-color': isActive2 ? '#fcb32a' : 'gray' }"
      @click="btn2()"
      class="btn-listas"
    >
      Mex-Aca
    </button>
    <Tabla :dataListas="listas"></Tabla>
  </div>
  <Footer></Footer>
</template>
<script>
import Navbar from "../../components/Navbar";
import Tabla from "../../components/Tabla-monitoreo";
import Footer from "../../components/Footer-login";
export default {
  components: {
    Navbar,
    Tabla,
    Footer
  },
  data() {
    return {
      listas: [],
      isActive1: true,
      isActive2: false,
    };
  },
  mounted() {
    this.btn1();
  },
  methods: {
    btn1: function () {
      this.isActive1 = true;
      this.isActive2 = false;
      //Consulta Axios
      this.listas = [
        {
          plaza: "Mex-Ira",
          actualizacionProveedor: "2021/01/29 15:59:00",
          ultactCarriles: "2021/01/29 15:57:00",
          ultcrucePlaza: "2021/01/29 15:57:00",
          ultcruceEnviado: "2021/01/29 15:59:00",
        },
        {
          plaza: "Mex-Ira",
          actualizacionProveedor: "2021/01/29 15:59:00",
          ultactCarriles: "2021/01/29 15:57:00",
          ultcrucePlaza: "2021/01/29 15:57:00",
          ultcruceEnviado: "2021/01/29 15:59:00",
        }
      ];
    },
    btn2: function () {
      this.isActive2 = true;
      this.isActive1 = false;
      //Consulta axios
      this.listas = [
        {
          plaza: "Mex-Aca",
          actualizacionProveedor: "2021/01/29 11:00:00",
          ultactCarriles: "2021/01/29 15:57:00",
          ultcrucePlaza: "2021/01/29 15:57:00",
          ultcruceEnviado: "2021/01/29 11:00:00",
        },
        {
          plaza: "Mex-Aca",
          actualizacionProveedor: "2021/01/29 11:00:00",
          ultactCarriles: "2021/01/29 11:00:00",
          ultcrucePlaza: "2021/01/29 15:57:00",
          ultcruceEnviado: "2021/01/29 11:00:00",
        }
      ];
    },
  },
};
</script>
<style scoped>

.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.btn-listas {
  padding: 5px 10px;
  border-left: 5px solid white;
  color: white;
}
.btn-listas:focus {
  outline: 0;
}
@media(max-width:750px){
  .title {
  font-size: 20px;
  padding-bottom: 20px;
}
}
</style>