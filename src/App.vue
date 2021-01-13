<template>
  <div class="container column">
    <form class="card card-w30" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select id="type" v-model="title">
          <option value="title">Заголовок</option>
          <option value="subtitle">Подзаголовок</option>
          <option value="avatar">Аватар</option>
          <option value="text">Текст</option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea id="value" rows="3" v-model="text"></textarea>
      </div>

      <button class="btn primary" :disabled="!isValidText">Добавить</button>
    </form>

    <div class="card card-w70">
      <div v-if="anyFormField">
        <h1 v-show="form.title">{{ form.title }}</h1>
        <div class="avatar" v-show="form.avatar">
          <img :src="form.avatar" alt="avatar image" />
        </div>
        <h2 v-show="form.subtitle">{{ form.subtitle }}</h2>
        <p v-show="form.text">{{ form.text }}</p>
      </div>
      <h3 v-else class="center">
        Добавьте первый блок, чтобы увидеть результат
      </h3>
    </div>
  </div>

  <div class="container">
    <p>
      <button class="btn primary" @click="loadComments">Загрузить комментарии</button>
    </p>
    <app-comment-list :comments="comments">
      <app-comment
        v-for="comment in comments"
        :key="comment.id"
        :email="comment.email"
        :text="comment.body"
      ></app-comment>
    </app-comment-list>

    <div class="loader" v-if="isLoading"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { Form, Titles, Comment } from "@/models/base.model";
import AppComment from "@/Components/AppComment.vue";
import AppCommentList from "@/Components/AppCommentList.vue";

export default defineComponent({
  components: {AppCommentList, AppComment },
  setup() {
    const urlData = {
      urlComments: "https://jsonplaceholder.typicode.com/comments?_limit=42",
      urlDB: "https://vue3-work-with-db-default-rtdb.firebaseio.com/",
      nameDB: "resume",
      format: "json"
    };

    const title = ref<Titles>("title");
    const text = ref<string>("");
    const form = ref<Form>({
      title: "",
      avatar: "",
      text: "",
      subtitle: ""
    });
    const comments = ref<Comment[]>([]);
    const isLoading = ref<boolean>(false);
    const isValidText = computed(() => text.value.length > 3);
    const anyFormField = computed(() => {
      const val: Form = form.value;
      return val.avatar || val.subtitle || val.title || val.text;
    });

    const sendForm = async () => {
      if (title.value && isValidText) {
        form.value[title.value] = text.value;

        await axios.patch(
          `${urlData.urlDB}${urlData.nameDB}.${urlData.format}`,
          form.value
        );
      }
    };

    const submitForm = () => {
      if (title.value && isValidText) {
        sendForm();
      }
    };
    const getResume = async () => {
      const { data } = await axios.get(
        `${urlData.urlDB}${urlData.nameDB}.${urlData.format}`
      );
      if (data) {
        form.value = data;
      }
    };

    const loadComments = async () => {
      isLoading.value = true;
      const { data } = await axios.get(urlData.urlComments);
      console.log(data);
      isLoading.value = false;
      comments.value = data;
    };

    onMounted(() => {
      getResume();
    });

    return {
      form,
      text,
      title,
      isValidText,
      anyFormField,
      comments,
      isLoading,
      submitForm,
      loadComments
    };
  }
});
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
