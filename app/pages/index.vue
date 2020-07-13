<template>
  <div class="container">
  </div>
</template>

<script>

</script>
<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    head () {
      return {
        script: [
          { src: 'jquery-3.5.1.min.js' },
          { src: 'matter.min.js' },
          { src: 'pixi.min.js' },
        ],
      }
    },
    mounted() {
      let canvasScript = document.createElement('script');
      canvasScript.setAttribute('src', 'canvas.js')
      document.head.appendChild(canvasScript);
    }
  })
</script>

<style>
.container {
}
</style>
