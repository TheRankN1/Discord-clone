import { v4 as uuidv4 } from 'uuid';

export class GeneratorHelpers {
  public static uuid(): string {
    return uuidv4();
  }

  public static color(): string {
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
  }
}
