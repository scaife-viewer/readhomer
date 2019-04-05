<template>
  <Reader :passage-text="passageText" />
</template>

<script>
import Reader from './Reader.vue';

export default {
  scaifeConfig: {
    displayName: 'Reader',
    location: 'main',
  },
  components: {
    Reader,
  },
  computed: {
    passageText() {
      return this.$store.state.passageText;
    },
  },
};
</script>
