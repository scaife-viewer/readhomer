<template>
  <EditableSkeleton id="app" />
</template>

<script>
import EditableSkeleton from './skeleton/EditableSkeleton.vue';

export default {
  components: {
    EditableSkeleton,
  },
};
</script>


<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700,700i&subset=greek,greek-ext,latin-ext);
  @import url(https://fonts.googleapis.com/css?family=Noto+Sans:400,700);

  html,body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .body {
    display: flex;
    justify-content: center;
  }
</style>
