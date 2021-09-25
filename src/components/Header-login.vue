<template>
  <div id="header" class="grid grid-cols-3">
    <div class="mx-auto"><img id="logo-prosis" src="~@/assets/prosissinfondo.png"/></div>
    <div class="mx-auto"><img id="logo-prosis" src="~@/assets/CAPUFE.png"/></div>
    <div class="mx-auto"><img id="logo-prosis" src="~@/assets/COMUNICAICONES.png"/></div>
  </div>
</template>
<script>

export default {
  name: "Header",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
#header {
  position: absolute;
  top: 0;
  width: 100%;
  /* Footer height */
  background-color: transparent;
  padding: 20px;
}

#logo-prosis{
    width: 280px;
}

</style>
