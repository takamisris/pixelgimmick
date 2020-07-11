<template>
  <div ref="icon" class="icon">
    <img :src="image" />
<!--    <img src="@/assets/images/test.png"/>-->
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'IconCenter',
    props: [
      'image',
    ],
    mounted() {
      this.adjustIconSize();
    },
    methods: {
      adjustIconSize() {
        const iconStyle = this.$refs.icon.style;
        const { width, height } = getComputedStyle(this.$refs.icon);
        if (width < height) {
          iconStyle.width = height;
        } else {
          iconStyle.height = width;
        }
        iconStyle.visibility = 'visible';
      }
    }
  })
</script>

<style lang="scss">
    .icon {
      position: absolute;
      top:50%;
      left: 50%;
      margin: 0 auto;
      transform: translateY(-50%) translateX(-50%);
      border-radius: 50%;
      width: 100%;
      height: 100%;
      border: 1px solid #cccccc;
      visibility: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
</style>
