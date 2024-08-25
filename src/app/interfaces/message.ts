import { Fullname } from './profile';

export interface IMessageInput {
  from: string;
  type: 'text' | 'media';
  text?: string;
  media?: any;
}

export interface RoomMember {
  img: string;
  name: Fullname;
  _id: string;
}

export interface MessageList {
  _id: string;
  lastMsg: string;
  members: RoomMember[];
  msgPrev: string;
}

export interface MessageFrom {
  _id: string;
  name: Fullname;
  img: string;
}

export interface Message {
  _id: string;
  roomId: string;
  from: MessageFrom;
  type: string;
  text?: string;
  media?: string;
  isRead: boolean;
  createdAt: string;
}
