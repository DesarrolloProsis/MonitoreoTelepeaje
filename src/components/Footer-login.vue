<template>
<footer id="footer">
  <div id="left">© {{  moment(year).format("YYYY") }} Proyectos y Sistemas Informaticos.</div>
  <div id="right">Version 1.0.0</div>
</footer>
</template>
<script>
import moment from 'moment'
import { ref } from 'vue'
export default {
  name: "Footer",
  props: {
    msg: String,
  },
  created: function () {
    this.moment = moment;
  },
  setup(){
    const year = ref(new Date)
    return { year }
  }
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
