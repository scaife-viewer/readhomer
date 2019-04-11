<template>
    <div class="cts-reference">
        <a v-if="apiLink" :href="apiLink" target="_blank">{{ reference }}</a>
        <span v-else>No reference selected</span>
    </div>
</template>

<script>
export default {
    scaifeConfig: {
        displayName: 'CTS URN',
        location: 'sidebar',
    },
    computed: {
        card() {
            return this.$store.state.selectedCard;
        },
        reference() {
            return this.card && `urn:cts:greekLit:tlg0012.tlg001.perseus-grc2:${this.card}`;
        },
        apiLink() {
            return this.reference && `https://homer-api.herokuapp.com/${this.reference}`;
        }
    }
}
</script>

<style lang="scss">
    .cts-reference a {
        font-size: 14px;
    }
</style>

