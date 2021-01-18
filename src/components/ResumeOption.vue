<template>
  <h2 v-show="title">{{ title }}</h2>
  <p v-show="text">{{ text }}</p>
</template>

<script>
export default {
  name: "ResumeOption",
  props: {
    title: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
