<template>
    <div class="inline-flex border" :class="{'w-69 mt-3': tipo == 'Transacciones', 'border-none': tipo == 'Antifraude'}">
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Tramo:</span>
        <select v-model="tramoSeleccionado" @change="obtner_plazas_por_tramo" class="p-1 px-2  outline-none w-full text-gray-800 mr-3 ml-3 rounded" name="select" id="selectorTramo">                                    
            <option v-for="(tramo, key) in tramos" :value="tramo" :key="key">
                {{ tramo.text }}
            </option>
        </select>        
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Plaza:</span>
        <select v-model="plazaSeleccionado" @change="obtener_carriles_por_plaza" class="p-1 px-2  outline-none w-full text-gray-800 ml-3" name="select" id="selectorTramo">                                    
            <option v-if="plazas.length == 0" value="">Sin Plazas</option>
            <option v-else value="">Selecione Plaza</option>            
            <option v-for="(plaza, key) in plazas" :value="plaza" :key="key">{{ plaza.nombre }}</option>
        </select>
        <template v-if="carrilesForm">
            <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Carriles:</span>
            <select v-model="carrilSeleccionado" @change="emit_tramo_plaza" class="p-1 px-2  outline-none w-full text-gray-800 ml-3" name="select" id="selectorTramo">                                    
                <option v-if="carriles.length == 0" value="">Sin Carriles</option>
                <option v-else value="">Selecione Carril</option>            
                <option v-for="(carril, key) in carriles" :value="carril" :key="key">{{ carril }}</option>
            </select>
        </template>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default { 
    props: ['carrilesForm', 'tipo'],    
    setup(props, { emit }){
        const tramos = ref([])
        const plazas = ref([])
        const carriles = ref([])        
        tramos.value.push({'id': 1, 'text': 'Mex-Acapulco'})
        tramos.value.push({'id': 2, 'text': 'Mex-Irapuato'})

        const tramoSeleccionado = ref(tramos.value[0])
        const plazaSeleccionado = ref('')  
        const carrilSeleccionado = ref('')      

        const obtner_plazas_por_tramo = async () => {                  
            axios.get(`${API}/PlazaAsignada/PorTramo/${tramoSeleccionado.value.id}`)
            .then((responseFullPlazas) => {  
                //console.log(responseFullPlazas)                  
                axios.get(`${API}/PlazaAsignada/DelUsuario/${1}`)
                .then((responsePlazaUsuario) => {
                    //console.log(responsePlazaUsuario)     
                    plazas.value = []      
                    responseFullPlazas.data.body.forEach(plaza => {
                        let objPlazaValida = responsePlazaUsuario.data.body
                        .find(item => item.plazaAsignadaId == plaza.plazaAsignadaId)

                        if(objPlazaValida != undefined)
                            plazas.value.push(objPlazaValida)                        
                    });                   
                    
                    props.carrilesForm == true
                    ? obtener_carriles_por_plaza()
                    : emit_tramo_plaza()                                            
                })                             
            })
            .catch((error) => { console.log(error)})
        }

        const obtener_carriles_por_plaza = async () => {            
            let carril = 'A' + Math.random()
            carriles.value.push(carril)
            emit_tramo_plaza()
        }

        const emit_tramo_plaza = () => {
            emit('cambiar-tramo-plaza', { 'tramo': tramoSeleccionado.value.id, plaza:plazaSeleccionado.value.plazaAsignadaId, carril: carrilSeleccionado.value })
        }
        onMounted(obtner_plazas_por_tramo)  
        return { tramos, plazas, obtner_plazas_por_tramo, obtener_carriles_por_plaza, tramoSeleccionado, plazaSeleccionado, carrilSeleccionado, emit_tramo_plaza, carriles }
    }, 
}
</script>


