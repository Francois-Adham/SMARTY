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
        :rules="[rules.email]"
        required:loading="isLoading"
        class="px-16"
        label="New Email"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="confirmEmail"
        :rules="[rules.matches]"
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
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      valid: false,
      isLoading: false,
      newEmail: '',
      confirmEmail: '',
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
        console.log(this.$refs.form.validate())
    },
  },
};
</script>

<style>
</style>