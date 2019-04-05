<template>
    <div class="card">
        <div class="card-header">
            <a href @click.prevent="$emit('prevClick')">{{ previous }}</a>
            <strong>{{ current || 'Select A Card' }}</strong>
            <a href @click.prevent="$emit('nextClick')">{{ next }}</a>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
  props: ['current', 'previous', 'next'],
};
</script>
<style lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
}
.card {
    width: 100%;
}
</style>
