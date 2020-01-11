<template>
  <v-app>
    <v-content>
      <v-expand-transition>
        <router-view></router-view>
      </v-expand-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
});
</script>

<style>
:root {
  --whatsapp-green: #25d366;
  --whatsapp-chat-background: #ece5dd;
}

.v-application {
  background: var(--whatsapp-green) !important;
}
</style>
