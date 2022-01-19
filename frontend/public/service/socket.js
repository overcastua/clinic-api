import config from '../config.js';

export default class NotificationsService {
  #socket;

  constructor() {
    try {
      this.#socket = io(config.backend.notificationsService, {
        extraHeaders: {
          Authorization: `Bearer ${config.default_token}`,
        },
      });

      this.#socket.on('connect', this.#handleSocketConnect.bind(this));
      this.#socket.on('disconnect', this.#handleSocketDisconnect.bind(this));
      this.#socket.on('exception', (data) => console.log('event', data));
    } catch (e) {
      console.error(e.message);
    }
  }

  #handleSocketDisconnect() {
    console.log('Websocket disconnected');
  }

  #handleSocketConnect() {
    console.log('Websocket connected');
  }

  listen(event, callback) {
    this.#socket.on(event, (payload) => callback(payload));
  }

  emit(event, data) {
    this.#socket.emit(event, data);
  }
}
