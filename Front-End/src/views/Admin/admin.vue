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
          <v-row class="mt-10 pa-0 justify-center">
            <v-col cols="7" class="mt-10 pa-0">
              <v-card :color="$store.state.dark ? '#1F2833' : 'white'" class="elevation-10" :dark="this.$store.state.dark">
                <v-avatar class="ml-3">
                  <v-icon large>mdi-teach</v-icon>
                </v-avatar>

                <v-card-title class="d-inline-block text-h4">
                  Instructors
                </v-card-title>

                <v-card-actions>
                  <span class="ml-5">See and manage all instructors</span>
                  <v-spacer />
                  <v-btn text @click="$router.push('/instructors')">
                    See All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-10 pa-0 justify-center">
            <v-col cols="7" class="mt-10 pa-0">
              <v-card :color="$store.state.dark ? '#1F2833' : 'white'" class="elevation-10" :dark="this.$store.state.dark">
                <v-avatar class="ml-3">
                  <v-icon large>mdi-school</v-icon>
                </v-avatar>

                <v-card-title class="d-inline-block text-h4">
                  Students
                </v-card-title>

                <v-card-actions>
                  <span class="ml-5">See and manage all students</span>
                  <v-spacer />
                  <v-btn text @click="$router.push('/students')">
                    See All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-10 pa-0 justify-center">
            <v-col cols="7" class="mt-10 pa-0">
              <v-card :color="$store.state.dark ? '#1F2833' : 'white'" class="elevation-10" :dark="this.$store.state.dark">
                <v-avatar class="ml-3">
                  <v-icon large>mdi-stack-overflow</v-icon>
                </v-avatar>

                <v-card-title class="d-inline-block text-h4">
                  Courses
                </v-card-title>

                <v-card-actions>
                  <span class="ml-5">See and manage all courses</span>
                  <v-spacer />
                  <v-btn text @click="$router.push('/courses')">
                    See All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
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
// import Client from 'api-client';

export default {
  name: 'myCourses',

  data: () => ({
    courses: [],
    enrolled: false,
    ready: false,
    enrollKey: '',
  }),
  methods: {},
  async created() {
    this.ready = true;
  },
  mounted() {
    if (this.$store.state.currentUser.type === 'Student') {
      this.$router.push('/home');
    }
  },
};
</script>
