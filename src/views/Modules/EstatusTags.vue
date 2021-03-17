<template>
  <Navbar></Navbar>
  <h1 class="title">Estatus Tags</h1>
  <div class="flex justify-center">
    <div class="flex-1 text-center pt-4">
      <input class="input-tags" type="text" placeholder="IMDM0000" />
      <img class="img-search" src="~@/assets/search.png" />
    </div>
  </div>
  <div class="container mx-auto px-0 md:px-60 pb-24 pt-4">
    <TablaEstatusTag :datatag="tags"></TablaEstatusTag>
  </div>
  <Footer></Footer>
</template>
<script>
import TablaEstatusTag from "../../components/Tabla-estatustag";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
export default {
  components: {
    TablaEstatusTag,
    Navbar,
    Footer,
  },
  data() {
    return {
      tags: [
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },

        {
          estatus: "Válido",
          saldo: "$500",
          tipo_tag: "Prepago",
          ult_act: "2021/02/23 13:02:59",
        },
      ],
    };
  },
};
</script>
<style scoped>
.title {
  text-align: center;
  font-size: 25px;
  padding-top: 20px;
}
.img-search {
  display: inline;
  width: 40px;
}
.input-tags {
  display: inline;
  border-bottom: 1px solid black;
  width: 200px;

  text-align: center;
  font-size: 28px;
}
@media (max-width: 750px) {
  .title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>

