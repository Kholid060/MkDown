<template>
  <div>
    <pre v-if="type == 'markdown'" class="markdown-preview">{{data.content}}</pre>
    <div v-else-if="type == 'html'" v-html="markdown"></div>
    <div v-else class="container preview-container" v-html="markdown"></div>
  </div>
</template>
<script>
import '../assets/markdown-style.css'
const md = require('markdown-it')({
  breaks: true
})
export default {
  metaInfo () {
    return {
      title: this.data.title,
      titleTemplate: '%s | MkDown'
    }
  },
  data: () => ({
    data: null,
    type: ''
  }),
  computed: {
    markdown () {
      return md.render(this.data.content)
    }
  },
  created () {
    let retrieve = localStorage.getItem('mkdown')
    this.data = JSON.parse(retrieve)
    this.type = this.$route.params.file
  }
}

</script>
<style>
.markdown-preview {
  padding: 30px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

</style>
