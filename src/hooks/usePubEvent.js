import { EventEmitter } from 'eventemitter3';

const emitter = new EventEmitter();

export const usePubEvent = () => {
    return (event, data) => {
      emitter.emit(event, data);
    };
  };