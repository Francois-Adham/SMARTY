<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-timeline
        :dark="this.$store.state.dark"
        align-top
        :dense="$vuetify.breakpoint.smAndDown"
      >
        <v-timeline-item
          v-for="(item, i) in events"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          fill-dot
        >
          <v-card :color="item.color">
            <v-card-title class="title"> Lorem Ipsum Dolor </v-card-title>
            <v-card-text class="white text--primary">
              <p>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>

      <v-row class="mt-5">
        <v-spacer></v-spacer>
        <v-btn> View More </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    events: [
      {
        color: 'red lighten-2',
        icon: 'mdi-star',
      },
      {
        color: 'purple darken-1',
        icon: 'mdi-book-variant',
      },
      {
        color: 'green lighten-1',
        icon: 'mdi-airballoon',
      },
      {
        color: 'indigo',
        icon: 'mdi-buffer',
      },
    ],
  }),
};
</script>
