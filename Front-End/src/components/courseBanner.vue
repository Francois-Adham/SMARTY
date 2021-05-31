<template>
  <v-row style="width: 100%; max-height: 30vh; min-height: 30vh" class="ma-0">
    <v-col cols="12" class="col pa-0">
      <div class="bg mp-0 ma-0" :style="`background-image: url(${image})`">
        <v-row
          align="center"
          justify="center"
          style="width: 100%; height: 100%"
        >
          <v-col class="pa-0" cols="12">
            <h1
              class="display-4 text-center white--text font-weight-bold pt-16"
            >
              {{ name }}
            </h1>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    name: String,
    image: String,
  },
};
</script>

<style scoped>
.col {
  min-height: 100%;
}
.bg {
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  background-size: cover;
}
</style>
