<template>
  <div class="line">
    <div class="line-ref">{{ lineRef }}</div>
    <div class="line-text">
      <template v-for="(textItem, textIndex) in text">
        <ReaderLineToken
          v-for="(token, tokenIndex) in textItem[3]"
          :token="token"
          :side="side"
          :lineIndex="textIndex"
          :tokenIndex="tokenIndex"
          :otherSide="otherSide"
          @hover="(side, lineIndex, tokenIndex) => $emit('hover', side, lineIndex, tokenIndex)"
          :key="`${textIndex}-${tokenIndex}`" />
        {{ ' ' }}
        <p v-if="textItem[2] === 'new'" :key="`${textIndex}`" />
      </template>
    </div>
  </div>
</template>
<script>
  import ReaderLineToken from './ReaderLineToken.vue';

  export default {
    components: { ReaderLineToken },
    props: ['lineRef', 'text', 'side', 'otherSide'],
  };
</script>
