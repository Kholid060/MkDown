<template>
  <div class="fill-height">
    <div class="tab-name bb body-2">
      <p>Preview</p>
    </div>
    <div class="preview-container">
    	<div class="pa-4 markdown-body" v-html="data"></div>
    </div>
  </div>
</template>
<script>
import '../assets/markdown-style.css'
export default {
  props: ['data']
}

</script>
<style>
.preview-container{
	height: 100%;
	overflow: auto
}
</style>
