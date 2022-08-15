<template>
    <teleport to="body">
      <div v-if="showModal" ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
        <div class="flex items-center justify-center min-h-screen text-center">
          <div
              class="w-1/2 bg-white rounded-lg text-left shadow-xl"
              role="dialog"
              ref="modal"
              aria-modal="true"
              aria-labelledby="modal-headline"
          >
          <button class="w-full flex flex-row-reverse p-3 h-4" @click="closeModal()">
                X
          </button>
            <slot>
              
            </slot>
          </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from 'vue';
const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: 'Modal',
  emits:["cerrarmodal"],
  props,
  setup(props ,{ emit }){
    const showModal = ref(false);
    watch(
        () => props.show,
        (show) => {
          showModal.value = show;
        }
      );
    function closeModal() {
        showModal.value = !showModal.value;
        emit("cerrarmodal",showModal.value)
    }
    return {
      showModal,
      closeModal
    }
  }
}
</script>
