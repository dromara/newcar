export abstract class EventBuilderItem {
  /**
   * Run it when the event happen.
   */
  abstract on(value: () => void);
}
