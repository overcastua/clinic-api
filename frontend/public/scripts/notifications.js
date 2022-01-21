import { NotificationsViewModel } from '../view-model/index.js';

export default new (class App {
  constructor() {
    try {
      this.app = new NotificationsViewModel();
    } catch (e) {
      console.error(e.message);
    }
  }
})();
