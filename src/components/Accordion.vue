<template>
  <div class="flex justify-between bg-blue-200 container items-center flex-none p-5 rounded-lg h-16 shadow-xl mt-6 transition-opacity duration-500">
    <div class="text-black font-titulo">{{title}}</div>
    <div class="flex gap-2">
        <button class="bg-gray-100" @click="mostraracordion()"><ChevronDownIcon class="h-5 w-5 text-black"/></button>
        <button class="bg-green-500" @click="abriraccion()"><PlusSmIcon class="h-5 w-5 text-white"/></button>
    </div>
  </div>
  <div class="mt-4" :class="showModal ? 'd-block' : 'hidden'">
    <slot></slot>
  </div>
</template>

<script>
import {ref,watch} from 'vue'
import { ChevronDownIcon,PlusSmIcon } from '@heroicons/vue/solid'
export default {
    props: {
        title: String,
        showAcordion: {
            type: Boolean,
            default: false,
        },
    },
    components:{
      ChevronDownIcon,PlusSmIcon
    },
    emits:["abriracordion","abriraccion","cerrarmodal"],
    setup(props ,{ emit }){
    const showModal = ref(false);
    watch(
        () => props.showAcordion,
        (showAcordion) => {
          showModal.value = showAcordion;
        }
      );
    function mostraracordion(){
        emit("abriracordion",showModal.value)
    }
    function abriraccion(){
        emit("abriraccion",true)
    }
    function closeModal() {
        showModal.value = !showModal.value
        emit("cerrarmodal",showModal.value)
    }
    return {
      showModal,
      closeModal,
      abriraccion,
      mostraracordion
    }
  }
}
</script>

<style>

</style>