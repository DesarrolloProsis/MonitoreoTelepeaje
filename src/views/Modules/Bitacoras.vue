<template>
    <Navbar/>
    <h1 class="title font-bold font-titulo">Bitácoras</h1>
    <div class="container mx-auto px-auto pb-20 pt-0 md:px-48 md:pt-10 my-32">
        <div class="flex flex-wrap">
            <ModuloBitacoras
                v-for="(modulo, index) in modulos"
                :key="index"
                :nombre="modulo.nombre"
                :img_src="modulo.img_src"
                :ruta="modulo.ruta"
                :mostrar="carriles"
                :color="modulo.color"
            ></ModuloBitacoras>
        </div>
    </div>
    <Footer/>
</template>
<script>
import Servicio from '../../Servicios/Token-Services';
import jwt_decode from "jwt-decode";
import { ref } from 'vue'
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";

import ModuloBitacoras from "../../components/Modulo-bitacoras";
export default {
    components: {
        Navbar,
        Footer,
        ModuloBitacoras,
    },
    setup() {
        const modulos = ref([])
        const carriles = ref(true)

        if(Servicio.getCookie("Token")){
            let info = jwt_decode(Servicio.getCookie("Token"))
            carriles.value = info['Monitoreo Carriles']
        }
        if(carriles.value == 'false'){
            modulos.value = [
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Antifraude",
                    ruta: "/inicio/bitacora-antifraude",
                    color: "green"
                },
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Listas",
                    ruta: "/inicio/bitacora-listas",
                    color: "red"
                },
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Accesos",
                    ruta: "/inicio/bitacora-accesos",
                    color: "yellow"
                },
            ]
        }else{
            modulos.value = [
                /* {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Alarmas",
                    ruta: "/inicio/monitoreo-carriles/bitacora-alarmas",
                    color: "green"
                }, */
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Antifraude",
                    ruta: "/inicio/bitacora-antifraude",
                    color: "red"
                },
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Listas",
                    ruta: "/inicio/bitacora-listas",
                    color: "yellow"
                },
                {
                    img_src: "Menu/bitacoras.png",
                    nombre: "Bitácora De Accesos",
                    ruta: "/inicio/bitacora-accesos",
                    color: "blue"
                }
            ]    
        }

        return {modulos, carriles}
    }
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: 55px;
    padding-top: 20px;
}
@media (max-width: 750px) {
    .title {
        font-size: 20px;
        padding-bottom: 20px;
    }
}
</style>