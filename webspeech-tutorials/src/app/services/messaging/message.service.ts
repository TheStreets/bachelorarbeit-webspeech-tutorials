import {Injectable, NgZone} from '@angular/core';
import {Observable, Subject, Subscriber} from "rxjs";
import {ActiveChannel, ChannelAction, ChannelName, ChannelPacket} from "./message-models";
import {filter, finalize} from "rxjs/operators";

const CHANNEL_NAME_PREFIX = "WSA-";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  activeChannels: ActiveChannel[] = [];

  constructor(private ngZone: NgZone) {}

  /**
   * Closes underlying channel on unsubscribe
   * Will only receive messages when tab is visible
   */
  getChannelMessages(channelName: ChannelName, action?: ChannelAction): Observable<ChannelPacket> {
    return this.getChannelObject(channelName).messages.pipe(
      filter((message) => {
        if (!action) {
          return true;
        }
        return message.action === action;
      }),
      finalize(() => {
        this.closeChannel(channelName);
      })
    );
  }

  sendMessage(channelName: ChannelName, msg: ChannelPacket): void {
    this.getChannel(channelName).postMessage(msg);
  }

  private getChannelFullName(channelName: ChannelName): ChannelName {
    return CHANNEL_NAME_PREFIX + channelName;
  }

  /** gets open if present or returns a new and stores it */
  private getChannel(channelName: ChannelName): BroadcastChannel {
    return this.getChannelObject(channelName).channel;
  }

  private getChannelObject(channelName: ChannelName): ActiveChannel {
    const channelFullName: string = this.getChannelFullName(channelName);
    const cachedChannel: ActiveChannel | undefined = this.activeChannels
      .find((current) => current.channel.name === channelFullName);
    let channelObject: ActiveChannel;

    if (!cachedChannel) {
      channelObject = this.createNewChannel(channelFullName);
    } else {
      channelObject = cachedChannel;
    }
    return channelObject;
  }

  /** Helper: Creates a new channel given by the channelFullName  */
  private createNewChannel(channelFullName: string): ActiveChannel {
    const channel: BroadcastChannel = new BroadcastChannel(channelFullName);
    const messagesSubject = new Subject<ChannelPacket>();

    // emitting messages one time via a subject as onmessage only emits once for each channel
    const subscription = this.getChannelRawMessages(channel)
      .subscribe((message: any) => {
        // tell angular so change detection is handled properly
        this.ngZone.run(() => {
          messagesSubject.next(message);
        });
      });

    const channelObject: ActiveChannel = {
      channel,
      messages: messagesSubject,
      subscription,
    };
    this.activeChannels.push(channelObject);
    return channelObject;
  }

  private getChannelRawMessages(channel: BroadcastChannel): Observable<ChannelPacket> {
    return new Observable((observer: Subscriber<ChannelPacket>) => {
      channel.onmessage = (messageEvent: MessageEvent) => {
        if (document.visibilityState === 'visible') {
          this.onNewChannelRawMessage(messageEvent, observer);
        }
      };
      channel.onmessageerror = (error) => {
        console.warn('onmessageerror: ', error);
        observer.error(error);
      };
      return () => channel.close();
    });
  }

  private onNewChannelRawMessage(messageEvent: MessageEvent, observer: Subscriber<ChannelPacket>) {
    const receivedMessage: ChannelPacket = messageEvent.data;
    observer.next(receivedMessage);
  }

  /** Close one underlying channel. Usually better to just unsubscribe from the getChannelMessages */
  private closeChannel(channelName: ChannelName) {
    this.getChannelObject(channelName).subscription.unsubscribe();
    this.activeChannels = this.activeChannels.filter(
      (channel) => channel.channel.name !== this.getChannelFullName(channelName)
    );
  }
}
