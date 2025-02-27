<template>
  <v-app id="container" :style="containerStyle">
    <div id="bg" :style="bgStyle"></div>

    <!--  TOP -->
    <v-app-bar
      app
      clipped-left
      :color="this.$store.state.dark ? '#1F2833' : 'white'"
      :dark="this.$store.state.dark"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <img style="height: 50px" @click="$router.push('/login')" :src="logo" />
      <h1 class="ml-3 website" @click="$router.push('/login')">Smarty</h1>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon :dark="$store.state.dark" v-bind="attrs" v-on="on">
              <v-icon large>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-card
            :dark="this.$store.state.dark"
            :color="$store.state.dark ? '#1F2833' : 'white'"
            v-if="$store.state.currentUser.type != 'Student'"
          >
            <br />
            <v-card-text>
              <v-alert v-show="errorMessage" dense outlined type="error">
                {{ errorMessage }}
              </v-alert>
              <v-text-field
                v-model="courseName"
                outlined
                label="Course Name"
                :rules="[
                  (value) => !!value || 'Required.',
                  (value) => (value && value.length >= 3) || 'Min 3 characters',
                ]"
              >
              </v-text-field>
              <v-text-field
                v-model="courseKey"
                outlined
                label="Course Key"
                prepend-inner-icon="mdi-key"
                :rules="[
                  (value) => !!value || 'Required.',
                  (value) => (value && value.length >= 3) || 'Min 3 characters',
                ]"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn class="success" @click="addCourse">Add Course</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
          <v-card
            :dark="this.$store.state.dark"
            :color="$store.state.dark ? '#1F2833' : 'white'"
            v-if="$store.state.currentUser.type == 'Student'"
          >
            <br />
            <v-card-text>
              <v-text-field
                v-model="enrollKey"
                outlined
                label="Enrollment Key"
                prepend-inner-icon="mdi-key"
                :rules="[
                  (value) => !!value || 'Required.',
                  (value) => (value && value.length >= 3) || 'Min 3 characters',
                ]"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn class="success" @click="enrollToCourse">Enroll</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-menu
        :dark="this.$store.state.dark"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list :color="$store.state.dark ? '#1F2833' : 'white'">
          <v-list-item
            v-for="(item, index) in dropItems"
            :key="index"
            :to="item.route"
          >
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
              @change="toggleTheme"
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!--  DRAWER -->
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :dark="this.$store.state.dark"
      :color="this.$store.state.dark ? '#1F2833' : 'white'"
      clipped
      app
      class="elevation-20"
    >
      <v-list-item>
        <v-list-item-content>
          <br />
          <v-list-item-title class="title">{{
            $store.state.currentUser.username
          }}</v-list-item-title>
          <br />
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list rounded nav>
        <v-list-item
          v-for="item in drawerItemsRender"
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
import Client from 'api-client';

export default {
  name: 'Main',
  components: {},
  computed: {
    drawerItemsRender() {
      return this.drawerItems.filter((item) =>
        item.userType.includes(this.$store.state.currentUser.type),
      );
    },
    logo() {
      if (!this.$store.state.dark) {
        return require('../assets/logo_light.svg');
      } else {
        return require('../assets/logo_dark.svg');
      }
    },
  },
  data: () => ({
    dialog: false,
    enrollKey: '',
    courseKey: '',
    courseName: '',
    errorMessage: '',
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
      {
        title: 'Home',
        icon: 'mdi-home',
        route: '/home',
        userType: ['Admin', 'Student', 'Instructor'],
      },
      {
        title: 'Profile',
        icon: 'mdi-account-circle',
        route: '/profile',
        userType: ['Admin', 'Student', 'Instructor'],
      },
      {
        title: 'My Courses',
        icon: 'mdi-bookshelf',
        route: '/my-courses',
        userType: ['Student', 'Instructor'],
      },
      {
        title: 'Admin Dashboard',
        icon: 'mdi-folder',
        route: '/admin',
        userType: ['Admin'],
      },
      {
        title: 'Sign out',
        icon: 'mdi-logout',
        route: '/logout',
        userType: ['Admin', 'Student', 'Instructor'],
      },
    ],
    dropItems: [
      { title: 'Update Profile', icon: 'mdi-update', route: '/profile' },
      { title: 'Sign out', icon: 'mdi-logout', route: '/logout' },
    ],
  }),

  methods: {
    themeChanged() {
      if (this.$store.state.dark) {
        this.containerStyle['background-color'] = '#0B0C10';
        this.bgStyle[
          'background-image'
        ] = `url(${require('../assets/background.png')})`;
        this.bgStyle.opacity = 0.1;
      } else {
        this.containerStyle['background-color'] = '#fff5c4';
        this.bgStyle[
          'background-image'
        ] = `url(${require('../assets/background_light.png')})`;
        this.bgStyle.opacity = 0.2;
      }
    },
    toggleTheme() {
      this.$store.state.dark = !this.$store.state.dark;
      this.$cookies.set('dark', this.$store.state.dark);
      this.themeChanged();
    },
    async enrollToCourse() {
      const response = await Client.enroll(this.enrollKey);
      if (response.data.status == 'success') {
        this.dialog = false;
        this.$router.go('/my-courses');
      } else {
        alert('Something Went Wrong');
      }
    },

    async addCourse() {
      await Client.addCourse(this.courseName, this.courseKey)
        .then((response) => {
          if (response.status == 200) {
            this.dialog = false;
            this.$router.push(`/course/${response.data.data.Course._id}`);
            this.$router.go(this.$router.currentRoute);
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Enter unique key';
          }
        })
        .catch((err) => {
          if (err) {
            this.errorMessage = 'Enter unique key';
          }
        });
    },
  },

  created() {
    console.log('Main created');
    if (this.$cookies.isKey('user_session')) {
      if (!this.$store.loggedIn) {
        this.$store.commit('setUser', this.$cookies.get('user_data'));
        this.$store.commit('setDark', this.$cookies.get('dark') === 'true');
        this.$store.commit('login');
      }
    } else {
      this.$router.push({ name: 'Login' });
    }
  },

  mounted() {
    this.themeChanged();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Sofia');
#switch {
  margin: 20px;
}
.website {
  font-family: 'Sofia', sans-serif;
}

.v-card {
  color: '#9D8D8F';
}

#bg {
  position: absolute;
  height: 100%;
  width: 100%;
  background-repeat: repeat;
}
</style>
