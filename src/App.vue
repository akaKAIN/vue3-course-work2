<template>
  <app-notification
    v-show="error"
    :text="error"
    level="danger"
  ></app-notification>
  <app-notification
    v-show="notification"
    :text="notification"
    level="primary"
  ></app-notification>
  <div
    class="container column"
    :class="{ 'no-notification': !error && !notification }"
  >
    <input-form @get-form="addInput"></input-form>
    <app-resume>
      <h3 v-if="resumeFields">Добавьте первый блок, чтобы увидеть результат</h3>
      <template v-if="form.title" #title>
        <resume-title :title="form.title"></resume-title>
      </template>

      <template v-if="form.avatar" #avatar>
        <resume-avatar :src="form.avatar"></resume-avatar>
      </template>

      <template #options>
        <resume-option
          v-for="item in form.options"
          :key="item"
          :title="item.title"
          :text="item.text"
        ></resume-option>
        <resume-option
          :title="resumeOption.title"
          :text="resumeOption.text"
        ></resume-option>
      </template>
    </app-resume>
  </div>
  <div class="container">
    <app-comments></app-comments>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { InputObject, Resume, ResumeOptionItem } from "@/models/base";
import AppResume from "@/components/AppResume.vue";
import InputForm from "@/components/InputForm.vue";
import ResumeTitle from "@/components/ResumeTitle.vue";
import ResumeAvatar from "@/components/ResumeAvatar.vue";
import ResumeOption from "@/components/ResumeOption.vue";
import AppComments from "@/components/AppComments.vue";
import ApiService from "@/services/ApiService";
import { AxiosResponse } from "axios";
import AppNotification from "@/components/AppNotification.vue";

export default defineComponent({
  components: {
    AppNotification,
    AppComments,
    ResumeOption,
    ResumeAvatar,
    ResumeTitle,
    AppResume,
    InputForm
  },
  setup() {
    const form = ref<Resume>({ title: "", avatar: "", options: [] });
    const resumeOption = ref<ResumeOptionItem>({ title: "", text: "" });
    const notification = ref<string>("");
    const error = ref<string>("");

    const hideError = () => setTimeout(() => (error.value = ""), 3000);
    const hideNotification = () =>
      setTimeout(() => (notification.value = ""), 3000);
    const showError = (text: string) => {
      error.value = text;
      hideError();
    };
    const showNotification = (text: string) => {
      notification.value = text;
      hideNotification();
    };

    const updateResume = (data: Resume) => {
      ApiService.patchResume(data);
    };

    /**
     * Добавление значений выбираемых и вводимых пользователем.
     * Если вводимые данные относятся к "опциям резюме" (subtitle || text),
     * то данные добавляются в промежуточный объект (resumeOptions).
     * Как только он заполнится, его значения добавляются в массив итоговой формы показа
     * @param inputObj {InputObject} - объект значний выбразых пользователем
     */
    const addInput = (inputObj: InputObject): void => {
      switch (inputObj.title) {
        case "avatar":
          form.value[inputObj.title] = inputObj.text;
          showNotification(inputObj.text + " was added");
          updateResume(form.value);
          break;
        case "title":
          form.value[inputObj.title] = inputObj.text;
          showNotification(inputObj.text + " was added");
          updateResume(form.value);
          break;
        case "subtitle":
          resumeOption.value.title = inputObj.text;
          break;
        case "text":
          resumeOption.value.text = inputObj.text;
          break;
        default:
          showError("Error of title key: " + inputObj.title);
      }
      if (resumeOption.value.title.length && resumeOption.value.text.length) {
        form.value.options.push(Object.assign({}, resumeOption.value));
        updateResume(form.value);
        resumeOption.value.title = "";
        resumeOption.value.text = "";
      }
    };

    const loadResume = async () => {
      const response: AxiosResponse = await ApiService.getResume();
      if (response.status === 200 && response.data !== null) {
        form.value = response.data;
        if (response.data.options === undefined) {
          form.value.options = [];
        }
      }
    };

    const resumeFields = computed(
      () =>
        !form.value.title && !form.value.avatar && !form.value.options.length
    );
    onMounted(() => loadResume());

    return {
      notification,
      error,
      form,
      resumeOption,
      resumeFields,
      addInput
    };
  }
});
</script>
