<template>
  <div class="select-passage-reader">
    <HomerSource v-model="passageText" />
    <Reader :passage-text="passageText" />
  </div>
</template>

<script>
import HomerSource from './HomerSource.vue';
import Reader from '../reader/Reader.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Reader',
    location: 'both',
  },
  components: {
    HomerSource,
    Reader,
  },
  data() {
    return {
      passageText: '',
    };
  },
};
</script>
