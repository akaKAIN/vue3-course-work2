<template>
  <div class="card card-w70">
    <slot name="title"></slot>
    <slot name="avatar"></slot>
    <slot name="options"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppResume"
};
</script>
