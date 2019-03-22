<template>
  <div>
    <v-toolbar dark color="#3d404d" dense class="elevation-0">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>halo</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout row column>
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
      <v-flex md12 pa-4>
        <v-layout row wrap>
          <v-flex md6>
            <textarea ref="textAr" style="height: 100%; width: 100%; background-color: blue"></textarea>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Toolbar from './components/toolbar.vue'
export default {
  components: {'toolbar-list': Toolbar},
  methods: {
  	handleAction(event){
  		console.log(event)
  	}
  }
}

</script>
<style>
.toolbar-icon {
  padding: 10px 12px;
  transition: all .2s ease;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 2px;
}

.toolbar-icon:hover i {
  color: #000000a3;
}

.toolbar-icon:hover {
  background-color: #00000021;
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
