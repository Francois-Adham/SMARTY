<template>
  <v-container class="">
    <v-row justify="center">
      <v-col sm="12" md="8" lg="6">
        <v-card elevation="15" class="ma-8" :dark="this.$store.state.dark">
          <h1 class="pa-8 pb-4 font-weight-light">Profile Info</h1>
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
        <UpdatePassword />
        <UpdateEmail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import Client from 'api-client';
import UpdatePassword from './UpdatePassword.vue'
import UpdateEmail from './UpdateEmail.vue'
export default {
  data() {
    return {
      username: 'Hard Coded',
      email: 'Hardcoded@gmail.com',
      phone: '01234123412',
      type: 'Instructor',
    };
  },

  components: {
    UpdatePassword,
    UpdateEmail
  },

  methods: {},

  mounted() {},
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
  font-size: 20px;
  padding: 20px;
}
</style>

<!-- class="d-flex justify-center" -->
