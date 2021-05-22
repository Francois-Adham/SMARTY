<template>
  <div
    style="width: 100%; height: 100%; padding: 30px"
    class="d-flex justify-center"
    dark
  >
    <v-form
      v-model="valid"
      :disabled="isLoading"
      @submit.prevent="login"
      ref="form"
    >
      <h3>Log in to Smarty</h3>

      <v-alert v-show="showError" dense outlined type="error">
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
      showError: false,
      errorMessage: '',
    };
  },

  methods: {
    async login() {
      if (this.valid) {
        this.isLoading = true;
        const ret = await Client.login(this.username, this.password);
        if (ret.status && ret.status == 201) {
          // success
          this.$router.push({ name: 'Main' });
        } else if (ret.response) {
          // server returned error
          this.isLoading = false;
          this.errorMessage =
            'The username and password you entered did not match our records. Please double-check and try again.';
          this.showError = true;
        } else {
          // network error
          this.isLoading = false;
          this.errorMessage = 'Network error';
          this.showError = true;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>



<!-- class="d-flex justify-center" -->