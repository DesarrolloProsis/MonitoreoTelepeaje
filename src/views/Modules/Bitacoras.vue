<template>
    <Navbar></Navbar>
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
            ></ModuloBitacoras>
        </div>
    </div>
    <Footer></Footer>
</template>
<script>
import Servicio from '../../Servicios/Token-Services';
import jwt_decode from "jwt-decode";
import Navbar from "../../components/Navbar.vue";
import Footer from "../../components/Footer-login";
import ModuloBitacoras from "../../components/Modulo-bitacoras";
export default {
    components: {
        Navbar,
        Footer,
        ModuloBitacoras,
    },
    data() {
        return {
            modulos: [
                /*{
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Alarmas",
                    ruta: "/inicio/monitoreo-carriles/bitacora-alarmas",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Antifraude",
                    ruta: "/inicio/bitacora-antifraude",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Listas",
                    ruta: "/inicio/bitacora-listas",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Accesos",
                    ruta: "/inicio/bitacora-accesos",
                },*/
            ],
            carriles:true,
        };
    },
    beforeMount(){
        if(Servicio.getCookie("Token")){
            let info = jwt_decode(Servicio.getCookie("Token"))
            this.carriles = info['Monitoreo Carriles']
            console.log(this.carriles);
        }
        if(this.carriles == 'false'){
            this.modulos = [
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Antifraude",
                    ruta: "/inicio/bitacora-antifraude",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Listas",
                    ruta: "/inicio/bitacora-listas",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Accesos",
                    ruta: "/inicio/bitacora-accesos",
                },
            ]
        }else{
            this.modulos= [
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Alarmas",
                    ruta: "/inicio/monitoreo-carriles/bitacora-alarmas",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Antifraude",
                    ruta: "/inicio/bitacora-antifraude",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Listas",
                    ruta: "/inicio/bitacora-listas",
                },
                {
                    img_src: "Menu/bitacora-accesos.png",
                    nombre: "Bitácora De Accesos",
                    ruta: "/inicio/bitacora-accesos",
                }
            ]    
        }
    }
};
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