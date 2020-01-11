import Vue from 'vue';
import Vuex from 'vuex';

import { Store } from './utils/store';
import { analyze, MasterAccumulator, Result } from './utils/analyzer';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accumulator: null as MasterAccumulator | null,
    store: null as Store | null,
    processingTime: 0,
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
