<template>
  <v-container class="">
    <v-row justify="center">
      <v-col sm="12" md="8" lg="6">
        <v-card elevation="15" class="ma-8" :dark="this.$store.state.dark">
          <h1 class="pa-8 pb-4 font-weight-light">{{ username }}'s Profile</h1>
          <v-simple-table class="pa-4 pt-0">
            <tbody>
              <tr>
                <td class="font-weight-light text-subtitle-1">Username</td>
                <td class="text-subtitle-1">{{ username }}</td>
              </tr>
              <tr>
                <td class="font-weight-light text-subtitle-1">Account type</td>
                <td class="text-subtitle-1">{{ type }}</td>
              </tr>
              <tr>
                <td class="font-weight-light text-subtitle-1">Phone Number</td>
                <td class="text-subtitle-1">{{ phone }}</td>
              </tr>
              <tr>
                <td class="font-weight-light text-subtitle-1">Email</td>
                <td class="text-subtitle-1">{{ email }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
        <v-card elevation="15" class="ma-8" :dark="this.$store.state.dark">
          <h1 class="pa-8 pb-4 font-weight-light">Enrolled courses</h1>
          <v-simple-table class="pa-4 pt-0">
            <tbody v-if="courses.length">
              <tr v-for="course in courses" :key="course">
                <td class="text-subtitle-1">{{ course }}</td>
              </tr>
            </tbody>
            <h2 v-else class="pa-8 pb-4 font-weight-light">Not enrolled in any courses</h2>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import Client from 'api-client';

export default {
  data() {
    return {
      username: '',
      type: '',
      phone: '',
      email: '',
      courses: [],
    };
  },

  methods: {},

  mounted() {
    Client.profile(this.$route.params.id).then((response) => {
      console.log(response.data.data.student.courses);
      this.username = response.data.data.student.username;
      this.type = response.data.data.student.type;
      this.phone = response.data.data.student.phone;
      this.email = response.data.data.student.email;
      response.data.data.student.courses.forEach(courseID => {
          Client.fetchCourse(courseID).then((response)=>{
              this.courses.push(response.data.course.name)
          })
      });
    });
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
</style>