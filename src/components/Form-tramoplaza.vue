<template>
    <div class="inline-flex" :class="{'w-69 mt-3 border-none': tipo == 'Transacciones', 'border-none': tipo == 'Antifraude', 'border-none text-white':tipo == 'alarma'}">
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Tramo:</span>
        <select :disabled="!habilitar" v-model="tramoSeleccionado" @change="obtner_plazas_por_tramo" class="p-1 px-2  outline-none w-full text-gray-800 mr-3 ml-3 rounded" name="select" id="selectorTramo">                                    
            <option v-for="(tramo, key) in tramos" :value="tramo" :key="key">
                {{ tramo.text }}
            </option>
        </select>        
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Plaza:</span>
        <select v-if="plazas.length == 0" :disabled="!habilitar" class="p-1 px-2  outline-none w-full text-gray-800 ml-3 rounded" name="select" id="selectorTramo" placeholder="Cargando...">
            <option :class="{'hidden':plazas.length == 0}" value=""><span v-if="!habilitar">Cargando...</span><span v-else>Sin Conexiòn</span></option>
            <option value="">Sin Conexión</option>
        </select>
        <select v-else v-model="plazaSeleccionado" :disabled="!habilitar" @change="obtener_carriles_por_plaza" class="p-1 px-2  outline-none w-full text-gray-800 ml-3 rounded" name="select" id="selectorTramo" placeholder="Cargando...">
            <option v-if="plazas.length == 0" value="">Sin Conexión</option>
            <option v-else value="">Selecione Plaza</option>            
            <option v-for="(plaza, key) in plazas" :value="plaza" :key="key" :disabled="!plaza.conexion" :class="{'text-gray-500':plaza.conexion == false}">{{ plaza.nombre }} <span v-if="!plaza.conexion">(Sin Conexión)</span> </option>
        </select>
        <template v-if="carrilesForm">
            <span class="mt-1 ml-3" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Carriles:</span>
            <select :disabled="!habilitar" v-model="carrilSeleccionado" @change="emit_tramo_plaza" class="p-1 px-2  outline-none w-full text-gray-800 ml-3 rounded" name="select" id="selectorTramo">                                    
                <option v-if="carriles.length == 0" value="">Sin Carriles</option>
                <option v-else value="">Selecione Carril</option>            
                <option v-for="(carril, key) in carriles" :value="carril" :key="key">{{ carril.lineaCarril }}</option>
            </select>
        </template>
    </div>
</template>
<script>
import Servicio from '../Servicios/Token-Services';
import jwt_decode from "jwt-decode";
import { ref, onMounted } from 'vue'
import axios from "axios";
import { notify } from "@kyvg/vue3-notification";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default { 
    props: ['carrilesForm', 'tipo'],    
    setup(props, { emit }){
        const tramos = ref([])
        const plazas = ref([])
        const carriles = ref([])   
        const habilitar = ref(false)  
        tramos.value.push({'id': 1, 'text': 'Mex-Acapulco'})
        tramos.value.push({'id': 2, 'text': 'Mex-Irapuato'})

        const tramoSeleccionado = ref(tramos.value[0])
        const plazaSeleccionado = ref('')  
        const carrilSeleccionado = ref('')      

        const obtner_plazas_por_tramo = async () => {      
            plazas.value = []  
            habilitar.value = false       
            axios.get(`${API}/PlazaAsignada/PorTramoConnection/${tramoSeleccionado.value.id}`)
            .then((responseFullPlazas) => {       
                Servicio.getCookie("Token")
                let info = jwt_decode(Servicio.getCookie("Token"))             
                axios.get(`${API}/PlazaAsignada/DelUsuario/${info.UsuarioId}`)
                .then((responsePlazaUsuario) => {
                    plazas.value = []      
                    responseFullPlazas.data.body.forEach(plaza => {
                        let objPlazaValida = responsePlazaUsuario.data.body
                        .find(item => item.plazaAsignadaId == plaza.plazaAsignadaId)                        
                        if(objPlazaValida != undefined)
                            plazas.value.push({ ...objPlazaValida, numeroPlazaCapufe: plaza.numeroPlazaCapufe, conexion: plaza.connected})
                            habilitar.value = true                        
                    })                             
                    if(props.carrilesForm)                    
                        emit_tramo_plaza()                                            
                })                             
            })
            .catch((error) => { console.log(error)})
        }

        const obtener_carriles_por_plaza = async () => {             
            axios.get(`${API}/Carriles/${plazaSeleccionado.value.plazaAsignadaId}`)
                .then((response) => {                    
                    if(response.data.body.length == 0 || response.data.body == null){
                        notify({ type: 'warning', title:'Sin carriles en plaza', text: `No se pudo encontrar carriles`});
                    }
                    else{
                        carriles.value = response.data.body
                    }
                })
                .catch((error) => console.log(error))
            
            emit_tramo_plaza()
        }

        const emit_tramo_plaza = () => {
            if(props.tipo == 'alarma')
                emit('cambiar-tramo-plaza', { 'tramo': tramoSeleccionado.value.id, plaza:plazaSeleccionado.value.numeroPlazaCapufe, carril: carrilSeleccionado.value.lineaCarril })
            else
                emit('cambiar-tramo-plaza', { 'tramo': tramoSeleccionado.value.id, plaza:plazaSeleccionado.value.plazaAsignadaId, carril: carrilSeleccionado.value.lineaCarril })
        }
        onMounted(obtner_plazas_por_tramo)  
        return { tramos, plazas, obtner_plazas_por_tramo, obtener_carriles_por_plaza, tramoSeleccionado, plazaSeleccionado, carrilSeleccionado, emit_tramo_plaza, carriles, habilitar }
    }, 
}
</script>