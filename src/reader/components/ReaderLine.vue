<template>
  <div class="line">
    <div class="line-ref">{{ lineRef }}</div>
    <div class="line-text" v-html="text"></div>
  </div>
</template>
<script>
export default {
  props: ['lineRef', 'text'],
};
</script>
