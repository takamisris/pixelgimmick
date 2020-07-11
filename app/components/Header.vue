<template>
  <header>
    <div class="menu">
      <div class="menu-content">
        <div class="header-item-wrap" :style="headerItemWrapStyle" v-for="headerItemInfo in headerItems">
          <HeaderItem :headerItemInfo=headerItemInfo />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Header',
    data() {
      return {
        headerItems: [
          {
            text: '技術系ブログ',
            image: '_nuxt/assets/images/test.png',
            link: '',
          },
          {
            text: '技術系ブログ2',
            image: '_nuxt/assets/images/test.png',
            link: '',
          },
        ],
        headerItemWrapStyle: {
          width: '50%',
          height: '100%',
          display: 'inline-block',
        },
      }
    },
  })
</script>

<style lang="scss">
  $MENU_HEIGHT: 80px;

  .menu {
    border-bottom: 1px solid #cccccc;
    width: 100%;
    height: $MENU_HEIGHT;
    position: relative;
    .menu-content {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      height: 100%;
      width: 90%;
      font-size: 0;
    }
  }
</style>
