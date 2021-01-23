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

    const hideError = (timeout: number) =>
      setTimeout(() => (error.value = ""), timeout);
    const hideNotification = (timeout: number) =>
      setTimeout(() => (notification.value = ""), timeout);
    const showError = (text: string, timeout: number) => {
      error.value = text;
      hideError(timeout);
    };
    const showNotification = (text: string, timeout: number) => {
      notification.value = text;
      hideNotification(timeout);
    };

    // Отправка данных формы в БД с заменой значений на тукущие.
    const updateResume = (data: Resume) => {
      ApiService.patchResume(data);
    };

    // Проверка, что конечный объект массива формы еще не до конца заполнен.
    const isLastOptionFull = (): boolean => {
      if (!form.value.options.length) {
        return true;
      } else {
        const lastIdx: number = form.value.options.length - 1;
        return !!(
          form.value.options[lastIdx].title && form.value.options[lastIdx].text
        );
      }
    };

    // Обновление последнего элемента массива формы
    const updateLastOption = (inputObj: InputObject) => {
      if (inputObj.title === "subtitle") {
        form.value.options[form.value.options.length - 1].title = inputObj.text;
      } else if (inputObj.title === "text") {
        form.value.options[form.value.options.length - 1].text = inputObj.text;
      } else {
        showError(
          `Update error for ${inputObj.title} with value ${inputObj.text}`,
          4000
        );
      }
      showNotification(
        `${form.value.options[form.value.options.length - 1].title ||
          form.value.options[form.value.options.length - 1]
            .text} was added in ${inputObj.title}`,
        3000
      );
    };

    // Добавление пустого объекта {ResumeOptionItem} в список формы
    const addNewEmptyOption = () => {
      console.log("create new option");
      form.value.options.push({ title: "", text: "" });
    };

    /**
     * Добавление значений выбираемых и вводимых пользователем.
     * @param inputObj {InputObject} - объект значний выбразых пользователем
     */
    const addInput = (inputObj: InputObject) => {
      if (inputObj.title === "title" || inputObj.title === "avatar") {
        form.value[inputObj.title] = inputObj.text;
        showNotification(
          `"${form.value[inputObj.title]}" was added to ${inputObj.title}`,
          3000
        );
      } else if (inputObj.title === "subtitle" || inputObj.title === "text") {
        isLastOptionFull() && addNewEmptyOption();
        updateLastOption(inputObj);
      } else {
        showError(`Can't added ${inputObj.text} in ${inputObj.title}`, 4000);
      }
      updateResume(form.value);
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
