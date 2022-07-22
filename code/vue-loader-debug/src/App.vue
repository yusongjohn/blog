<template>
  <div id="app">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "hello vue+webpack",
    };
  },
};
</script>

<style>
#test {
  color: aqua;
}
</style>
