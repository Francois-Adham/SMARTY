<template>
  <v-card elevation="15" class="ma-8" :dark="this.$store.state.dark">
    <h1 class="pa-8 pb-4 font-weight-light">Change Email</h1>
    <v-alert
      class="mx-16"
      success
      v-show="message"
      dense
      outlined
      :type="messageType"
    >
      {{ message }}
    </v-alert>
    <v-form
      v-model="valid"
      :disabled="isLoading"
      @submit.prevent="submit"
      ref="form"
    >
      <v-text-field
        v-model="newEmail"
        :rules="[rules.email, rules.required]"
        required:loading="isLoading"
        class="px-16"
        label="New Email"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="confirmEmail"
        :rules="[rules.matches, rules.required]"
        required
        :loading="isLoading"
        class="px-16"
        label="Confirm Email"
        outlined
      ></v-text-field>
      <v-btn
        :disabled="!valid || isLoading"
        :ripple="false"
        style="width: 100%"
        type="submit"
      >
        Update Email
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import Client from 'api-client';
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      valid: false,
      isLoading: false,
      newEmail: '',
      confirmEmail: '',
      savedEmail: '',
      message: '',
      messageType: 'error',
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => emailRegex.test(value) || 'Invalid e-mail',
        matches: (value) => value === this.newEmail || "Email doesn't match",
      },
    };
  },

  methods: {
    submit() {
      this.savedEmail = this.newEmail;
      this.isLoading = true;
      Client.changeEmail(this.newEmail, this.$store.state.currentUser.id)
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.$refs.form.reset();
          this.message = 'Email changed';
          this.messageType = 'success';
          Client.profile(this.$store.state.currentUser.id).then((response) => {
            this.$cookies.set('user_data', response.data.data.student);
            this.$store.commit('setUser', response.data.data.student);
          });
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.$refs.form.reset();
          this.messageType = 'error';
          this.message = 'network error';
        });
    },
  },
};
</script>

<style></style>
