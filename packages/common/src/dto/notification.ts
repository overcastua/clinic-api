export class impl_Notification {
  readonly userId: number;
  readonly payload: Record<string, any>;

  constructor(data?) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
