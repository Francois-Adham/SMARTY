<template>
  <v-card elevation="15" class="ma-8" :dark="this.$store.state.dark">
    <h1 class="pa-8 pb-4 font-weight-light">Change Password</h1>
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
        v-model="currentPassword"
        :rules="[rules.required]"
        type="password"
        class="px-16"
        required
        :loading="isLoading"
        label="Current Password"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="newPassword"
        :rules="[rules.password]"
        type="password"
        required
        :loading="isLoading"
        class="px-16"
        label="New Password"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :rules="[rules.matches]"
        required
        :loading="isLoading"
        type="password"
        class="px-16"
        label="Confirm Password"
        outlined
      ></v-text-field>
      <v-btn
        :disabled="!valid || isLoading"
        :ripple="false"
        style="width: 100%"
        type="submit"
      >
        Update Password
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number:

export default {
  data() {
    return {
      valid: false,
      isLoading: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      message: '',
      messageType: 'error',
      rules: {
        required: (value) => !!value || 'Required.',
        password: (value) =>
          passwordRegex.test(value) ||
          'Minimum 8 characters, at least one letter and one number',
        matches: (value) => value === this.newPassword || "Password doesn't match"
      },
    };
  },

  methods: {
    submit() {},
  },
};
</script>

<style>
</style>