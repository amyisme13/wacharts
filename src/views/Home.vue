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
        <v-btn outlined>Start now!</v-btn>
        <input v-show="false" type="file" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>
