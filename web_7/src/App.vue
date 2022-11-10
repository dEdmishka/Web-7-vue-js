<template>
  <div class="post_box">
    <post-form
        @create="createPost($event)"
    />
    <post-list
        :posts="posts"
    />
  </div>
  <div class="delete-add-buttons" v-if="posts.length > 0">
    <button id="delete" type="button" name="delete"  @click="clearSelected">Delete row/s</button>
    <button id="add" type="button" name="add" @click="duplicateSelected">Duplicate row/s</button>
  </div>
</template>

<script>
import PostList from "./components/PostList.vue";
import PostForm from "./components/PostForm.vue";
import {defineComponent} from 'vue'


export default defineComponent({
  components: {
    PostList,
    PostForm,
  },
  data: () => ({
    posts: [
      {id: 1, email: "text 1", password: "text 1", name: "text 1", surname: "text 1", middlename: "text 1",
        date: "text 1", gender: "male", group: "text 1", phone: "text 1", checked: false,},
    ],
  }),
  methods: {
    createPost(post){
      this.posts.push(post);
    },
    isCompleted(post) {
      return post.checked;
    },
    inProgress(post) {
      return !this.isCompleted(post);
    },
    clearSelected() {
      this.posts = this.posts.filter(this.inProgress);
    },
    duplicateSelected() {
      this.posts.forEach(
          p => {
            if(p.checked)
              this.posts.push({
                id: p.id,
                email: p.email,
                password: p.password,
                name: p.name,
                surname: p.surname,
                middlename: p.middlename,
                date: p.date,
                group: p.group,
                gender: p.gender,
                phone: p.phone,
                checked: false,
              });
          });
    },
  },
})
</script>
