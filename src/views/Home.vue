<template>
  <v-container>
    <v-row class="text-center" justify="center">
      <v-col cols="12">
        <v-img
          contain
          class="my-3"
          height="200"
          :src="require('../assets/logo.svg')"
        ></v-img>
      </v-col>

      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to WaCharts</h1>
        <p class="subheading font-weight-regular">
          Analyze what's going on in your WhatsApp chat using this simple app.
        </p>
      </v-col>

      <v-col cols="12">
        <v-btn @click="start" outlined>{{ message }}</v-btn>
        <input
          v-show="false"
          @change="handleFile"
          ref="fileInput"
          type="file"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  invalidMessage = 'Invalid file. Select another file.';
  message = 'Start now!';

  get fileInput() {
    return this.$refs.fileInput as HTMLInputElement;
  }

  start() {
    this.fileInput.click();
  }

  handleFile() {
    const files = this.fileInput.files;
    if (!files || !files.length) {
      this.message = this.invalidMessage;
      return;
    }

    const file = files[0];
    if (file.type !== 'text/plain') {
      this.message = this.invalidMessage;
      return;
    }

    console.log(file);
  }
}
</script>
