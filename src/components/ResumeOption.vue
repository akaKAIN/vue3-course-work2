<template>
  <h2>{{ title }}</h2>
  <p>{{ text }}</p>
</template>

<script>
export default {
  name: "ResumeOption",
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>
