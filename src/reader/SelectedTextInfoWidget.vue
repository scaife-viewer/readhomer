<template>
    <div class="word-info-body" v-if="word">
        <div class="norm" @click="handleNormSelect(word)">{{ word.norm }}&nbsp;</div>
        <div class="analysis">
            <span class="pos">{{ word.pos }}</span><span v-if="word.mood">.{{ mood }}</span><span v-if="word.number">.{{ number }}</span>
        </div>
        <div class="lemma">{{ word.lemma }}</div>
    </div>
</template>
<script>
export default {
  scaifeConfig: {
    displayName: 'Word Info',
    location: 'sidebar',
    singleton: true,
  },
  computed: {
    word() {
      return this.$store.state.word;
    },
    mood() {
      return `${this.word.tense}${this.word.voice}${this.word.mood}`;
    },
    number() {
      return `${this.word.person}${this.word.case}${this.word.number}${this.word.gender}`;
    },
  },
  methods: {
    handleNormSelect() {
      // console.log(word);
    },
  },
};
</script>
