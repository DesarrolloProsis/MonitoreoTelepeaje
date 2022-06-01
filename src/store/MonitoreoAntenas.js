import { defineStore} from 'pinia' 


export const MonitoreoAntenasStore = defineStore('MonitoreoAntena', {
    state:() => ({
        eventosMonitoreAntena: []
    }),
    getters: {
        getEventAntenaConcurrent(state) {
            return state.eventosMonitoreAntena
        }
    },
    actions: {
        addEventAntenaConcurrent(event) {
            this.eventosMonitoreAntena.push(event)
        },
        deleteEventAntenaConcurrent(){
            this.eventosMonitoreAntena.pop()
        }
    }
})