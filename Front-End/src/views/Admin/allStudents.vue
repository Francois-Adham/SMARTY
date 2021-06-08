<template>
  <v-row justify="center">
    <v-col cols="10">
      <h1
        :class="
          this.$store.state.dark
            ? 'white--text text-center display-4 font-weight-bold site ma-10'
            : 'black--text text-center font-weight-bold display-4 site ma-10'
        "
      >
        All Students
      </h1>
      <v-list
        :color="this.$store.state.dark ? '#1F2833' : 'white'"
        class="elevation-20"
        :dark="this.$store.state.dark"
        rounded
      >
        <v-list-item-group color="primary">
          <template v-for="(item, i) in this.Students">
            <v-list-item style="justify-content: center" class="mt-2" :key="i">
              <div @click="$router.push(`/user/${item._id}`)">
                <h3 :class="$store.state.dark ? 'white--text' : 'black--text'">
                  {{ item.username }}
                </h3>
              </div>
              <v-spacer />
              <v-btn
                v-if="$store.state.currentUser.type != 'Student'"
                icon
                small
                @click="deleteUser(item._id)"
                class="ml-2"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
            <v-divider v-if="i < Students.length - 1" :key="`${i}-divider`" />
          </template>
        </v-list-item-group>
      </v-list>
      <v-snackbar
        :dark="!this.$store.state.dark"
        :light="this.$store.state.dark"
        v-model="snackbar"
      >
        Something went wrong
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import Client from 'api-client';

export default {
  name: 'allStudents',
  methods: {
    async fetchAllStudents() {
      const fetchedStudents = await Client.fetchAllStudents();

      if (fetchedStudents.status !== 200) {
        this.snackbar = true;
      } else {
        this.Students = fetchedStudents.data.data.students;
      }
    },
    async deleteUser(id) {
      const response = await Client.deleteUser(id);
      if (response.status !== 200) {
        this.snackbar = true;
      } else {
        this.Students = this.Students.filter((x) => x._id != id);
      }
    },
  },
  data() {
    return {
      Students: [],
      snackbar: false,
    };
  },
  created() {
    this.fetchAllStudents();
  },
};
</script>
