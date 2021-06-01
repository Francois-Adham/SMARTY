<template>
  <div class="root">
    <v-row justify="center">
      <v-col cols="3">
        <v-form
          v-model="valid"
          :disabled="isLoading"
          @submit.prevent="login"
          ref="form"
        >
          <v-img src="..\..\src\assets\logo.png"></v-img>

          <h2 class="text-center">Log in to Smarty</h2>

          <v-alert v-show="errorMessage" dense outlined type="error">
            {{ errorMessage }}
          </v-alert>

          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="Username"
            autocomplete="username"
            outlined
            :loading="isLoading"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            type="password"
            label="Password"
            autocomplete="current-password"
            outlined
            :loading="isLoading"
          ></v-text-field>

          <v-btn
            :disabled="!valid || isLoading"
            :ripple="false"
            style="width: 100%"
            type="submit"
          >
            Log in
          </v-btn>

          <!-- <router-link to="/reset_password">Forgot Password?</router-link> -->
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Client from 'api-client';
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        required: (value) => !!value,
      },
      valid: false,
      isLoading: false,
      errorMessage: '',
    };
  },

  methods: {
    async login() {
      if (this.valid) {
        this.isLoading = true;
        Client.login(this.username, this.password)
          .then((response) => {
            if (response.status == 201) {
              console.log(response.data.data);
              this.$store.commit('login');
              this.$router.push({ name: 'Main' });
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status == 401) {
              this.errorMessage =
                'The username and password you entered did not match our records. Please double-check and try again.';
            } else {
              this.errorMessage = 'network error';
            }
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.v-form {
  margin-inline: auto;
  max-width: 400px;
  border-radius: 8px;
  border: 1px solid #dadce0;
  padding: 40px;
  margin-top: 100px;
  background: white;
}

.root {
  background: #eeeeee;
  width: 100%;
  height: 100%;
  margin: 0px;
}
</style>



<!-- class="d-flex justify-center" -->