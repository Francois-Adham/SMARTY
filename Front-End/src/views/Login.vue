<template>
  <v-form
    v-model="valid"
    :disabled="isLoading"
    @submit.prevent="login"
    ref="form"
  >
    <h2>Log in to Smarty</h2>

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

    <router-link to="/reset_password">Forgot Password?</router-link>
  </v-form>
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
  padding: 100px;
}
.v-form {
  margin-inline: auto;
  max-width: 400px;
}
</style>



<!-- class="d-flex justify-center" -->