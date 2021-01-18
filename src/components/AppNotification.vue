<template>
  <div class="alert" :class="level">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "AppNotification",
  props: {
    text: {
      type: String
    },
    level: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
