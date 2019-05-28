<template>
    <span class="token" @click.prevent="onClick">
        {{ token }}
    </span>
</template>

<script>
  export default {
    props: ['token'],
    methods: {
      onClick() {
         console.log("select token", this.token);
      }
    }
  }
</script>
