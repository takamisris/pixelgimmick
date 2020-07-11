<template>
  <div ref="text" class="text">
    {{ text }}
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'TextCenter',
    props: [
      'text',
    ],
  })
</script>

<style lang="scss">
  .text {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    margin: 0 auto;
    width: 100%;
    text-align: center;
    border: 1px solid red;
  }
</style>
