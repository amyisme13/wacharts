import emojiRegex from 'emoji-regex';
import whatsapp from 'whatsapp-chat-parser';

interface Message {
  author: string;
  message: string;
  date: Date;
  type: string;
}

interface EmojiMessage {
  author: string;
  messageId: number;
  emoji: string;
}

const determineType = (string: string) => {
  if (string === '<Media omitted>') {
    return 'media';
  }

  if (string === 'This message was deleted') {
    return 'deleted';
  }

  return 'text';
};

export class Store {
  private userSet = new Set<string>();
  private emojiSet = new Set<string>();

  public messages: Message[] = [];
  public emojiMessages: EmojiMessage[] = [];

  get users() {
    return Array.from(this.userSet);
  }

  get emojis() {
    return Array.from(this.emojiSet);
  }

  public insert(message: whatsapp.Message) {
    if (message.author === 'System') {
      return;
    }

    const messageId = this.messages.length;
    const type = determineType(message.message);

    this.userSet.add(message.author);
    this.messages.push({ ...message, type });

    const regex = emojiRegex();
    let match;
    while ((match = regex.exec(message.message))) {
      this.emojiSet.add(match[0]);

      this.emojiMessages.push({
        author: message.author,
        messageId,
        emoji: match[0],
      });
    }
  }
}

export const storeMessages = (messages: whatsapp.Message[]) => {
  const store = new Store();
  messages.forEach(message => store.insert(message));

  return store;
};
