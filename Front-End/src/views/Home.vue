<template>
  <v-app id="container">
    <div id="bg"></div>
    <v-content id="content">
      <img src="../assets/logo.png" />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style>
body {
  margin: 0;
}
#container {
  background: black;
}
#bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: repeat;
  background-image: url("../assets/background.png");
  opacity: 0.1;
}
</style>
