<template>
    <Navbar/>
    <div class="container mx-auto px-0">
        <h1 class="title-center font-titulo font-bold pb-4">Bitácora de Actualización de Listas</h1>
        <div class="flex flex-wrap bg-blue rounded-lg">
            <div class="flex-none filter-style mt-1">
                <FormTramoPlaza @cambiar-tramo-plaza="recibir_tramo_plaza" :tipo="'Antifraude'"/>
            </div>
            <div class="flex-none filter-style mt-2">
                Fecha:<input v-model="fecha" type="date" class="rounded"/>
            </div>
            <div class="flex-none filter-style mr-66">
                <button @click="buscar(plaza,fecha)" class="btn-buscar">Buscar</button>
                <button @click="limpiar(plaza)" class="btn-buscar ml-2 mr-1">Limpiar</button>
            </div>
            <div class="flex-1">
                <FilesDownload @download-api="downloadApi"/>
            </div>
        </div>
        <div class="h-89 mx-auto px-0 md:px-60">
            <TablaListas :dataHistorico="listaHistorico"/>
        </div>
        <div class="mt-20 -mb-20">
            <Paginacion :total-pages="totalPaginas" :total="100" :current-page="currentPage" :has-more-pages="hasMorePages" @pagechanged="showMore"/>
        </div>
    </div>
    <!-- MODAL CARGANDO -->
    <Spinner :modalLoading="modalLoading"/>
<Footer/>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import FormTramoPlaza from '../../components/Form-tramoplaza.vue';
import ServiceFiles from '../../Servicios/Files-Service'
import TablaListas from "../../components/Tabla-listas.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer-login";
import FilesDownload from '../../components/Files-descargar.vue'
import axios from "axios";
import Paginacion from "../../components/Paginacion.vue"
import Spinner from '../../components/Spinner.vue'
export default {
    name: "BitacoraAccesos",
    components: { Navbar, Footer, FormTramoPlaza, TablaListas, FilesDownload, Paginacion,Spinner },
    data() {
        return {
            tramo: '',
            plaza: null,
            fecha:null,
            tag:null,
            listaHistorico: [],
            formato:'',
            modalLoading: false,
            page: 1,
            totalPaginas: 0,
            currentPage: 1,
            hasMorePages: true,
        };
    },
    beforeMount(){},
    methods: {
        limpiar(plaza){
            this.listaHistorico = []
            this.fecha = null
            axios.get(`${API}/Historico/${plaza}/${this.fecha}/${this.page}`)
            .then((result)=>{
                if(result.data.status == 'Ok'){
                    this.modalLoading = false
                    this.totalPaginas = result.data.numberPages
                    this.currentPage = result.data.now
                    result.data.body.forEach((e)=>{
                        let obj = {
                            fechaCreacion: e.fechaCreacion,
                            numeroDeTags: e.numeroDeTags,
                            timepoTotal: e.timepoTotal
                        }
                        this.listaHistorico.push(obj)
                    })
                }else{
                    this.modalLoading = false
                    this.$notify({
                        title:'Sin Información',
                        text:'No se encontraron listas',
                        type: 'warn'
                    });
                }
            })
        },
        buscar(plaza, fecha){
            this.listaHistorico = []
            this.modalLoading= true
            if(plaza == '' || plaza == undefined){
                this.modalLoading= false
                this.$notify({
                    title:'Sin Información',
                    text:'Se debe de seleccionar la plaza para realizar una busqueda',
                    type: 'warn'
                });
            }else{
                axios.get(`${API}/Historico/${plaza}/${fecha}/${this.page}`)
                .then((result)=>{
                    console.log(result.data);
                    if(result.data.status == 'Ok'){
                        this.modalLoading = false
                        this.totalPaginas = result.data.numberPages
                        this.currentPage = result.data.now
                        result.data.body.forEach((e)=>{
                            let obj = {
                                fechaCreacion: e.fechaCreacion,
                                numeroDeTags: e.numeroDeTags,
                                timepoTotal: e.timepoTotal
                            }
                            this.listaHistorico.push(obj)
                        })
                    }else{
                        setTimeout(() => {
                            this.modalLoading = false
                            this.$notify({
                                title:'Sin Información',
                                text:'No se encontraron listas',
                                type: 'warn'
                            });
                        }, 1000)
                        
                    }
                })
            }
        },
        recibir_tramo_plaza(value){
            this.tramo = value.tramo
            this.plaza = value.plaza
        },
        showMore(page){
            this.listaHistorico = []
            let plaza = this.plaza
            let fecha = this.fecha;
            axios.get(`${API}/Historico/${plaza}/${fecha}/${page}`)
            .then((result)=>{
                if(result.data.status == 'Ok'){
                    this.modalLoading = false
                    result.data.body.forEach((e)=>{
                        let obj = {
                            fechaCreacion: e.fechaCreacion,
                            numeroDeTags: e.numeroDeTags,
                            timepoTotal: e.timepoTotal
                        }
                        this.listaHistorico.push(obj)
                    })
                }else{
                    setTimeout(() => {
                        this.modalLoading = false
                        this.$notify({
                            title:'Sin Información',
                            text:'No se encontraron listas',
                            type: 'warn'
                        });
                    }, 1000)  
                }
            })
        },
        downloadApi(formato){
        if(this.plaza == null || this.plaza == undefined || this.plaza == ''){
            this.$notify({
                title:'Sin Información',
                text:'No se puede exportar sin antes hacer una busqueda',
                type: 'warn'
            });
        }else{
            if(this.fecha == null || this.fecha == '' || this.fecha == undefined){
                if (formato == "csv") {
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Download/Csv/${this.plaza}/null`, 'bitacoraListas.csv')
                } 
                else if (formato == "excel") {        
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Operador/Download/Excel/${this.plaza}/null`, 'bitacoraListas.xlsx')    
                } 
                else if (formato == "txt") {
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Download/txt/${this.plaza}/null`, 'bitacoraListas.txt')
                }      
            }else{
                if (formato == "csv") {
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Download/Csv/${this.plaza}/${this.fecha}`, 'bitacoraListas.csv')
                } 
                else if (formato == "excel") {        
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Operador/Download/Excel/${this.plaza}/${this.fecha}`, 'bitacoraListas.xlsx')    
                } 
                else if (formato == "txt") {
                    ServiceFiles.xml_hhtp_request(`${API}/Historico/Download/txt/${this.plaza}/${this.fecha}`, 'bitacoraListas.txt')
                }
            }
            }
        },
    },
}
</script>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.2);
}
.button-pagination {
    padding: 2px;
    border: 1px solid #2c5282;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 12px;
    margin-top: 20px;
}
.pb-100 {
    padding-bottom: 100px;
}
.title-center {
    text-align: center;
    font-size: 25px;
    padding-top: 20px;
}
.bg-blue {
    background-color: #2c5282;
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
.btn-buscar {
    background-color: #017296;
    color: white;
    height: 100%;
    padding: 0px 10px;
    border-radius: 5px;
    border: 1px solid black;
}
.btn-buscar:focus {
    outline: 0;
}
.btn-carriles:focus {
    outline: 0;
}
.color-black {
    color: black !important;
}
.color-black:focus {
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