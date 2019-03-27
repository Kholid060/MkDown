<template>
  <div class="fill-height">
    <top-menu :data="markData" @add="addTab" @export="exportFile" @remove="removeTab" @active="activeTab" @import="addImportFile" @preview="previewFile"></top-menu>
    <div class="nothing" v-if="markData.length == 0">nothing</div>
    <v-layout row column fill-height v-else>
      <v-card color="#e8e8e8" class="elevation-0" id="start">
        <v-flex md12 x12>
          <v-layout row wrap bb>
            <v-flex md6 my-2 br>
              <toolbar-list @triggerAction="handleAction"></toolbar-list>
            </v-flex>
            <v-flex md6 pa-3>
              <v-text-field class="file-name-form" full-width hide-details outline label="File name" v-model="activeData.title"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
      <div class="info hidden-sm-and-down">
        <v-layout row wrap>
          <v-flex md6 br tab-name bb>
            <div class="body-2">
              <span>Markdown</span>
            </div>
          </v-flex>
          <v-flex md6 tab-name bb>
            <div class="body-2">
              <span>Preview</span>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-flex md12 fill-height>
        <v-layout row wrap fill-height>
          <v-flex md6 fill-height br xs12>
            <div class="editor-container overflow-auto">
              <editor ref='myEditor' v-model="activeData.content" @init="editorInit" lang="markdown" theme="chrome" width="100%" height="100%"></editor>
            </div>
          </v-flex>
          <div class="tab-name hidden-md-and-up">
            <span>Preview</span>
          </div>
          <v-flex md6 fill-height xs12>
            <div class="preview overflow-auto">
              <div class="inner-preview">
                <code class="pa-4 src-preview" v-if="srcCode">{{markdown}}</code>
                <div class="preview-container pa-4" v-else v-html="markdown"></div>
              </div>
              <div class="preview-tool">
                <v-btn icon @click="previewDialog = true">
                  <v-icon>fullscreen</v-icon>
                </v-btn>
                <v-btn icon @click="srcCode = !srcCode">
                  <v-icon>code</v-icon>
                </v-btn>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- Preview Dialog -->
    <v-dialog v-model="previewDialog" max-width="700px" scrollable>
      <v-card>
        <v-card-title class="title">
          <span class="text-truncate">{{activeData.title}} preview</span>
        </v-card-title>
        <v-card-text>
          <div class="px-4 preview-container" v-html="markdown"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cyan darken-1" flat="flat" @click="previewDialog = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import '../assets/markdown-style.css'
import Toolbar from '../components/toolbar.vue'
import AceEditor from 'vue2-ace-editor'
import TopMenu from '../components/top-menu.vue'
import FileSaver from 'file-saver'
const md = require('markdown-it')({
  breaks: true
})
md.use(require('markdown-it-checkbox'))
md.use(require('markdown-it-link-attributes'))
export default {
  metaInfo: {
    title: 'Online Markdown Editor',
    titleTemplate: '%s | MkDown'
  },
  components: {
    'toolbar-list': Toolbar,
    'editor': AceEditor,
    'top-menu': TopMenu
  },
  data: () => ({
    previewDialog: false,
    activeFile: 0,
    srcCode: false,
    markData: [
      { title: 'untitled', content: "# MkDown\r\n\r\nMkDown is an online markdown editor built with [vueJs](https:\/\/vuejs.org). How to use MkDown Markdown Editor:\r\n\r\n- Type some markdown in left side\r\n- See the preview on right side\r\n- And Voil\u00E0\r\n\r\n## Feature\r\n\r\n- Import Markdown file from your pc\r\n- Import your HTML file and convert it to markdown\r\n- Export your document as a Markdown file, HTML or HTML styled file\r\n\r\nAnd I think that\'s it" }
    ],
    css: `@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+1EA0-1EF9,U+20AB}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local('Roboto'),local('Roboto-Regular'),url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}body{font-family: 'Roboto', sans-serif}.wrapper{padding: 10px 50px}p{margin:0!important}.octicon{display:inline-block;fill:currentColor;vertical-align:text-bottom}.anchor{float:left;line-height:1;margin-left:-20px;padding-right:4px}.anchor:focus{outline:0}h1 .octicon-link,h2 .octicon-link,h3 .octicon-link,h4 .octicon-link,h5 .octicon-link,h6 .octicon-link{color:#1b1f23;vertical-align:middle;visibility:hidden}h1:hover .anchor,h2:hover .anchor,h3:hover .anchor,h4:hover .anchor,h5:hover .anchor,h6:hover .anchor{text-decoration:none}h1:hover .anchor .octicon-link,h2:hover .anchor .octicon-link,h3:hover .anchor .octicon-link,h4:hover .anchor .octicon-link,h5:hover .anchor .octicon-link,h6:hover .anchor .octicon-link{visibility:visible}.pl-c{color:#6a737d}.pl-c1,.pl-s .pl-v{color:#005cc5}.pl-e,.pl-en{color:#6f42c1}.pl-s .pl-s1,.pl-smi{color:#24292e}.pl-ent{color:#22863a}.pl-k{color:#d73a49}.pl-pds,.pl-s,.pl-s .pl-pse .pl-s1,.pl-sr,.pl-sr .pl-cce,.pl-sr .pl-sra,.pl-sr .pl-sre{color:#032f62}.pl-smw,.pl-v{color:#e36209}.pl-bu{color:#b31d28}.pl-ii{background-color:#b31d28;color:#fafbfc}.pl-c2{background-color:#d73a49;color:#fafbfc}.pl-c2:before{content:"^M"}.pl-sr .pl-cce{color:#22863a;font-weight:700}.pl-ml{color:#735c0f}.pl-mh,.pl-mh .pl-en,.pl-ms{color:#005cc5;font-weight:700}.pl-mi{color:#24292e;font-style:italic}.pl-mb{color:#24292e;font-weight:700}.pl-md{background-color:#ffeef0;color:#b31d28}.pl-mi1{background-color:#f0fff4;color:#22863a}.pl-mc{background-color:#ffebda;color:#e36209}.pl-mi2{background-color:#005cc5;color:#f6f8fa}.pl-mdr{color:#6f42c1;font-weight:700}.pl-ba{color:#586069}.pl-sg{color:#959da5}.pl-corl{color:#032f62;text-decoration:underline}details{display:block}summary{display:list-item}a{background-color:transparent}a:active,a:hover{outline-width:0}strong{font-weight:inherit;font-weight:bolder}h1{font-size:2em;margin:.67em 0}img{border-style:none}code,kbd,pre{font-family:monospace,monospace;font-size:1em;box-shadow:none}hr{box-sizing:content-box;height:0;overflow:visible}input{font:inherit;margin:0}input{overflow:visible}[type=checkbox]{box-sizing:border-box;padding:0}*{box-sizing:border-box}input{font-family:inherit;font-size:inherit;line-height:inherit}a{color:#0366d6;text-decoration:none}a:hover{text-decoration:underline}strong{font-weight:600}hr{background:0 0;border:0;border-bottom:1px solid #dfe2e5;height:0;margin:15px 0;overflow:hidden}hr:before{content:"";display:table}hr:after{clear:both;content:"";display:table}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}details summary{cursor:pointer}h1,h2,h3,h4,h5,h6{margin-bottom:0;margin-top:0}h1{font-size:32px}h1,h2{font-weight:600}h2{font-size:24px}h3{font-size:20px}h3,h4{font-weight:600}h4{font-size:16px}h5{font-size:14px}h5,h6{font-weight:600}h6{font-size:12px}p{margin-bottom:10px;margin-top:0}blockquote{margin:0}ol,ul{margin-bottom:0;margin-top:0;padding-left:0}ol ol,ul ol{list-style-type:lower-roman}ol ol ol,ol ul ol,ul ol ol,ul ul ol{list-style-type:lower-alpha}dd{margin-left:0}code,pre{font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px;color:#24292e}pre{margin-bottom:0;margin-top:0}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}.border{border:1px solid #e1e4e8!important}.border-0{border:0!important}.border-bottom{border-bottom:1px solid #e1e4e8!important}.rounded-1{border-radius:3px!important}.bg-white{background-color:#fff!important}.bg-gray-light{background-color:#fafbfc!important}.text-gray-light{color:#6a737d!important}.mb-0{margin-bottom:0!important}.my-2{margin-bottom:8px!important;margin-top:8px!important}.pl-0{padding-left:0!important}.py-0{padding-bottom:0!important;padding-top:0!important}.pl-1{padding-left:4px!important}.pl-2{padding-left:8px!important}.py-2{padding-bottom:8px!important;padding-top:8px!important}.pl-3,.px-3{padding-left:16px!important}.px-3{padding-right:16px!important}.pl-4{padding-left:24px!important}.pl-5{padding-left:32px!important}.pl-6{padding-left:40px!important}.f6{font-size:12px!important}.lh-condensed{line-height:1.25!important}.text-bold{font-weight:600!important}:first-child{margin-top:0!important}:last-child{margin-bottom:0!important}a:not([href]){color:inherit;text-decoration:none}blockquote,dl,ol,p,pre,table,ul{margin-bottom:16px;margin-top:0}hr{background-color:#e1e4e8;border:0;height:.25em;margin:24px 0;padding:0}blockquote{border-left:.25em solid #dfe2e5;color:#6a737d;padding:0 1em}blockquote>:first-child{margin-top:0}blockquote>:last-child{margin-bottom:0}kbd{background-color:#fafbfc;border:1px solid #c6cbd1;border-bottom-color:#959da5;border-radius:3px;box-shadow:inset 0 -1px 0 #959da5;color:#444d56;display:inline-block;font-size:11px;line-height:10px;padding:3px 5px;vertical-align:middle}h1,h2,h3,h4,h5,h6{font-weight:600;line-height:1.25;margin-bottom:16px;margin-top:24px}h1{font-size:2em}h1,h2{border-bottom:1px solid #eaecef;padding-bottom:.3em}h2{font-size:1.5em}h3{font-size:1.25em}h4{font-size:1em}h5{font-size:.875em}h6{color:#6a737d;font-size:.85em}ol,ul{padding-left:2em}ol ol,ol ul,ul ol,ul ul{margin-bottom:0;margin-top:0}li{word-wrap:break-all}li>p{margin-top:16px}li+li{margin-top:.25em}dl{padding:0}dl dt{font-size:1em;font-style:italic;font-weight:600;margin-top:16px;padding:0}dl dd{margin-bottom:16px;padding:0 16px}table{display:block;overflow:auto;width:100%}table th{font-weight:600}table td,table th{border:1px solid #dfe2e5;padding:6px 13px}table tr{background-color:#fff;border-top:1px solid #c6cbd1}table tr:nth-child(2n){background-color:#f6f8fa}img{background-color:#fff;box-sizing:content-box;max-width:100%}img[align=right]{padding-left:20px}img[align=left]{padding-right:20px}code{background-color:rgba(27,31,35,.05);border-radius:3px;font-size:85%;margin:0;padding:.2em .4em}pre{word-wrap:normal}pre>code{background:0 0;border:0;font-size:100%;margin:0;padding:0;white-space:pre;word-break:normal}.highlight{margin-bottom:16px}.highlight pre{margin-bottom:0;word-break:normal}.highlight pre,pre{background-color:#f6f8fa;border-radius:3px;font-size:85%;line-height:1.45;overflow:auto;padding:16px}pre code{background-color:transparent;border:0;display:inline;line-height:inherit;margin:0;max-width:auto;overflow:visible;padding:0;word-wrap:normal}.commit-tease-sha{color:#444d56;display:inline-block;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:90%}.blob-wrapper{border-bottom-left-radius:3px;border-bottom-right-radius:3px;overflow-x:auto;overflow-y:hidden}.blob-wrapper-embedded{max-height:240px;overflow-y:auto}.blob-num{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;color:rgba(27,31,35,.3);cursor:pointer;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px;line-height:20px;min-width:50px;padding-left:10px;padding-right:10px;text-align:right;user-select:none;vertical-align:top;white-space:nowrap;width:1%}.blob-num:hover{color:rgba(27,31,35,.6)}.blob-num:before{content:attr(data-line-number)}.blob-code{line-height:20px;padding-left:10px;padding-right:10px;position:relative;vertical-align:top}.blob-code-inner{color:#24292e;font-family:SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;font-size:12px;overflow:visible;white-space:pre;word-wrap:normal}.pl-token.active,.pl-token:hover{background:#ffea7f;cursor:pointer}kbd{background-color:#fafbfc;border:1px solid #d1d5da;border-bottom-color:#c6cbd1;border-radius:3px;box-shadow:inset 0 -1px 0 #c6cbd1;color:#444d56;display:inline-block;font:11px SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;line-height:10px;padding:3px 5px;vertical-align:middle}:checked+.radio-label{border-color:#0366d6;position:relative;z-index:1}.tab-size[data-tab-size="1"]{-moz-tab-size:1;tab-size:1}.tab-size[data-tab-size="2"]{-moz-tab-size:2;tab-size:2}.tab-size[data-tab-size="3"]{-moz-tab-size:3;tab-size:3}.tab-size[data-tab-size="4"]{-moz-tab-size:4;tab-size:4}.tab-size[data-tab-size="5"]{-moz-tab-size:5;tab-size:5}.tab-size[data-tab-size="6"]{-moz-tab-size:6;tab-size:6}.tab-size[data-tab-size="7"]{-moz-tab-size:7;tab-size:7}.tab-size[data-tab-size="8"]{-moz-tab-size:8;tab-size:8}.tab-size[data-tab-size="9"]{-moz-tab-size:9;tab-size:9}.tab-size[data-tab-size="10"]{-moz-tab-size:10;tab-size:10}.tab-size[data-tab-size="11"]{-moz-tab-size:11;tab-size:11}.tab-size[data-tab-size="12"]{-moz-tab-size:12;tab-size:12}.task-list-item{list-style-type:none}.task-list-item+.task-list-item{margin-top:3px}.task-list-item input{margin:0 .2em .25em -1.6em;vertical-align:middle}hr{border-bottom-color:#eee}.pl-0{padding-left:0!important}.pl-1{padding-left:4px!important}.pl-2{padding-left:8px!important}.pl-3{padding-left:16px!important}.pl-4{padding-left:24px!important}.pl-5{padding-left:32px!important}.pl-6{padding-left:40px!important}.pl-7{padding-left:48px!important}.pl-8{padding-left:64px!important}.pl-9{padding-left:80px!important}.pl-10{padding-left:96px!important}.pl-11{padding-left:112px!important}.pl-12{padding-left:128px!important}`
  }),
  methods: {
    previewFile (p) {
      let content = this.markData[this.activeFile]
      localStorage.setItem('mkdown', JSON.stringify(content))
      window.open(`/preview/${p.name}`)
    },
    exportFile (e) {
      let file = this.markData[this.activeFile]
      let content
      switch (e.name) {
        case 'html':
          content = `<!DOCTYPE html><html><head><title>${file.title}</title></head><body>${this.markdown}</body></html>`
          break
        case 'shtml':
          content = `<!DOCTYPE html><html><head><title>${file.title}</title><style>${this.css}</style></head><body><div class="wrapper">${this.markdown}</div></body></html>`
          break
        case 'markdown':
          content = file.content
      }
      let blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, file.title + e.ext)
    },
    addImportFile (file) {
      this.markData.push({
        title: file.title,
        content: file.content
      })
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
      editor.session.setUseWrapMode(true)
    }
  },
  computed: {
    activeData () {
      return this.markData[this.activeFile]
    },
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

.tab-name div {
  display: inline-block;
}

.preview-tool button {
  display: block;
}

.tab-name.hidden-md-and-up {
  width: 100%;
}

.preview-tool {
  right: 10px;
  position: absolute;
  background-color: #0000000f;
  top: 5px;
  border-radius: 5px;
}

.src-preview {
  box-shadow: none;
  color: #676565;
  font-size: 11pt
}

.file-name-form .v-input__control .v-input__slot {
  background-color: rgb(217, 217, 217) !important;
  border-color: rgb(203, 203, 203) !important;
}

/*media start*/

@media only screen and (max-width: 960px) {
  .preview {
    width: 100%;
  }
}

/*media end*/

.br {
  border-right: 1px solid rgb(178, 178, 178)
}

.bb {
  border-bottom: 1px solid rgb(178, 178, 178)
}

</style>
