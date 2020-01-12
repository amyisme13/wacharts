<template>
  <v-footer absolute padless class="white--text">
    <v-col class="text-center">
      <div class="subtitle-2 font-weight-light">
        <span>A side project by </span>
        <a href="https://fb.me/amy.azmim">Azmi Makarima</a>.
      </div>
      <div class="subtitle-2 mb-2 font-weight-light">
        Copyright © {{ currentYear }} WaCharts
      </div>

      <div class="caption font-weight-light">
        WhatsApp is a registered trademark of WhatsApp Inc.
      </div>
      <div class="caption mt-n1 font-weight-light">
        This site and service are not related in any way to WhatsApp Inc.
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AppCopyright extends Vue {
  get currentYear() {
    return new Date().getFullYear();
  }
}
</script>

<style>
.v-footer {
  background-color: var(--whatsapp-green) !important;
}

.v-footer a {
  color: white !important;
  text-decoration: none;
}

.v-footer a:hover {
  text-decoration: underline;
}
</style>
