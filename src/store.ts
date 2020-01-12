import Vue from 'vue';
import Vuex from 'vuex';

import { Store } from './utils/store';
import {
  analyze,
  Accumulator,
  MapAccumulator,
  MasterAccumulator,
  Result,
} from './utils/analyzer';

Vue.use(Vuex);

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default new Vuex.Store({
  state: {
    accumulator: null as MasterAccumulator | null,
    store: null as Store | null,
    processingTime: 0,
  },

  getters: {
    accumulatorTop({ accumulator }) {
      if (!accumulator) {
        return null;
      }

      const top = {
        user: { key: '-', value: 0 },
        emoji: { key: '-', value: 0 },
        day: { key: '-', value: 0 },
      };

      const userAccumulator = accumulator.byUser as MapAccumulator;
      for (const userName in userAccumulator) {
        const user = userAccumulator[userName];
        if (user.message.total > top.user.value) {
          top.user = {
            key: userName,
            value: user.message.total,
          };
        }
      }

      const allAccumulator = accumulator.all as Accumulator;
      for (const emojiType in allAccumulator.emoji.byType) {
        const value = allAccumulator.emoji.byType[emojiType];
        if (value > top.emoji.value) {
          top.emoji = {
            key: emojiType,
            value,
          };
        }
      }

      const dayAccumulator = accumulator.byDay as MapAccumulator;
      for (const dayNum in dayAccumulator) {
        const day = dayAccumulator[dayNum];
        if (day.message.total > top.day.value) {
          top.day = {
            key: days[parseInt(dayNum)],
            value: day.message.total,
          };
        }
      }

      return top;
    },
  },

  mutations: {
    SET_RESULT(state, result: Result) {
      state.accumulator = result.accumulator;
      state.store = result.store;
    },

    SET_PROCESSING_TIME(state, processingTime: number) {
      state.processingTime = processingTime;
    },
  },

  actions: {
    async analyzeFile(context, file: File) {
      const startTime = Date.now();
      const result = await analyze(file);
      const processingTime = Date.now() - startTime;

      context.commit('SET_RESULT', result);
      context.commit('SET_PROCESSING_TIME', processingTime);
    },
  },
});
