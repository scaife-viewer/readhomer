<template>
  <div class="line">
    <div class="line-ref">{{ lineRef }}</div>
    <div class="line-text">
      <template v-for="(textItem, textIndex) in text">
        <ReaderLineToken v-for="(token, tokenIndex) in textItem[3]" :token="token" @hover="() => onHover(textIndex, tokenIndex)" :key="`${textIndex}-${tokenIndex}`" />
        {{ ' ' }}
        <p v-if="textItem[2] === 'new'" :key="`${textIndex}`" />
      </template>
    </div>
  </div>
</template>
<script>
  import ReaderLineToken from './ReaderLineToken.vue';
  import { HOVER_TOKEN } from '../../homer/constants';

  export default {
    components: { ReaderLineToken },
    props: ['lineRef', 'text', 'side'],
    computed: {
      highlight() {
        if (this.side && this.lineRef === this.$store.state.homer.citation) {
          const [textIndex, tokenIndex] = this.$store.state.homer.tokenIndex.split(' ');

        }
      }
    },
    methods: {
      onHover(textIndex, tokenIndex) {
        if (this.side) {
          this.$store.dispatch(`homer/${HOVER_TOKEN}`, {
            citation: this.lineRef,
            tokenIndex: `${textIndex} ${tokenIndex}`,
            side: this.side
          });
        }
      }
    }
  };
</script>
