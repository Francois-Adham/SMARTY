<template>
  <v-row style="width: 100%; height: 100%" class="ma-0">
    <v-col cols="12" class="col pa-0">
      <div class="bg mp-0 ma-0">
        <v-row align="start" justify="start" style="width: 100%; height: 100%">
          <v-col class="pa-10" cols="10">
            <h1 class="welcome">
              Welcome {{ this.$store.state.currentUser.username }} To Smarty
            </h1>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sofia');

.welcome {
  color: #ffcd57;
  font-family: 'Sofia', sans-serif;
  font-size: 10vh;
}
.col {
  min-height: 100%;
}
.bg {
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  background-image: url('../../assets/home.jpg');
  background-size: cover;
}
</style>
