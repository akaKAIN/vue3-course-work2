<template>
  <div class="avatar">
    <img :src="src" alt="avatar" />
  </div>
</template>

<script>
export default {
  name: "ResumeAvatar",
  props: {
    src: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
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
