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
      <v-card color="#e8e8e8" class="elevation-4">
        <v-flex md12>
          <v-layout row wrap>
            <v-flex md6 my-2>
              1
            </v-flex>
            <v-flex md6 pa-3 pr-5>
              <v-text-field class="file-name-form" full-width hide-details outline value="untitled document" label="File name"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card>
      <v-flex md12>
        3
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    test: 'anu'
  })
}
</script>

<style>
.file-name-form .v-input__control .v-input__slot {
  background-color: rgb(217, 217, 217) !important;
  border-color: rgb(203, 203, 203) !important;
}
</style>
