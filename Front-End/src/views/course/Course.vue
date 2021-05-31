<template>
  <v-row style="height: 100%" class="pa-0 ma-0">
    <!-- ====================================================== -->
    <!-- ==================== Course Cover ==================== -->
    <!-- ====================================================== -->
    <div v-if="this.ready" class="ma-0 pa-0" style="width: 100%">
      <Banner :image="this.course.img" :name="this.course.name" />
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
            You must be enrolled in this course to see its content
          </h1>
        </v-col>
        <v-col cols="3" class="ma-0 pa-0">
          <v-card :dark="this.$store.state.dark" class="mt-10">
            <v-card-text class="elevation-20">
              <v-text-field
                outlined
                label="Enrollment Key"
                prepend-inner-icon="mdi-key"
                :rules="[
                  (value) => !!value || 'Required.',
                  (value) => (value && value.length >= 3) || 'Min 3 characters',
                ]"
              >
              </v-text-field>
              <v-btn class="success">Enroll</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="this.enrolled" style="min-height: 70vh" class="pa-0 ma-0">
        <!-- ======================================================== -->
        <!-- ==================== Course Content ==================== -->
        <!-- ======================================================== -->
        <v-col xs="12">
          <!-- tabs -->
          <v-tabs
            v-model="tab"
            grow
            class="tabs mt-5 elevation-20"
            centered
            :dark="this.$store.state.dark"
          >
            <v-tab v-for="tab in tabs" :key="tab.name" :color="tab.color">
              <v-icon left>{{ tab.icon }}</v-icon>
              {{ tab.name }}
            </v-tab>
          </v-tabs>
          <!-- tabs content -->
          <v-tabs-items v-model="tab" class="transparent">
            <v-tab-item>
              <v-list
                :class="
                  this.$store.state.dark
                    ? 'transparent elevation-20'
                    : 'elevation-20'
                "
                :dark="this.$store.state.dark"
                rounded
              >
                <v-list-item-group color="primary">
                  <v-list-item
                    style="justify-content: center"
                    v-for="(item, i) in this.content"
                    :key="i"
                  >
                    <v-icon>{{
                      item.type == 'file' ? 'mdi-file' : 'mdi-video'
                    }}</v-icon>
                    <a :href='"http://localhost:3000/api/v1/courses/"+course._id+"/downloads/"+item._id'>{{ item.body }}</a>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
            <v-tab-item>
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
            </v-tab-item>
            <v-tab-item> </v-tab-item>
          </v-tabs-items>
        </v-col>

        <!-- ===================================================== -->
        <!-- ==================== Other Users ==================== -->
        <!-- ===================================================== -->
        <v-col sm="3">
          <!-- UNENROLL -->
          <v-card
            v-if="$store.state.currentUser.type == 'Student'"
            :dark="this.$store.state.dark"
            class="mt-5"
          >
            <v-card-text class="elevation-20">
              <v-card-text>
                <v-row justify="center">
                  <h2>Unenroll me from {{ course.name }}</h2>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="unenroll()" class="error">Unenroll</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card-text>
          </v-card>
          <!-- UPLOAD -->
          <v-card
            v-if="$store.state.currentUser.type == 'Instructor'"
            :dark="this.$store.state.dark"
            class="mt-5"
          >
            <v-card-text class="elevation-20">
              <v-card-text>
                <v-row justify="center">
                  <h2>Upload files to {{ course.name }}</h2>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />

                <v-spacer />
              </v-card-actions>
            </v-card-text>
          </v-card>
          <!-- Instructors-->
          <v-data-table
            :dark="this.$store.state.dark"
            :headers="intructor_headers"
            :items="this.course.instructors"
            class="mt-5 elevation-20"
            hide-default-footer
            fixed-header
            max-height="30vh"
            disable-pagination
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-icon>mdi-account-circle</v-icon>
              {{ item.name }}
            </template>
          </v-data-table>

          <!-- Students-->
          <v-data-table
            :dark="this.$store.state.dark"
            :headers="student_headers"
            :items="this.course.students"
            class="mt-5 elevation-20"
            hide-default-footer
            height="30vh"
            disable-pagination
          >
            <template v-slot:[`item.name`]="{ item }">
              <v-icon>mdi-account-circle</v-icon>
              {{ item.name }}
            </template>
          </v-data-table>
        </v-col>
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
      </v-row>
    </div>

    <!-- ==================================================== -->
    <!-- ==================== SEKELETONS ==================== -->
    <!-- ==================================================== -->
    <div v-if="!this.ready" class="ma-0 pa-0" style="width: 100%">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader
            class="ma-5"
            :dark="this.$store.state.dark"
            type="image"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs="12">
          <v-skeleton-loader
            class="ml-5"
            :dark="this.$store.state.dark"
            type="list-item, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
        <v-col sm="3">
          <v-skeleton-loader
            style="width: 100%"
            :dark="this.$store.state.dark"
            type="list-item, list-item-three-line"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mt-5"
            :dark="this.$store.state.dark"
            type="list-item, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </v-row>
</template>

<script>
import Client from 'api-client';
import Banner from '../../components/courseBanner.vue';

export default {
  name: 'Course',
  components: {
    Banner,
  },

  data: () => ({
    tab: null,
    snackbar: false,
    tabs: [
      {
        name: 'Content',
        icon: 'mdi-book-variant',
      },
      {
        name: 'upcoming',
        icon: 'mdi-access-point',
      },
      {
        name: 'discussion',
        icon: 'mdi-chat',
      },
    ],
    intructor_headers: [
      {
        text: 'Intructors',
        align: 'center',
        value: 'name',
        sortable: false,
      },
    ],
    student_headers: [
      {
        text: 'Other Students',
        align: 'center',
        value: 'name',
        sortable: false,
      },
    ],
    course: {},
    events: [],
    content: [],
    posts: [],
    enrolled: false,
    ready: false,
    imgs: [
      'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg',
      'https://gstatic.com/classroom/themes/img_read.jpg',
      'https://gstatic.com/classroom/themes/img_bookclub.jpg',
      'https://gstatic.com/classroom/themes/img_code.jpg',
      'https://gstatic.com/classroom/themes/img_backtoschool.jpg',
      'https://gstatic.com/classroom/themes/img_learnlanguage.jpg',
      'https://gstatic.com/classroom/themes/Economics.jpg',
      'https://gstatic.com/classroom/themes/Geography.jpg',
    ],
  }),
  methods: {
    async fetchCourseByID() {
      const current_course = await Client.fetchCourse(this.$route.params.id);
      this.course = current_course.data.course;
      this.course['img'] = this.imgs[
        Math.floor(Math.random() * this.imgs.length)
      ].split("'")[0];
      // console.log(this.course.img);

      this.enrolled = current_course.isEnrolled;

      for (const current_post of this.course.posts) {
        if (current_post.type == 'Announcement') {
          this.posts.push(current_post);
        } else {
          this.content.push(current_post);
        }
      }

      for (const current_event of this.course.events) {
        if (current_event.type == 'quiz') {
          this.events.push({
            title: current_event.title,
            due_date: current_event.due_date,
            color: 'purple',
            icon: 'mdi-comment-question-outline',
          });
        } else {
          this.events.push({
            title: current_event.title,
            due_date: current_event.due_date,
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

    async unenroll() {
      console.log(this.$store.state.dark);
      const response = await Client.unenroll(this.course.id);
      if (response.status == 'success') {
        this.$router.push('/courses');
      } else {
        this.snackbar = true;
      }
    },
  },
  async created() {
    this.fetchCourseByID();
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
