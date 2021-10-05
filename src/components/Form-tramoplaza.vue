<template>
    <div class="inline-flex">
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Tramo:</span>
        <select v-model="tramoSeleccionado" @change="obtner_plazas_por_tramo" class="p-1 px-2  outline-none w-full text-gray-800 mr-3 ml-3" name="select" id="selectorTramo">                                    
            <option v-for="(tramo, key) in tramos" :value="tramo" :key="key">
                {{ tramo.text }}
            </option>
        </select>        
        <span class="mt-1" :class="{'mt-0 text-white': tipo == 'Antifraude'}">Plaza:</span>
        <select v-model="plazaSeleccionado" @change="emit_tramo_plaza" class="p-1 px-2  outline-none w-full text-gray-800 ml-3" name="select" id="selectorTramo">                                    
            <option v-if="plazas.length == 0" value="">Sin Plazas</option>
            <option v-else value="">Selecione Plaza</option>            
            <option v-for="(plaza, key) in plazas" :value="plaza" :key="key">{{ plaza.nombre }}</option>
        </select>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION
export default {        
    setup(_, { emit }){
        const tramos = ref([])
        const plazas = ref([])        
        tramos.value.push({'id': 1, 'text': 'Mex-Acapulco'})
        tramos.value.push({'id': 2, 'text': 'Mex-Irapuato'})

        const tramoSeleccionado = ref(tramos.value[0])
        const plazaSeleccionado = ref('')        

        const obtner_plazas_por_tramo = async () => {                  
            axios.get(`${API}/PlazaAsignada/PorTramo/${tramoSeleccionado.value.id}`)
            .then((responseFullPlazas) => {                    
                axios.get(`${API}/PlazaAsignada/DelUsuario/${1}`)
                .then((responsePlazaUsuario) => {
                    plazas.value = []      
                    responseFullPlazas.data.body.forEach(plaza => {
                        let objPlazaValida = responsePlazaUsuario.data.body
                        .find(item => item.plazaAsignadaId == plaza.plazaAsignadaId)

                        if(objPlazaValida != undefined)
                            plazas.value.push(objPlazaValida)                        
                    });
                    emit_tramo_plaza()
                })                             
            })
            .catch((error) => { console.log(error)})
        }

        const emit_tramo_plaza = () => {
            emit('cambiar-tramo-plaza', { 'tramo': tramoSeleccionado.value.id, plaza:plazaSeleccionado.value.plazaAsignadaId })
        }
        onMounted(obtner_plazas_por_tramo)  
        return { tramos, plazas, obtner_plazas_por_tramo, tramoSeleccionado, plazaSeleccionado, emit_tramo_plaza }
    },
    props:{
        tipo: {
            type: String,
            default: ''
        },
    }
}
</script>


