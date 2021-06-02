<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :dark="$store.state.dark"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="$store.state.currentUser.type != 'Student'"
        icon
        small
        class="ml-2"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

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
      <v-card-subtitle class="mt-1">{{ post.publisher }}</v-card-subtitle>
      <v-divider></v-divider><br />
      <v-card-text style="font-weight: 500; font-size: large">
        {{ post.body }}
      </v-card-text>
      <v-divider></v-divider>
      <v-list
        style="height: 300px; overflow-y: auto; overflow-x: hidden"
        :dark="$store.state.dark"
      >
        <v-subheader>COMMENTS</v-subheader>
        <v-list-item-group>
          <template v-for="(item, index) in post.comments">
            <v-list-item :key="item.title" link>
              <v-list-item-content>
                <v-list-item-title
                  style="font-size: large; font-weight: 700"
                  class="mb-3"
                  >{{ item.publisher }}</v-list-item-title
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
              v-if="index < post.comments.length - 1"
              :key="`${index}-divider`"
            />
          </template>
        </v-list-item-group>
      </v-list>
      <v-card-actions
        class="ma-5"
        style="bottom: 0; right: 0; position: absolute"
      >
        <add-comment :postId="post._id" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import addComment from './addComment.vue';

export default {
  name: 'post',
  components: {
    addComment,
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
    };
  },
  methods: {
    deleteComment() {},
  },
};
</script>
