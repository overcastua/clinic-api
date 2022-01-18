import { NotificationsView } from '../view/index.js';
import { NotificationsModel } from '../model/index.js';

export default class NotificationsViewModel {
  #view;
  #model;

  constructor() {
    this.#view = new NotificationsView();
    this.#model = new NotificationsModel();

    this.#view.btnMarkAllSeen.addEventListener(
      'click',
      this.#handleResetCount.bind(this),
    );

    this.#model.listenEvent(
      'new_notification',
      this.#handleNewNotificationReceived.bind(this),
    );
  }

  #handleResetCount() {
    this.#view.resetNewNotificationsCount();
    this.#view.resetPreviewLatestNotificationText();
  }

  #handleNewNotificationReceived(payload) {
    this.#view.increaseNewNotificationsCountByOne();
    this.#view.setPreviewLatestNotificationText(JSON.stringify(payload));
  }
}
