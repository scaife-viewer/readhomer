<template>
  <div class="reference-input">
    <div class="reference-input--top-row" :class="{'sync-disabled': disableSync === true}">
      <div class="input-group">
        <template v-if="!readFromStore">
          <div class="link-group">
            <a
              href
              v-for="choice in choices"
              :key="choice.urn"
              @click.prevent="urn = choice.urn"
              :class="{active: urn === choice.urn}">
              {{ choice.label }}
            </a>
          </div>
          <input v-model="reference" @keyup.enter="lookup" placeholder="2.1-3.15" />
        </template>
        <div class="sync-label" v-else>Synced with <strong>{{ selectedCard }}</strong></div>
        <button class="global-input"
          v-if="!disableSync"
          @click.prevent="toggleReadFromSource"
          :class="{ active: readFromStore }">
          <icon name="link" />
        </button>
      </div>
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
    selectedCard() {
      return this.$store.state.homer.selectedCard;
    },
    choices() {
      const c = [
        { urn: URN_ILIAD, label: 'Il.' },
        { urn: URN_ODYSSEY, label: 'Od.' },
      ];
      if (this.urn === URN_ILIAD) {
        c.reverse();
      }
      return c;
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
      // display: flex;
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
    .sync-label {
      flex: 1;
      margin-top: auto;
      margin-bottom: auto;
    }
    input {
      padding: 5px 10px;
      flex: 1;
    }
    .input-group {
    }
    .link-group {
      margin-bottom: auto;
      margin-top: auto;
      a {
        font-size: 14px;
        margin-right: 20px;
        text-align: center;
        width: 40px;
        height: 28px;
        color: $gray-700;
        text-decoration: none;
      }
    }
    a.active {
      color: black;
      font-weight: bold
    }
  }
</style>
