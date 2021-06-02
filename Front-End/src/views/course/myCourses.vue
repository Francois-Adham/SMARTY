<template>
  <v-row style="height: 100%" class="pa-0 ma-0">
    <div v-if="this.ready" class="ma-0 pa-0" style="width: 100%">
      <!--====================================================-->
      <!--=================== NOT ENROLLED ===================-->
      <!--====================================================-->
      <v-row
        v-if="!this.enrolled"
        style="min-height: 70vh"
        class="ma-0 pa-0 justify-center"
      >
        <v-col>
          <v-row class="ma-0 pa-0 justify-center">
            <v-col cols="7" class="ma-0 pa-0">
              <h1
                :class="
                  this.$store.state.dark
                    ? 'white--text text-center display-4 font-weight-bold ma-10'
                    : 'black--text text-center font-weight-bold display-4 ma-10'
                "
              >
                You are not enrolled in a course
              </h1>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0 justify-center">
            <v-col cols="3" class="ma-0 pa-0">
              <v-card :dark="this.$store.state.dark" class="mt-10">
                <v-card-text class="elevation-20">
                  <v-text-field
                    outlined
                    v-model="enrollKey"
                    label="Enrollment Key"
                    prepend-inner-icon="mdi-key"
                    :rules="[
                      (value) => !!value || 'Required.',
                      (value) =>
                        (value && value.length >= 3) || 'Min 3 characters',
                    ]"
                  >
                  </v-text-field>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn class="success" @click="enrollToCourse">Enroll</v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!--================================================-->
      <!--=================== ENROLLED ===================-->
      <!--================================================-->
      <v-row v-if="this.enrolled" justify="center" class="pa-0 ma-0">
        <v-col v-for="(course, i) in this.courses" :key="i" cols="7">
          <v-hover v-slot:default="{ hover }">
            <v-card
              @click="$router.push(`/course/${course._id}`)"
              class="mx-auto"
              flat
              :elevation="hover ? 15 : 6"
              outlined
              :dark="$store.state.dark"
              :color="$store.state.dark ? '#606060' : '#f0f0f0'"
              height="64"
            >
              <v-card-actions
                :class="
                  $store.state.dark
                    ? 'white--text text-center font-weight-bold headline'
                    : 'gray--text text-center font-weight-bold headline'
                "
              >
                <v-icon>mdi-book</v-icon>

                {{ course.name }}
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </div>

    <!--================================================-->
    <!--=================== SKELETON ===================-->
    <!--================================================-->
    <div v-if="!this.ready" style="width: 100%">
      <v-row justify="center" class="mt-5" v-for="j in 3" :key="j">
        <v-col cols="8">
          <v-skeleton-loader
            ref="skeleton"
            type="image"
            class="elevation-10"
            height="100%"
            width="100%"
            :dark="$store.state.dark"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import Client from 'api-client';

export default {
  name: 'myCourses',

  data: () => ({
    courses: [],
    enrolled: false,
    ready: false,
    enrollKey:'',
  }),
  methods: {
    async fetchCourses() {
      const response = await Client.fetchCourses();
      this.courses = response.data.Courses;
      if (this.courses.length > 0) {
        this.enrolled = true;
      }
      this.ready = true;
    },
    async enrollToCourse() {
      const response = await Client.enroll(this.enrollKey);
      if (response.data.status == 'success') {
        this.$router.go(this.$router.currentRoute)
      } else {
        alert('Something Went Wrong');
      }
    },
  },
  async created() {
    this.fetchCourses();
  },
};
</script>
