<template>
  <div
    style="width: 100%; height: 100%; padding: 30px"
    class="d-flex justify-center"
  >
    <v-form
      v-model="valid"
      :disabled="isLoading"
      @submit.prevent="submit"
      ref="form"
    >
      <h3>Create your account</h3>

      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="Email"
        required
        autocomplete="email"
        outlined
        :loading="isLoading"
      ></v-text-field>

      <v-text-field
        v-model="username"
        :rules="[rules.username]"
        label="Username"
        required
        autocomplete="username"
        outlined
        :loading="isLoading"
      ></v-text-field>

      <v-text-field
        v-model="phone"
        :rules="[rules.phone]"
        label="Phone"
        required
        autocomplete="tel"
        outlined
        :loading="isLoading"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[rules.password]"
        type="password"
        label="Password"
        required
        autocomplete="current-password"
        outlined
        :loading="isLoading"
      ></v-text-field>

      <v-radio-group row v-model="type" :disabled="isLoading">
        <v-radio label="Student" value="Student"></v-radio>
        <v-radio label="Instructor" value="Instructor"></v-radio>
      </v-radio-group>

      <v-btn
        :disabled="!valid || isLoading"
        :ripple="false"
        style="width: 100%"
        type="submit"
      >
        Sign up
      </v-btn>
    </v-form>
  </div>
</template>

<script>
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number:
const usernameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const phoneRegex = /^01\d{9}$/;

export default {
  data() {
    return {
      email: "",
      username: "",
      phone: "",
      password: "",
      type: "Student",
      rules: {
        required: (value) => !!value || "Required.",
        //counter: (value) => value.length <= 20 || "Max 20 characters",
        username: (value) => usernameRegex.test(value) || "Invalid username",
        email: (value) => emailRegex.test(value) || "Invalid e-mail",
        password: (value) =>
          passwordRegex.test(value) ||
          "Minimum 8 characters, at least one letter and one number",
        phone: (value) => phoneRegex.test(value) || "Invalid phone number",
      },
      valid: false,
      isLoading: false,
      error: false,
    };
  },

  methods: {
    submit() {
      this.$refs.form.validate();
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