import emojiRegex from 'emoji-regex';
import { Message } from 'whatsapp-chat-parser';

interface EmojiMessage {
  author: string;
  messageId: number;
  emoji: string;
}

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

  public insert(message: Message) {
    if (message.author === 'System') {
      return;
    }
    const messageId = this.messages.length;

    this.userSet.add(message.author);
    this.messages.push(message);

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

export const storeMessages = (messages: Message[]) => {
  const store = new Store();
  messages.forEach(message => store.insert(message));

  return store;
};
