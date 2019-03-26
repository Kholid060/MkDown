<template>
  <v-layout fill-height row wrap align-center>
    <div class="toolbar-container">
      <template v-for="item in first">
        <v-menu offset-y v-if="item.name == 'heading'">
          <template v-slot:activator="{ on }">
            <span class="toolbar-icon" v-on="on">
              <v-icon>{{item.icon}}</v-icon>
            </span>
          </template>
          <v-list style="border-radius: 5px">
            <v-list-tile v-for="(item, index) in headings" :key="index" @click="headingHandle(index)">
              <v-list-tile-title class="pr-4">{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <span v-else :key="item.name" :title="item.name" class="toolbar-icon" @click="toolHandle(item)">
          <v-icon>{{item.icon}}</v-icon>
        </span>
      </template>
    </div>
    <div class="toolbar-container" id="second">
      <template v-for="item in second">
        <span :key="item.name" :title="item.name" class="toolbar-icon" @click="toolHandle(item)">
          <v-icon>{{item.icon}}</v-icon>
        </span>
      </template>
    </div>
    <div class="toolbar-container">
      <template v-for="item in third">
        <span :key="item.name" :title="item.name" class="toolbar-icon" @click="toolHandle(item)">
          <v-icon>{{item.icon}}</v-icon>
        </span>
      </template>
    </div>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    headings: ['heading 1', 'heading 2', 'heading 3', 'heading 4', 'heading 5', 'heading 6'],
    first: [
      { name: 'bold', icon: 'format_bold', code: '**text here**' },
      { name: 'italic', icon: 'format_italic', code: '*text here*' },
      { name: 'strikethrough', icon: 'format_strikethrough', code: '~~text here~~' },
      { name: 'heading', icon: 'format_size' }
    ],
    second: [
      { name: 'listBulleted', icon: 'format_list_bulleted', code: '\n- text\n- here' },
      { name: 'listNumbered', icon: 'format_list_numbered', code: '\n1. text \n2. here' },
      { name: 'checkBox', icon: 'check_box', code: '\n[X] checkbox\n' }
    ],
    third: [
      { name: 'quote', icon: 'format_quote', code: '\n> text here\n\n' },
      { name: 'code', icon: 'code', code: '`text here`' },
      { name: 'link', icon: 'link', code: '[this is a link](https://google.com)' },
      { name: 'table', icon: 'border_all', code: '\n|   |   |   |   |   |\r\n|---|---|---|---|---|\r\n|   |   |   |   |   |\r\n|   |   |   |   |   |\n' },
      { name: 'image', icon: 'image', code: '![alt text](https://picsum.photos/200 "image title")' }
    ]
  }),
  methods: {
    headingHandle (e) {
      let hash = { name: 'heading', code: '' }
      if (e == 0) {
        hash.code = '#'
      } else {
        for (let i = 0; i < e + 1; i++) {
          hash.code += '#'
        }
      }
      hash.code = '\n' + hash.code + ' text here\n'
      this.$emit('triggerAction', hash)
    },
    toolHandle (item) {
      this.$emit('triggerAction', item)
    }
  }
}

</script>
<style>
.toolbar-container {
  display: inline-block;
}

#second {
  margin: 0 10px;
}

.toolbar-icon {
  padding: 16px 12px 10px 12px;
  transition: all .2s ease;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 1px;
}

.toolbar-icon:hover i {
  color: #000000a3;
}

.toolbar-icon:hover {
  background-color: #00000021;
}

</style>
