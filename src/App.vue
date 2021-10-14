<template>
  <router-view/>
  <notifications :width="500" class="mt-20"/>
</template>
<style global>
input:focus{
  outline: 0  !important;
}
button:focus{
  outline: 0  !important;
}
</style>