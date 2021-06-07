<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <h3 class="white--text">Add new Post</h3>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          What do you think ...
        </v-card-title>

        <v-card-text class="mt-5">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            no-resize
          ></v-text-field>
          <v-textarea
            v-model="text"
            label="body"
            outlined
            no-resize
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" autofocus @click="addPost()"> post </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Client from 'api-client';
export default {
  name: 'addPost',
  data() {
    return {
      dialog: false,
      title: '',
      text: '',
    };
  },
  props: {
    courseId: String,
  },
  methods: {
    async addPost() {
      this.dialog = false;
      const response = await Client.addPost(
        this.courseId,
        this.title,
        this.text,
      );
      if (response.data.status != 'success') {
        alert('Something Went Wrong');
      }
    },
  },
};
</script>
