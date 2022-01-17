import { NotificationsView } from '../view/index.js';
import { NotificationsModel } from '../model/index.js';

export default class NotificationsViewModel {
  #view;
  #model;

  constructor() {
    this.#view = new NotificationsView();
    this.#model = new NotificationsModel();
    this.#view.increaseNewNotificationsCountByOne();

    this.#view.btnMarkAllSeen.addEventListener(
      'click',
      this.handleResetCount.bind(this),
    );

    setInterval(this.newNotificationReceived.bind(this), 5000);
  }

  handleResetCount() {
    this.#view.resetNewNotificationsCount();
    this.#view.resetPreviewLatestNotificationText();
  }

  async newNotificationReceived() {
    const [shouldUpdate, textPreview] = await this.#model.newNotification();

    if (shouldUpdate) {
      this.#view.increaseNewNotificationsCountByOne();
      this.#view.setPreviewLatestNotificationText(textPreview);
    }
  }
}
