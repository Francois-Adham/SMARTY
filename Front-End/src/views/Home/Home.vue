<template>
  <v-row style="width: 100%; height: 100%" class="ma-0">
    <v-col cols="12" class="col pa-0">
      <div class="bg mp-0 ma-0">
        <v-row
          align="center"
          justify="center"
          style="width: 100%; height: 100%"
        >
          <v-col class="pa-0" cols="12">
            <h1
              class="display-4 text-center white--text font-weight-bold pt-16 welcome"
            >
              WELCOME TO SMARTY
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
.welcome {
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
