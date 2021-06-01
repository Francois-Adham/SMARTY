<script>
import Client from 'api-client';

export default {
  mounted() {
    Client.logout().then(() => {
      this.$cookies.remove('user_session');
      this.$store.commit('logout');
      this.$router.push({ name: 'Login' });
    });
  },
};
</script>

<style>
</style>