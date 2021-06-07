<template>
  <h3>logging out...</h3>
</template>

<script>
import Client from 'api-client';

export default {
  mounted() {
    Client.logout().then(() => {
      this.$cookies.remove('user_session');
      this.$cookies.remove('user_data');
      this.$store.commit('logout');
      this.$store.commit('setUser', {
        username: 'logged out',
        type: 'logged out',
        _id: 'logged out',
      });
      this.$router.push({ name: 'Login' });
    });
  },
};
</script>

<style></style>
