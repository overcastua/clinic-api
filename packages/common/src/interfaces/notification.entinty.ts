export interface Notification {
  readonly id: number;

  readonly userId: number;

  readonly name: string;

  readonly isSeen: boolean;

  readonly payload: Record<string, any>;
}
