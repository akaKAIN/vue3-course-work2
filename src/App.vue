<template>
  <div class="container column">
    <input-form @get-form="addInput"></input-form>
    <app-resume>
      <template v-if="form.title" #title>
        <resume-title :title="form.title"></resume-title>
      </template>

      <template v-if="form.avatar" #avatar>
        <resume-avatar :src="form.avatar"></resume-avatar>
      </template>

      <template v-if="form.options.length" #options>
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
import { defineComponent, ref, onMounted } from "vue";
import { InputObject, Resume, ResumeOptionItem } from "@/models/base";
import AppResume from "@/components/AppResume.vue";
import InputForm from "@/components/InputForm.vue";
import ResumeTitle from "@/components/ResumeTitle.vue";
import ResumeAvatar from "@/components/ResumeAvatar.vue";
import ResumeOption from "@/components/ResumeOption.vue";
import AppComments from "@/components/AppComments.vue";
import ApiService from "@/services/ApiService";
import { AxiosResponse } from "axios";

export default defineComponent({
  components: {
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
        case "title" || "avatar":
          form.value.title = inputObj.text;
          updateResume(form.value);
          break;
        case "subtitle":
          resumeOption.value.title = inputObj.text;
          break;
        case "text":
          resumeOption.value.text = inputObj.text;
          break;
        // default:
        //   throw new Error("Error switch");
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
      }
    };

    onMounted(() => loadResume());

    return { form, resumeOption, addInput, loadResume };
  }
});
</script>
