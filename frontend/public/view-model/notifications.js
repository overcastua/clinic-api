import { NotificationsView } from '../view/index.js';
import NotificationsService from '../service/socket.js';
import { NotificationsModel } from '../model/index.js';

export default class NotificationsViewModel {
  #view;
  #socket;
  #model;

  constructor() {
    this.#view = new NotificationsView();
    this.#socket = new NotificationsService();
    this.#model = new NotificationsModel();

    this.#view.btnMarkAllSeen.addEventListener(
      'click',
      this.#handleResetCount.bind(this),
    );

    this.#socket.listen(
      'new_notification',
      this.#handleNewNotificationReceived.bind(this),
    );
  }

  #handleResetCount() {
    const seen = this.#model.getAll();
    this.#socket.emit('notifications_seen', {
      seen,
    });

    this.#model.clear();

    this.#view.resetNewNotificationsCount();
    this.#view.resetPreviewLatestNotificationText();
  }

  #handleNewNotificationReceived(payload) {
    this.#model.add(payload.id);

    this.#view.increaseNewNotificationsCountByOne();
    this.#view.setPreviewLatestNotificationText(JSON.stringify(payload));
  }
}
