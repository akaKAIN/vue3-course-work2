<template>
  <div class="card" v-if="comments.length">
    <h2>Комментарии</h2>
    <ul class="list">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { Comment } from "../models/base.model";
export default {
  name: "AppCommentList",
  props: {
    comments: {
      type: Array<Comment>,
      default:
    }
  }
};
</script>

