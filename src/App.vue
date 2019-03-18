<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import ExtendedVue from '@/ExtendedVue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends ExtendedVue {
}
</script>


<style>
/* html */
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100vh;
}

/* Scroll bar */
::-webkit-scrollbar-track {
  border-radius: 0px !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
}
::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}
::-webkit-scrollbar-track-piece {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
}

.full-size {
  height: 100%;
  width: 100%;
}
</style>
