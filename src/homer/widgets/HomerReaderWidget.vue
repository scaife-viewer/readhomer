<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <Reader :passage-text="text" />
  </div>
</template>

<script>
import api from '../api';

import Reader from '../../reader/components/Reader.vue';
import ReferenceInput from '../components/ReferenceInput.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Reader',
    location: 'both',
  },
  components: {
    Reader,
    ReferenceInput,
  },
  methods: {
    onReadFromStore(lookupFromStore) {
      this.lookupFromStore = lookupFromStore;
    },
    onLookup(urn, reference) {
      this.reference = reference;
      api.fetchEnglishAlignment(urn, this.reference).then((data) => {
        this.passageText = data;
      });
    },
  },
  data() {
    return {
      reference: '',
      lookupFromStore: false,
      passageText: '',
    };
  },
  computed: {
    text() {
      return this.lookupFromStore ? this.$store.state.homer.passageText : this.passageText;
    },
  },
};
</script>

<style lang="scss">
.select-passage-reader {
  width: 100%;
}
</style>
