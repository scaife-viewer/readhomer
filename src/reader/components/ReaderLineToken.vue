<template>
    <span class="token" :class="{ highlight }" @click.prevent="onClick" @mouseover="$emit('hover', side, lineIndex, tokenIndex)">
        {{ token }}
    </span>
</template>

<script>
  const ann = {
      left: [{
        0: [0, 1],
        1: [2],
        2: [3],
        3: [4, 5, 6],
        4: [7],
      }],
      right: [{
        0: [0],
        1: [0],
        2: [1],
        3: [2],
        4: [3],
        5: [3],
        6: [3],
        7: [4],
      }]
  }

  export default {
    props: ['token', 'side', 'lineIndex', 'tokenIndex', 'otherSide'],
    methods: {
      onClick() {
         console.log("select token", this.token);
      }
    },
    computed: {
      highlight() {
         if (this.otherSide.length === 2 && this.otherSide[0] === this.lineIndex) {
           const ti = this.otherSide[1];
           const mapping = this.side === 'right' ? ann.left[this.lineIndex][ti] : ann.right[this.lineIndex][ti];
           if (mapping) {
             return mapping.indexOf(this.tokenIndex) > -1;
           }
         }
      }
    }
  }
</script>

<style lang="scss">
.highlight {
  color: red;
}
.token:hover {
  background: #EEE;
}
</style>
