<template>
  <div class="reference-input">
    <div class="reference-input--top-row" :class="{'sync-disabled': disableSync === true}">
      <div class="input-group" v-if="!readFromStore">
        <input v-model="reference" @keyup.enter="lookup" placeholder="2.1-3.15" />
        <div class="button-group">
          <button
            v-for="choice in choices"
            :key="choice.urn"
            @click.prevent="urn = choice.urn"
            :class="{active: urn === choice.urn}">
            {{ choice.label }}
          </button>
        </div>
        <button :disabled="readFromStore" @click.prevent="lookup">Lookup</button>
      </div>
      <button class="global-input"
        v-if="!disableSync"
        @click.prevent="toggleReadFromSource"
        :class="{ active: readFromStore }">
        Sync
      </button>
    </div>
  </div>
</template>

<script>
import { URN_ILIAD, URN_ODYSSEY } from '../constants';

export default {
  props: ['disableSync'],
  data() {
    return {
      urn: URN_ILIAD,
      reference: '',
      readFromStore: false,
    };
  },
  computed: {
    choices() {
      return [
        { urn: URN_ILIAD, label: 'Il.' },
        { urn: URN_ODYSSEY, label: 'Od.' },
      ];
    },
  },
  watch: {
    readFromStore() {
      this.$emit('readFromStore', this.readFromStore);
    },
  },
  methods: {
    toggleReadFromSource() {
      this.readFromStore = !this.readFromStore;
    },
    lookup() {
      this.$emit('lookup', this.urn, this.reference);
    },
  },
};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .reference-input {
    padding: 15px 24px;
    border-bottom: 1px solid $gray-200;
    margin-bottom: 15px;
    background: $gray-100;
    flex: 1;
    .reference-input--top-row {
      display: flex;
      justify-content: flex-start;
    }
    .input-group {
      display: flex;
      height: 30px;
      border-right: 1px solid $gray-300;
      margin-right: 10px;
    }
    .sync-disabled .input-group {
      border-right: none;
      margin-right: 0;
    }
    input {
      padding: 5px 10px;
      margin-right: 5px;
    }
    .button-group {
      margin: 1px 10px 1px 0;
      button {
        margin: 0;
        text-align: center;
        width: 40px;
        height: 28px;
      }
    }
    button {
      background: $gray-200;
      border: 1px solid $gray-400;
      border-radius: 3px;
      cursor: pointer;
      margin: 1px 10px 1px 0;
      &:hover {
        background: $gray-300;
      }
      &.active {
        background: #2f4685;
        color: white;
      }
    }
  }
</style>
