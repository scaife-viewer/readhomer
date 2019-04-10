<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <Reader :passage-text="text" />
  </div>
</template>

<script>
import axios from 'axios';

import Reader from '../reader/Reader.vue';
import ReferenceInput from '../reader/ReferenceInput.vue';

const URN = 'urn:cts:greekLit:tlg0012.tlg001.perseus-grc2';

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
    onLookup(reference) {
      this.reference = reference;
      axios
        .get(`https://homer-api.herokuapp.com/${URN}:${this.reference}/`)
        .then((r) => { this.passageText = r.data; });
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
      return this.lookupFromStore ? this.$store.state.passageText : this.passageText;
    },
  },
};
</script>

<style lang="scss">
.select-passage-reader {
  width: 100%;
}
</style>

