<template>
  <div class="fill-height">
    <v-toolbar dark color="#3d404d" dense class="elevation-0">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Markdown Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>halo</v-btn>
        <v-btn icon @click="$vuetify.goTo('#second')">
          <v-icon>expand_more</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row column fill-height>
      <v-card color="#e8e8e8" class="elevation-0">
        <v-flex md12>
          <v-layout row wrap bb px-4>
            <v-flex md6 my-2 br>
              <toolbar-list @triggerAction="handleAction"></toolbar-list>
            </v-flex>
            <v-flex md6 pa-3>
              <v-text-field class="file-name-form" full-width hide-details outline value="untitled document" label="File name"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
      <v-flex md12 fill-height>
        <v-layout row wrap fill-height>
          <v-flex md6 fill-height>
            <editor ref='myEditor' v-model="editContent" @init="editorInit" lang="javascript" theme="chrome" width="100%" height="100%"></editor>
          </v-flex>
          <v-flex md6 fill-height>
            <div v-html="markdown"></div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import marked from 'marked'
import Toolbar from '../components/toolbar.vue'
import AceEditor from 'vue2-ace-editor'
export default {
  components: { 'toolbar-list': Toolbar, 'editor': AceEditor },
  data: () => ({
    textData: '',
    editContent: ''
  }),
  methods: {
    handleAction(event) {
      let editor = this.$refs.myEditor.editor
      editor.session.insert(editor.getCursorPosition(), event)
    },
    editorInit(editor) {
      require('brace/ext/language_tools') //language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') //language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript')
    }
  },
  computed: {
    markdown() {
      return marked(this.editContent, { sanitize: true })
    }
  }
}

</script>
<style>
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
