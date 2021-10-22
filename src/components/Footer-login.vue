<template>
<footer id="footer">
  <div id="left">© 2021 Proyectos y Sistemas Informaticos.</div>
  <div id="right">Version 1.0.0</div>
</footer>
</template>
<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>
<style scoped>
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* Footer height */
  background-color: #2c5282;
  padding: 10px;
}

#left {
  float: left;
  color: white;
  font-size: 15px;
}

#right {
  float: right;
  color: white;
  font-size: 15px;
}
</style>
