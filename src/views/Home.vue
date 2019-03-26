<template>
  <div class="fill-height">
    <top-menu :data="markData" @add="addTab" @remove="removeTab" @active="activeTab" @import="addImportFile"></top-menu>
    <div class="nothing" v-if="markData.length == 0">nothing</div>
    <v-layout row column fill-height v-else>
      <v-card color="#e8e8e8" class="elevation-0" id="start">
        <v-flex md12>
          <v-layout row wrap bb px-4>
            <v-flex md6 my-2 br>
              <toolbar-list @triggerAction="handleAction"></toolbar-list>
            </v-flex>
            <v-flex md6 pa-3>
              <v-text-field class="file-name-form" full-width hide-details outline label="File name" v-model="markData[activeFile].title"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
      <div class="info">
        <v-layout row wrap>
          <v-flex md6 br>
            <div class="tab-name bb body-2">
              <p>Markdown</p>
            </div>
          </v-flex>
          <v-flex md6>
            <div class="tab-name bb body-2">
              <p>Preview</p>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-flex md12 fill-height>
        <v-layout row wrap fill-height overflow-hidden>
          <v-flex md6 fill-height br>
            <div class="editor-container overflow-auto">
              <editor ref='myEditor' v-model="markData[activeFile].content" @init="editorInit" lang="markdown" theme="chrome" width="100%" height="100%"></editor>
            </div>
          </v-flex>
          <v-flex md6 fill-height>
            <div class="preview overflow-auto">
              <div class="inner-preview">
                <div class="preview-container pa-4" v-html="markdown"></div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import '../assets/markdown-style.css'
import Toolbar from '../components/toolbar.vue'
import AceEditor from 'vue2-ace-editor'
import TopMenu from '../components/top-menu.vue'
const md = require('markdown-it')({
  breaks: true
})
md.use(require('markdown-it-checkbox'))
md.use(require('markdown-it-link-attributes'))
export default {
  components: {
    'toolbar-list': Toolbar,
    'editor': AceEditor,
    'top-menu': TopMenu
  },
  data: () => ({
    textData: '',
    activeFile: 0,
    markData: [
      { title: 'untitled', content: '' }
    ]
  }),
  methods: {
    addImportFile (file) {
      if (file.type = 'markdown') {
        this.markData.push({
          title: file.title,
          content: file.content
        })
      }
    },
    activeTab (a) {
      this.activeFile = a
    },
    removeTab (i) {
      this.activeFile == i ? this.activeFile-- : null
      this.markData.splice(i, 1)
    },
    addTab () {
      this.markData.push({
        title: 'untitled',
        content: ''
      })
    },
    handleAction (event) {
      let editor = this.$refs.myEditor.editor
      editor.session.insert(editor.getCursorPosition(), event.code)
    },
    editorInit (editor) {
      require('brace/ext/language_tools')
      require('brace/mode/markdown')
      require('brace/theme/chrome')
      require('brace/snippets/markdown')
      editor.setOptions({ fontSize: '13pt' })
    }
  },
  computed: {
    markdown () {
      return md.render(this.markData[this.activeFile].content)
    }
  }
}

</script>
<style>
.overflow-auto {
  overflow: auto
}

.ace_scrollbar::-webkit-scrollbar {
  width: 8px;
}

.ace_scrollbar::-webkit-scrollbar-thumb {
  background: #d6d5d5;
  border-radius: 50px;
}

.ace_scrollbar::-webkit-scrollbar-track {
  background: #eee;
}

.preview-container {
  height: 100%
}

.preview {
  position: absolute;
  width: 50%;
  height: 79%;
}

.inner-preview {
  position: absolute;
  width: 100%;
  height: 100%;
}

.preview-container::-webkit-scrollbar {
  width: 8px;
}

.preview-container::-webkit-scrollbar-thumb {
  background: #d6d5d5;
  border-radius: 50px;
}

.preview-container::-webkit-scrollbar-track {
  background: #eee;
}

.editor-container {
  height: 100%;
}

.tab-name {
  padding: 12px;
  background-color: #d8d8d8;
}

.tab-name p {
  margin: 0;
  display: inline-block;
}

.file-name-form .v-input__control .v-input__slot {
  background-color: rgb(217, 217, 217) !important;
  border-color: rgb(203, 203, 203) !important;
}

.br {
  border-right: 1px solid rgb(178, 178, 178)
}

.bb {
  border-bottom: 1px solid rgb(178, 178, 178)
}

</style>
