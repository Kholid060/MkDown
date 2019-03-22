<template>
  <v-layout fill-height row wrap align-center>
    <div class="toolbar-container">
      <template v-for="item in first">
        <span :key="item.name" :title="item.name" class="toolbar-icon" @click="toolHandle(item)">
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
    first: [
      { name: 'bold', icon: 'format_bold' },
      { name: 'italic', icon: 'format_italic' },
      { name: 'strikethrough', icon: 'format_strikethrough' },
      { name: 'heading', icon: 'format_size' }
    ],
    second: [
      { name: 'listBulleted', icon: 'format_list_bulleted' },
      { name: 'listNumbered', icon: 'format_list_numbered' },
      { name: 'checkBox', icon: 'check_box' }
    ],
    third: [
      { name: 'quote', icon: 'format_quote' },
      { name: 'code', icon: 'code' },
      { name: 'link', icon: 'link' },
      { name: 'table', icon: 'border_all' },
      { name: 'image', icon: 'image' }
    ]
  }),
  methods: {
    toolHandle (item) {
      this.$emit('triggerAction', item.name)
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
