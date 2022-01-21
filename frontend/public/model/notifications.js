export default class NotificationsModel {
  #notificationsIds;

  constructor() {
    this.#notificationsIds = [];
  }

  add(id) {
    this.#notificationsIds = this.#notificationsIds.concat(id);
  }

  clear() {
    this.#notificationsIds = [];
  }

  getAll() {
    return this.#notificationsIds;
  }
}
