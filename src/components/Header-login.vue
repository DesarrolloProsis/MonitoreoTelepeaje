<template>
  <div id="header"><img id="logo-prosis" src="~@/assets/Login/LogoProsis.png"/></div>
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
  padding: 10px;
}

#logo-prosis{
    width: 180px;
}

</style>
