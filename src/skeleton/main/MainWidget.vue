<template>
  <div class="widget">
    <slot name="heading" />
    <div>
      <slot name="sticky" />
    </div>
    <div class="body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['editing'],
};
</script>
