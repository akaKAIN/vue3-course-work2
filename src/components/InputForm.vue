<template>
  <form class="card card-w30" @submit.prevent="returnForm">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="title">
        <option
          v-for="titleKey in Object.keys(titles)"
          :value="titleKey"
          :key="titleKey"
        >
          {{ titles[titleKey] }}
        </option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model="text"></textarea>
    </div>

    <button class="btn primary" :disabled="isDisabled">
      Добавить
    </button>
  </form>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { ResumeForm, Title } from "@/models/base";
export default {
  name: "InputForm",
  emits: ["get-form"],
  setup(props: {}, { emit }: { emit: any }) {
    const titles: ResumeForm = {
      title: "Заголовок",
      subtitle: "Подзаголовок",
      avatar: "Аватар",
      text: "Текст"
    };
    const title = ref<Title>("title");
    const text = ref<string>("");

    const isDisabled = computed(() => text.value.length < 4);
    const resetForm = () => (text.value = "");
    const returnForm = () =>
      !isDisabled.value &&
      emit("get-form", { title: title.value, text: text.value });

    return { titles, title, text, isDisabled, resetForm, returnForm };
  }
};
</script>
