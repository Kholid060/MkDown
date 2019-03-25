<template>
  <v-toolbar dark color="#3d404d" dense class="elevation-0">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <!-- <v-toolbar-title class="white--text mr-3">Markdown Editor</v-toolbar-title> -->
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
</template>
<script>
export default{
  props: ['data'],
  data: () => ({
    active: 0
  }),
  methods: {
    activeTab(a){
      this.$emit('active', a)
    },
    addTab(){
      this.$emit('add')
    },
    removeTab(i){
      this.$emit('remove', i)
    }
  },
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
.tab-container{
  width: auto !important;
  max-width: 85%;
}
.close-button-tab{
  visibility: hidden;
  transition: all .3s ease;
}
.file-tab{
  animation: .3s ease-out 0s 1 slideInFromBottom;
  transition: all .3s ease;
  margin: 0 2px;
}
.file-tab:hover{
  background-color: #00000017
}
.file-tab:hover .close-button-tab{
  visibility: visible;
  transition: all .3s ease;
}
.v-tabs__item--active {
  background-color: #e8e8e8;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #3d404d;
}
.v-tabs__item--active button .v-btn__content i{
  color: red
}

</style>
