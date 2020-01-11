<template>
  <v-container class="py-0 py-lg-3">
    <v-row>
      <v-col cols="12">
        <v-card class="main-card pa-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h1 class="display-1 grey--text text--darken-3">Result</h1>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon large @click="close">
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Charts extends Vue {
  close() {
    this.$router.push({ name: 'home' });
  }
}
</script>

<style>
.main-card {
  background-color: var(--whatsapp-chat-background) !important;
  height: calc(100vh - 24px);
}

@media (min-width: 1264px) {
  .main-card {
    height: calc(100vh - 48px);
  }
}
</style>
