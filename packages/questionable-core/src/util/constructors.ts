/* eslint-disable @typescript-eslint/no-explicit-any */
export class Constructor {
  #everUsed = false;

  public get everUsed() {
    return this.#everUsed;
  }

  public construcT<T>(TCtor: new (...args: any[]) => T, ...args: any[]): T {
    // get type of T
    // const type = typeof (TCtor);
    this.#everUsed = true;
    return new TCtor(...args);
  }
}
