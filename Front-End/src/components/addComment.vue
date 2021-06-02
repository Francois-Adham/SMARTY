<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="elevation-20"
          fab
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          What do you think ...
        </v-card-title>

        <v-card-text class="mt-5">
          <v-textarea
            v-model="text"
            label="Comment"
            outlined
            no-resize
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" autofocus @click="addComment"> post </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Client from 'api-client';

export default {
  name: 'addComment',
  data() {
    return {
      dialog: false,
      text: '',
    };
  },
  props: {
    postId: String,
  },
  methods: {
    async addComment() {
      this.dialog = false;
      const response = await Client.addComment(this.postId, this.text);
      if (response.data.status != 'success') {
        alert('Something Went Wrong');
      }
    },
  },
};
</script>
