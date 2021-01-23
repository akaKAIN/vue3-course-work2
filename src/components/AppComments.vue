<template>
  <div class="comments-wrapper">
    <p>
      <button class="btn primary" @click="loadComments">
        Загрузить комментарии
      </button>
    </p>
    <div class="card">
      <h2>Комментарии</h2>
      <ul class="list" v-if="comments.length">
        <li class="list-item" v-for="comment in comments" :key="comment.id">
          <div>
            <p>
              <strong>{{ comment.email }}</strong>
            </p>
            <small>{{ comment.body }}</small>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="loader" v-if="loading"></div>
</template>

<script lang="ts">
import { ref } from "vue";
import ApiService from "../services/ApiService";
import { AxiosResponse } from "axios";
import { Comment } from "@/models/base";
export default {
  name: "AppComments",
  setup() {
    const loading = ref<boolean>(false);
    const comments = ref<Comment[]>([]);

    const loadComments = async () => {
      loading.value = true;
      const { data }: AxiosResponse<Comment[]> = await ApiService.getComments();
      comments.value = data;
      loading.value = false;
    };

    return { loading, comments, loadComments };
  }
};
</script>
