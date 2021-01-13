<template>
  <li class="list-item">
    <div>
      <p>
        <strong>{{ email }}</strong>
      </p>
      <small>{{ text }} </small>
    </div>
  </li>
</template>

<script>
export default {
  name: "AppComment",
  props: {
    email: {
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
