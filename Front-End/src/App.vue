<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Smarty' || from.mete.title;
    },
  },
};
</script>
