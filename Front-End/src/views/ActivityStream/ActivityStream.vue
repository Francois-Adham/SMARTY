<template>
  <v-row justify="center">
    <v-col v-if="this.ready" cols="10">
      <v-timeline dark align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="(item, i) in this.events"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          fill-dot
        >
          <v-card class="elevation-20" :color="item.color">
            <v-card-title class="title justify-center">
              {{ item.title }}
            </v-card-title>
            <v-card-text
              class="white font-weight-bold text--primary text-center"
            >
              <p>
                {{ item.due_date }}
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
    <v-col v-if="!this.ready" cols="10">
      <v-skeleton-loader v-bind="attrs" type="date-picker"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
import Client from 'api-client';

export default {
  data: () => ({
    events: [],
    ready: false,
  }),
  methods: {
    async fetchStream() {
      const stream = await Client.fetchStream();
      for (const current_event of stream.data.events) {
        if (current_event.type == 'quiz') {
          this.events.push({
            title: current_event.title,
            due_date: current_event.date,
            color: 'purple',
            icon: 'mdi-comment-question-outline',
          });
        } else {
          this.events.push({
            title: current_event.title,
            due_date: current_event.date,
            color: 'blue',
            icon: 'mdi-lead-pencil',
          });
        }
      }
      this.events.sort(function (x, y) {
        return x.due_date - y.due_date;
      });
      this.ready = true;
    },
  },
  async created() {
    this.fetchStream();
  },
};
</script>
