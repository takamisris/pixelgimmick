<template>
  <div class="header-item">
    <div class="header-item-icon-wrapper">
      <IconCenter :image="headerItemInfo.image" />
    </div>
    <div class="header-item-text-wrapper">
      <TextCenter :text="headerItemInfo.text" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HeaderItem',
    props: [
      'headerItemInfo',
    ],
  })
</script>

<style lang="scss">
  .header-item {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    font-size: 0;
    word-spacing: 0;
    .header-item-icon-wrapper {
      vertical-align: top;
      display: inline-block;
      width: 50%;
      height: 100%;
      border: 1px solid blue;
      position: relative;
    }
    .header-item-text-wrapper{
      display: inline-block;
      width: 50%;
      height: 100%;
      border: 1px solid green;
      position: relative;
      font-size: 1rem;
    }

    .header-item-img {
      position: absolute;
      top:50%;
      left: 50%;
      margin: 0 auto;
      transform: translateY(-50%) translateX(-50%);
      border-radius: 50%;
      height: 80%;
      border: 1px solid #cccccc;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
