<template>
    <span class="token" :class="highlight" @click.prevent="onClick" @mouseover="$emit('hover')">
        {{ token }}
    </span>
</template>

<script>
  export default {
    props: ['token', 'highlight'],
    methods: {
      onClick() {
         console.log("select token", this.token);
      }
    }
  }
</script>

<style lang="scss">
.highlight {
  color: red;
}
</style>
