<template>
  <v-row
    v-if="!this.enrolled"
    style="min-height: 70vh"
    class="ma-0 pa-0 justify-center"
  >
    <v-col cols="10" class="ma-0 pa-0">
      <h1
        :class="
          this.$store.state.dark
            ? 'white--text display-4 font-weight-bold ma-10'
            : 'darkblue--text font-weight-bold display-4 ma-10'
        "
      >
        You must be enrolled
      </h1>
    </v-col>
    <v-col cols="10" class="ma-0 pa-0" md="3">
      <v-card color="#1F2833" :dark="this.$store.state.dark" class="mt-10">
        <v-card-text class="elevation-20">
          <v-text-field
            v-model="key"
            outlined
            label="Enrollment Key"
            prepend-inner-icon="mdi-key"
            :rules="[
              (value) => !!value || 'Required.',
              (value) => (value && value.length >= 3) || 'Min 3 characters',
            ]"
          >
          </v-text-field>
          <v-btn class="success" @click="enrollToCourse">Enroll</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Client from 'api-client';
export default {
  name: 'notEnrolled',
  props: {
    enrolled: Boolean,
  },
  data: () => ({
    key: '',
  }),
  methods: {
    async enrollToCourse() {
      const response = await Client.enroll(this.key);
      if (response.data.status == 'success') {
        this.fetchCourseByID();
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>
