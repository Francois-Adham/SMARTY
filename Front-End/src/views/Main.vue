<template>
  <v-app id="container" :style="containerStyle">
    <div id="bg" :style="bgStyle"></div>

    <!--  TOP -->
    <v-app-bar app clipped-left :dark="this.$store.state.dark">
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>SMARTY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        :dark="this.$store.state.dark"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            <span>Join class</span>
          </v-tooltip>
        </template>
        <v-card :dark="this.$store.state.dark">
          <v-card-text class="elevation-20">
            <v-text-field
              outlined
              label="Class code"
              prepend-inner-icon="mdi-key"
              :rules="[
                (value) => !!value || 'Required.',
                (value) => (value && value.length >= 3) || 'Min 3 characters',
              ]"
            >
            </v-text-field>
            <v-btn class="success">Join</v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-menu
        :dark="this.$store.state.dark"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in dropItems" :key="index">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-switch
              id="switch"
              label="Dark"
              :value="this.$store.state.dark"
              @change="themeChanged"
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!--  DRAWER -->
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :dark="this.$store.state.dark"
      clipped
      app
      class="elevation-20"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Student</v-list-item-title>
          <v-list-item-subtitle>ID</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list rounded nav>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--  MAIN -->
    <v-main id="content">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Main',
  components: {},

  data: () => ({
    primaryDrawer: {
      model: null,
      clipped: true,
    },
    containerStyle: {
      'background-color': 'black',
    },
    bgStyle: {
      'background-image': `url(${require('../assets/background.png')})`,
      opacity: 0.1,
    },
    drawerItems: [
      { title: 'Home', icon: 'mdi-home', route: '/' },
      { title: 'Activity Stream', icon: 'mdi-view-stream', route: '/stream' },
      { title: 'My Courses', icon: 'mdi-bookshelf', route: '/courses' },
      { title: 'Grades & Reports', icon: 'mdi-folder', route: '/reports' },
      // TODO handle signout
      { title: 'Sign out', icon: 'mdi-logout', route: '/landing' },
    ],
    dropItems: [
      { title: 'Update Profile', icon: 'mdi-update' },
      { title: 'Sign out', icon: 'mdi-logout' },
    ],
  }),

  methods: {
    themeChanged() {
      this.$store.state.dark = !this.$store.state.dark;
      if (this.$store.state.dark) {
        this.containerStyle['background-color'] = 'black';
        this.bgStyle[
          'background-image'
        ] = `url(${require('../assets/background.png')})`;
        this.bgStyle.opacity = 0.1;
      } else {
        this.containerStyle['background-color'] = 'white';
        this.bgStyle[
          'background-image'
        ] = `url(${require('../assets/background_light.png')})`;
        this.bgStyle.opacity = 0.4;
      }
    },
  },

  mounted() {
    this.themeChanged();
    if (!this.$store.state.loggedIn) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>

<style>
#switch {
  margin: 20px;
}
#bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: repeat;
}
</style>
