<template>
  <div class="top-menu">
    <v-toolbar dark color="#3d404d" dense class="elevation-0">
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x class="b5">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <p class="title">Markdown Editor</p>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <v-list-tile v-for="(subItem, i) in item.items" :key="subItem.title+i" @click="">
                <label class="file-select" @click="" v-if="item.title == 'Import'">
                  <v-list-tile-content>
                    <v-list-tile-title>{{subItem.title}}</v-list-tile-title>
                    <input type="file" class="fileUpload" ref="fileUpload" @change="importFile" :accept="subItem.name == 'markdown' ? '.md' : 'text/html'">
                  </v-list-tile-content>
                </label>
                <v-list-tile-content v-else>
                  <v-list-tile-title @click="exportFile(subItem)">{{subItem.title}}</v-list-tile-title>
                </v-list-tile-content>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-tabs show-arrows color="#3d404d" class="tab-container" v-model="active" @change="activeTab">
        <v-tabs-slider color="transparent"></v-tabs-slider>
        <v-tab :ripple="false" v-for="(item, i) in data" :key="i" class="file-tab">
          <span class="text-truncate text-capitalize">{{item.title}}</span>
          <v-btn icon small class="ma-0 ml-5 close-button-tab" @click="removeTab(i)">
            <v-icon small>close</v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
      <v-btn icon @click="addTab">
        <v-icon>add</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click="$vuetify.goTo('#start')">
          <v-icon dark>expand_more</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-snackbar v-model="snackbar.active" :color="snackbar.color" top right :timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
<script>
import TurndownService from 'turndown'
const mkdown = new TurndownService()
export default {
  props: ['data'],
  data: () => ({
    active: 0,
    menu: false,
    snackbar: {
      active: false,
      text: '',
      color: 'primary'
    },
    importType: '',
    items: [{
      action: 'insert_drive_file',
      title: 'Import',
      items: [
        { title: 'Markdown File', name: 'markdown' },
        { title: 'HTML File', name: 'html' }
      ]
    },
    {
      action: 'save',
      title: 'Export As',
      items: [
        { title: 'HTML', name: 'html', ext: '.html' },
        { title: 'Styled HTML', name: 'shtml', ext: '.html' },
        { title: 'Markdown', name: 'markdown', ext: '.md' }
      ]
    }
    ]
  }),
  methods: {
    exportFile (f) {
      this.$emit('export', f)
    },
    importFile (e) {
      let regex = /[^.]+$/
      let fileName = e.target.files[0].name
      let ext = regex.exec(fileName)[0]
      let file = e.target.files[0]
      let input = this.$refs.fileUpload
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (a) => {
        if (ext == 'md' || ext == 'html') {
          let content = ext == 'md' ? a.target.result : mkdown.turndown(a.target.result)
          let importFile = {
            title: fileName.replace(/\..*/g, ''),
            content: content,
            type: ext == 'md' ? 'markdown' : 'html'
          }
          this.$emit('import', importFile)
        } else {
          this.snackbar.active = true
          this.snackbar.text = 'invalid file type'
          this.snackbar.color = 'error'
        }
      }
      input.type = 'text'
      input.type = 'file'
    },
    activeTab (a) {
      this.$emit('active', a)
    },
    addTab () {
      this.$emit('add')
    },
    removeTab (i) {
      this.$emit('remove', i)
    }
  }
}

</script>
<style>
@keyframes slideInFromBottom {
  0% {
    transform: translateY(20px);
    opacity: 0
  }

  100% {
    transform: translateY(0);
    opacity: 100
  }
}

.fileUpload {
  display: none;
}

.tab-container {
  width: auto !important;
  max-width: 85%;
}

.close-button-tab {
  visibility: hidden;
  transition: all .3s ease;
}

.file-tab {
  animation: .3s ease-out 0s 1 slideInFromBottom;
  transition: all .3s ease;
  margin: 0 2px;
}

.file-tab:hover {
  background-color: #00000017
}

.file-tab:hover .close-button-tab {
  visibility: visible;
  transition: all .3s ease;
}

.v-tabs__item--active {
  background-color: #e8e8e8;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #3d404d;
}

.v-tabs__item--active button .v-btn__content i {
  color: red
}

</style>
