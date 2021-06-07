<template>
  <v-row justify="center">
    <v-col cols="10">
      <h1
        :class="
          this.$store.state.dark
            ? 'white--text text-center display-4 font-weight-bold ma-10'
            : 'black--text text-center font-weight-bold display-4 ma-10'
        "
      >
        All Courses
      </h1>
      <v-list
        :class="
          this.$store.state.dark ? 'transparent elevation-5' : 'elevation-20'
        "
        :dark="this.$store.state.dark"
        rounded
      >
        <v-list-item-group color="primary">
          <v-list-item
            style="justify-content: center"
            v-for="(item, i) in this.courses"
            :key="i"
          >
            <div @click="$router.push(`/course/${item._id}`)">
              <h3 :class="$store.state.dark ? 'white--text' : 'black--text'">
                {{ item.name }}
              </h3>
            </div>
            <v-spacer />
            <v-btn
              v-if="$store.state.currentUser.type != 'Student'"
              icon
              small
              @click="deleteCourse(item._id)"
              class="ml-2"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-snackbar
        :dark="!this.$store.state.dark"
        :light="this.$store.state.dark"
        v-model="snackbar"
      >
        Something went wrong
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import Client from 'api-client';

export default {
  name: 'allCourses',
  methods: {
    async fetchAllCourses() {
      const fetchedCourses = await Client.fetchAllCourses();
      if (fetchedCourses.status !== 200) {
        this.snackbar = true;
      } else {
        this.courses = fetchedCourses.data.data.Courses;
      }
    },
    async deleteCourse(id) {
      const response = await Client.deleteCourse(id);
      if (response.status !== 200) {
        this.snackbar = true;
      } else {
        this.courses = this.courses.filter((x) => x._id != id);
      }
    },
  },
  data() {
    return {
      courses: [],
      snackbar: false,
    };
  },
  created() {
    this.fetchAllCourses();
  },
};
</script>
