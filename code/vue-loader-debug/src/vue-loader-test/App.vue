<template>
  <div id="app">
    {{ msg }}
  </div>
</template>

<script>
// import {cLog} from  './c';
// cLog()

export default {
  name: "App  ",
  data() {
    return {
      msg: "hello vue+webpack",
    };
  },
  mounted(){
    import('./a').then(aModule=>{
      console.log(aModule)
    });

    import('./c').then(aModule=>{
      console.log(aModule)
    });
  }
};
</script>

<style>
#test {
  color: aqua;
}
</style>
