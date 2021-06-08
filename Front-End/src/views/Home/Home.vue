<template>
  <v-row align="center" justify="center" style="width: 100%; height: 100%">
    <v-col class="pa-10 text-center" cols="10">
      <h1
        :class="$store.state.dark ? 'white--text' : 'grey--text text--darken-3'"
        style="font-family: 'Sofia', sans-serif; font-size: 14vh"
      >
        Smarty
      </h1>
      <v-img :src="logo" class="logo" style="width: 65vh" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    logo() {
      if (this.$store.state.dark) {
        return require('../../assets/logo_dark.svg');
      } else {
        return require('../../assets/logo_light.svg');
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sofia');

.welcome {
}
.col {
  min-height: 100%;
}

.logo {
  margin: auto;
  align-self: center;
  align-content: center;
}
</style>
