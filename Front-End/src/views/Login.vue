<template>
  <div
    style="width: 100%; height: 100%; padding: 30px"
    class="d-flex justify-center"
    dark
  >
    <v-form
      v-model="valid"
      :disabled="isLoading"
      @submit.prevent="submit"
      ref="form"
    >
      <h3>Log in to Smarty</h3>

      <v-alert v-show="error" dense outlined type="error">
        The email and password you entered did not match our records. Please
        double-check and try again.
      </v-alert>

      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        label="Phone, email or username"
        autocomplete="email"
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
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: (value) => !!value,
      },
      valid: false,
      isLoading: false,
      error: false,
    };
  },

  methods: {
    submit() {
      if (this.valid) {
        this.isLoading = true;
        
      }
    },
  },
};
</script>

<style scoped>
</style>



<!-- class="d-flex justify-center" -->