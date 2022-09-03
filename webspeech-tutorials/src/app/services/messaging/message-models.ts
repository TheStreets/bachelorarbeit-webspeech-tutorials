import {Subject, Subscription} from "rxjs";

export type ChannelAction =
  | 'open'
  | 'data'
  | 'tab closed';

export interface ChannelPacket {
  data?: unknown | null;
  action?: ChannelAction | null;
}

export type ChannelName = string;

export interface ActiveChannel {
  messages: Subject<ChannelPacket>;
  subscription: Subscription;
  channel: BroadcastChannel;
}

