<template>
  <div class="card card-w70">
    <slot name="title"></slot>
    <slot name="avatar"></slot>
    <slot name="options"></slot>
    <h3 v-if="empty">Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "AppResume",
  setup(props, { slots }) {
    const empty = ref(true);
    onMounted(() => {
      empty.value = Object.keys(slots).length - 1 === 0;
    });

    return { empty };
  }
};
</script>
