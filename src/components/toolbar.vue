<template>
  <v-layout fill-height row wrap align-center>
    <template v-for="item in toolbars">
      <span :title="item.name" class="toolbar-icon" @click="toolHandle(item)">
        <v-icon>{{item.icon}}</v-icon>
      </span>
    </template>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    toolbars: [
    	{name: 'bold', icon: 'format_bold'},
    	{name: 'italic', icon: 'format_italic'},
    	{name: 'strikethrough', icon: 'format_strikethrough'},
    	{name: 'listBulleted', icon: 'format_list_bulleted'},
    	{name: 'listNumbered', icon: 'format_list_numbered'},
    	{name: 'checkBox', icon: 'check_box'},
    	{name: 'quote', icon: 'format_quote'},
    	{name: 'code', icon: 'code'},
    	{name: 'link', icon: 'link'},
    	{name: 'table', icon: 'border_all'},
    	{name: 'image', icon: 'image'}
    ]
  }),
  methods: {
  	toolHandle(item){
  		this.$emit('triggerAction', item.name)
  	}
  }
}
</script>