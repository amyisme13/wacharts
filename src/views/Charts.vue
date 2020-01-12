<template>
  <v-container class="py-0 py-lg-3">
    <v-row>
      <v-col cols="12">
        <v-card class="main-card pa-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h1 class="display-1 grey--text text--darken-3">Result</h1>
                <span class="caption">
                  ({{ firstMessage.date.toDateString() }}
                  -
                  {{ lastMessage.date.toDateString() }})
                </span>
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon large @click="close">
                <v-icon large>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-card-text v-if="resultAvailable">
            <v-row>
              <v-col class="text-center" cols="3">
                <h3 class="display-3">
                  {{ this.store.users.length }}
                </h3>
                <h4 class="title font-weight-light">Users</h4>
              </v-col>

              <v-col class="text-center" cols="3">
                <h3 class="display-3">
                  {{ this.accumulator.all.message.total }}
                </h3>
                <h4 class="title font-weight-light">Messages</h4>
              </v-col>

              <v-col class="text-center" cols="3">
                <h3 class="display-3">
                  {{ this.accumulator.all.message.byType.media || 0 }}
                </h3>
                <h4 class="title font-weight-light">Pictures</h4>
              </v-col>

              <v-col class="text-center" cols="3">
                <h3 class="display-3">
                  {{ this.accumulator.all.emoji.total }}
                </h3>
                <h4 class="title font-weight-light">Emojis</h4>
              </v-col>
            </v-row>

            <v-row class="mt-12">
              <v-col class="text-center" cols="4">
                <h3 class="display-2 font-weight-light">
                  {{ this.accumulatorTop.user.key }}
                </h3>
                <h4 class="title font-weight-light">Top User</h4>
              </v-col>

              <v-col class="text-center" cols="4">
                <h3 class="display-2 font-weight-light">
                  {{ this.accumulatorTop.emoji.key }}
                </h3>
                <h4 class="title font-weight-light">Top Emoji</h4>
              </v-col>

              <v-col class="text-center" cols="4">
                <h3 class="display-2 font-weight-light">
                  {{ this.accumulatorTop.day.key }}
                </h3>
                <h4 class="title font-weight-light">Top Day</h4>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MasterAccumulator } from '../utils/analyzer';
import { Store } from '../utils/store';

@Component
export default class Charts extends Vue {
  created() {
    if (!this.resultAvailable) {
      this.close();
    }
  }

  get resultAvailable() {
    return !!this.accumulator && !!this.store;
  }

  get accumulator() {
    return this.$store.state.accumulator as MasterAccumulator;
  }

  get store() {
    return this.$store.state.store as Store;
  }

  get accumulatorTop() {
    return this.$store.getters.accumulatorTop;
  }

  get firstMessage() {
    if (!this.store) {
      return null;
    }

    return this.store.messages[0];
  }

  get lastMessage() {
    if (!this.store) {
      return null;
    }

    const length = this.store.messages.length;
    return this.store.messages[length - 1];
  }

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
