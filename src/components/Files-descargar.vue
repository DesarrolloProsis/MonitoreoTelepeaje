<template>
  <div class="w-full mt-2">
    <Multiselect v-model="formato" placeholder="Sleccione una Acción" @close="download_api" label="name" trackBy="name" :options="options" :searchable="true">
        <template v-slot:singleLabel="{ value }">
          <div class="multiselect-single-label">
            <img height="26" style="margin: 0 6px 0 0;" :src="value.icon"> {{ value.name }}
          </div>
        </template>
        <template v-slot:option="{ option }">
          <img height="22" style="margin: 0 6px 0 0;" :src="option.icon">{{ option.name }}
        </template>
    </Multiselect>  
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { ref } from 'vue'
export default {
    components: {
        Multiselect
    },    
    setup(_, { emit }){
        const formato = ref('')        
        const options = [ 
          { value: 'excel', name: 'EXCEL'},//0
          {  value: 'csv', name: 'CSV'},//1
          {  value: 'txt', name: 'TXT'},//2
        ]
        const download_api = () => {            
            emit("download-api", formato.value)
        }
        return{ formato, options, download_api}
    
    }


}
</script>

<style>

</style>