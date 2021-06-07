<template>
  <v-container fluid class="fill-height grey lighten-3">
    <v-row justify="center">
      <v-col sm="12" md="6" lg="3">
        <v-form
          class="text-center"
          v-model="valid"
          :disabled="isLoading"
          @submit.prevent="login"
          ref="form"
        >
          <v-img src="../../assets/logo.png"></v-img>

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

          <div class="rl">
            <router-link to="/signup">Sign up for Smarty</router-link>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
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
    login() {
      if (this.valid) {
        this.isLoading = true;
        Client.login(this.username, this.password)
          .then((response) => {
            if (response.status == 201) {
              this.$cookies.set('user_session', response.data.data.sessionID);
              this.$cookies.set('user_data', response.data.data.user);
              this.$store.commit('setUser', response.data.data.user);
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

  mounted() {
    if (this.$cookies.isKey('user_session')) {
      this.$store.commit('setUser', this.$cookies.get('user_data'));
      this.$store.commit('login');
      this.$router.push({ name: 'Main' });
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.v-form {
  margin-inline: auto;
  border-radius: 8px;
  border: 2px solid #dadce0;
  padding: 40px;
  background: white;
}

.v-container {
  background:black;
}

.rl {
  margin-top: 30px;
}
</style>
