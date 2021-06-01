<template>
  <div class="root">
    <v-row justify="center">
      <v-col cols="3">
        <v-form
        class="text-center"
          v-model="valid"
          :disabled="isLoading"
          @submit.prevent="submit"
          ref="form"
        >
          <h3 class="text-center">Create your account</h3>

          <v-alert v-show="errorMessage" dense outlined type="error">
            {{ errorMessage }}
          </v-alert>

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
          
          <div class="rl">
            <router-link to="/login">Log in instead</router-link>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number:
const usernameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const phoneRegex = /^01\d{9}$/;

import Client from 'api-client';

export default {
  data() {
    return {
      email: '',
      username: '',
      phone: '',
      password: '',
      type: 'Student',
      rules: {
        required: (value) => !!value || 'Required.',
        //counter: (value) => value.length <= 20 || "Max 20 characters",
        username: (value) => usernameRegex.test(value) || 'Invalid username',
        email: (value) => emailRegex.test(value) || 'Invalid e-mail',
        password: (value) =>
          passwordRegex.test(value) ||
          'Minimum 8 characters, at least one letter and one number',
        phone: (value) => phoneRegex.test(value) || 'Invalid phone number',
      },
      valid: false,
      isLoading: false,
      errorMessage: '',
    };
  },

  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.isLoading = true;
        Client.signup(
          this.username,
          this.password,
          this.email,
          this.type,
          this.phone,
        )
          .then((response) => {
            if (response.status == 201) {
              this.$store.commit('login');
              this.$router.push({ name: 'Login' });
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status == 400) {
              this.errorMessage = 'Username already exists';
            } else {
              this.errorMessage = 'Network error';
            }
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped>
h3 {
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

.rl {
  margin-top: 30px;
}
</style>



<!-- class="d-flex justify-center" -->