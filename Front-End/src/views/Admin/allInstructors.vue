<template>
  <v-row justify="center">
    <v-col cols="10">
      <h1
        :class="
          this.$store.state.dark
            ? 'white--text text-center display-4 font-weight-bold ma-10'
            : 'black--text text-center font-weight-bold display-4 ma-10'
        "
      >
        All Instructors
      </h1>
      <v-list
        :color="this.$store.state.dark ? '#1F2833' : 'white'"
        class="elevation-20"
        :dark="this.$store.state.dark"
        rounded
      >
        <v-list-item-group color="primary">
          <template v-for="(item, i) in this.Instructors">
            <v-list-item style="justify-content: center" class="mt-2" :key="i">
              <div>
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
            <v-divider
              v-if="i < Instructors.length - 1"
              :key="`${i}-divider`"
            />
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
  name: 'allInstructors',
  methods: {
    async fetchAllInstructors() {
      const fetchedInstructors = await Client.fetchAllInstructors();
      if (fetchedInstructors.status !== 200) {
        this.snackbar = true;
      } else {
        this.Instructors = fetchedInstructors.data.data.instructors;
      }
    },
    async deleteUser(id) {
      const response = await Client.deleteUser(id);
      if (response.status !== 200) {
        this.snackbar = true;
      } else {
        this.Instructors = this.Instructors.filter((x) => x._id != id);
      }
    },
  },
  data() {
    return {
      Instructors: [],
      snackbar: false,
    };
  },
  created() {
    this.fetchAllInstructors();
  },
};
</script>
