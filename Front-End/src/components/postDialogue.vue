<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :dark="$store.state.dark"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on">
        <v-icon>mdi-chevron-triple-up</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="display-1"> {{ post.title }} </v-card-title>
      <v-card-subtitle class="mt-1">{{ post.publisher.name }}</v-card-subtitle>
      <v-divider></v-divider><br />
      <v-card-text
        :class="$store.state.dark ? 'white--text':'blac--text'"
        style="font-weight: 500; font-size: large"
      >
        {{ post.body }}
      </v-card-text>
      <v-divider></v-divider>
      <v-list
        style="height: 90%; overflow-y: auto; overflow-x: hidden"
        :dark="$store.state.dark"
      >
        <v-subheader>COMMENTS</v-subheader>
        <v-list-item-group>
          <template v-for="(item, index) in comments">
            <v-list-item :key="item.title" link>
              <v-list-item-content>
                <v-list-item-title
                  style="font-size: large; font-weight: 700"
                  class="mb-3"
                  >{{ item.publisher.username }}</v-list-item-title
                >
                {{ item.body }}
              </v-list-item-content>
              <v-list-item-avatar
                v-if="
                  $store.state.currentUser.type != 'Student' ||
                  $store.state.currentUser.username == item.publisher
                "
              >
                <v-icon @click="deleteComment(item._id)">mdi-delete</v-icon>
              </v-list-item-avatar>
            </v-list-item>
            <v-divider
              v-if="index < comments.length - 1"
              :key="`${index}-divider`"
            />
          </template>
        </v-list-item-group>
      </v-list>
      <v-card-actions
        class="ma-5"
        style="bottom: 0; right: 0; position: absolute"
      >
        <div class="text-center">
          <v-dialog v-model="commentDialog" width="500">
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
                <v-btn color="primary" autofocus @click="addComment">
                  post
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Client from 'api-client';
// import addComment from './addComment.vue';

export default {
  name: 'post',
  components: {
    // addComment,
  },
  props: {
    post: {},
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      comments: [],
      commentDialog: false,
      text: '',
    };
  },
  methods: {
    async deleteComment(commentId) {
      const response = await Client.deleteComment(this.post._id, commentId);
      if (response.data.status != 'success') {
        alert('Something went wrong');
      } else {
        this.comments = this.comments.filter(function (comment) {
          return comment._id != commentId;
        });
      }
    },
    async addComment() {
      this.commentDialog = false;
      const response = await Client.addComment(this.post._id, this.text);
      if (response.data.status != 'success') {
        alert('Something Went Wrong');
      } else {
        this.comments.push({
          publisher: { username: this.$store.state.currentUser.username },
          body: this.text,
          _id: response.data._id,
        });
      }
    },
  },
  created() {
    this.comments = this.post.comments;
  },
};
</script>
