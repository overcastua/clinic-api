export default class NotificationsView {
  #newNotificationsCount;
  #previewLatestNotificationText;
  #defaultNewNotificationsCount = '';
  #defaultPreviewLatestNotificationText = '';
  #cutCountAt = 99;
  btnMarkAllSeen;

  constructor() {
    this.#newNotificationsCount = document.getElementById(
      'notifications-count',
    );
    this.btnMarkAllSeen = document.getElementById('mark-as-seen-btn');
    this.#previewLatestNotificationText = document.getElementById(
      'notifications-preview',
    );
  }

  increaseNewNotificationsCountByOne() {
    if (this.#newNotificationsCount.classList.contains('no-notifications')) {
      this.#newNotificationsCount.classList.remove('no-notifications');
    }

    const count = parseInt(this.#newNotificationsCount.textContent);
    const newCount = Number.isNaN(count) ? 1 : count + 1;
    this.#newNotificationsCount.textContent =
      newCount > this.#cutCountAt
        ? this.#cutCountAt.toString() + '+'
        : newCount;
    return this;
  }

  resetNewNotificationsCount() {
    this.#newNotificationsCount.textContent =
      this.#defaultNewNotificationsCount;
    this.#newNotificationsCount.classList.add('no-notifications');
    return this;
  }

  setPreviewLatestNotificationText(preview) {
    this.#previewLatestNotificationText.textContent = preview;
    return this;
  }

  resetPreviewLatestNotificationText() {
    this.#previewLatestNotificationText.textContent =
      this.#defaultPreviewLatestNotificationText;
    return this;
  }
}
