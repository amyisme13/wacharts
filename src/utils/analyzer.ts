import whatsapp from 'whatsapp-chat-parser';

import { storeMessages, Store } from './store';
import { readFile } from './file';

interface Count {
  total: number;
  byType: { [key: string]: number };
}

export interface Accumulator {
  message: Count;
  emoji: Count;
}

export interface MapAccumulator {
  [key: string]: Accumulator;
}

export interface MasterAccumulator {
  [key: string]: Accumulator | MapAccumulator;
}

export interface Result {
  accumulator: MasterAccumulator;
  store: Store;
}

const createCounter = (): Count => ({
  total: 0,
  byType: {},
});

const createAccumulator = (): Accumulator => ({
  message: createCounter(),
  emoji: createCounter(),
});

const processFile = async (file: File) => {
  const string = await readFile(file);
  const messages = await whatsapp.parseString(string);
  const store = storeMessages(messages);
  return store;
};

export const analyze = async (file: File): Promise<Result> => {
  const store = await processFile(file);

  const masterAccumulator: MasterAccumulator = {
    all: createAccumulator(),
    byUser: {} as MapAccumulator,
    byHour: {} as MapAccumulator,
    byDay: {} as MapAccumulator,
    byDate: {} as MapAccumulator,
  };

  for (const { author, date, type } of store.messages) {
    const mapper: any = {
      all: null,
      byUser: author,
      byHour: date.getHours(),
      byDay: date.getDay(),
      byDate: date.getDate(),
    };

    for (const key in mapper) {
      const index = mapper[key];

      let accumulator: Accumulator;
      if (index !== null) {
        const mapAccumulator = masterAccumulator[key] as MapAccumulator;
        if (!mapAccumulator[index]) {
          mapAccumulator[index] = createAccumulator();
        }

        accumulator = mapAccumulator[index];
      } else {
        accumulator = masterAccumulator.all as Accumulator;
      }

      if (!accumulator.message.byType[type]) {
        accumulator.message.byType[type] = 0;
      }

      accumulator.message.total += 1;
      accumulator.message.byType[type] += 1;
    }
  }

  for (const { author, emoji, messageId } of store.emojiMessages) {
    const { date } = store.messages[messageId];
    const mapper: any = {
      all: null,
      byUser: author,
      byHour: date.getHours(),
      byDay: date.getDay(),
      byDate: date.getDate(),
    };

    for (const key in mapper) {
      const index = mapper[key];

      let accumulator: Accumulator;
      if (index !== null) {
        const mapAccumulator = masterAccumulator[key] as MapAccumulator;
        if (!mapAccumulator[index]) {
          mapAccumulator[index] = createAccumulator();
        }

        accumulator = mapAccumulator[index];
      } else {
        accumulator = masterAccumulator.all as Accumulator;
      }

      if (!accumulator.emoji.byType[emoji]) {
        accumulator.emoji.byType[emoji] = 0;
      }

      accumulator.emoji.total += 1;
      accumulator.emoji.byType[emoji] += 1;
    }
  }

  return {
    accumulator: masterAccumulator,
    store,
  };
};
