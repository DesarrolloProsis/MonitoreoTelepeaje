<template>
    <div class="responsive-table">          
        <table class="tftable" style="height:350px;">
            <tr>
                <th>Tag</th>
                <th>Carril</th>
                <th>Fecha de Entrada</th>
                <th>Fecha de Salida</th>
                <th>Causa</th>
            </tr>
            <tr v-for="(tag, index) in dataAntifraude" :key="index">
                <td>{{ tag.tag }}</td>
                <td>{{ tag.carril }}</td>
                <td>{{ moment(tag.fechaEntrada).format("YYYY-MM-DD  HH:mm a") }}</td>
                <td>{{ moment(tag.fechaSalida).format("YYYY-MM-DD  HH:mm a") }}</td>
                <td>{{ tag.causa }}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: "TablaAntifraude",
    props: ["dataAntifraude"],
    components:{
    },
    data() {
        return {
    
        };
    },
    created: function () {
    this.moment = moment;
    },
    methods: {
    },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}

.responsive-table {
    padding-top: 20px;
    overflow-x: auto;
    overflow-y: auto;
    max-height: 500px;
}
.tftable {
    font-size: 12px;
    color: #333333;
    width: 100%;
}
.tftable th {
    font-size: 14px;
    background-color: #2c5282;
    border-width: 5px;
    padding: 8px;
    border-style: solid;
    border-color: white;
    text-align: left;
    color: white;
    font-weight: 500;
    text-align: center;
    margin: 3px;
    border-radius: 15px;
}

.tftable td {
    font-size: 14px;
    border-bottom-width: 2px;
    border-left-width: 5px;
    border-right-width: 5px;
    border-top-width: 2px;
    padding: 8px;
    border-style: solid;
    border-bottom-color: #a1a1a1;
    border-left-color: white;
    border-right-color: white;
    text-align: center;
}
</style>