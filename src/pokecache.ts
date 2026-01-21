type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const cacheEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, cacheEntry);
  }

  get<T>(key: string) {
    return this.#cache.get(key)?.val as T | undefined;
  }

  #reap() {
    this.#cache.forEach((entry, key) => {
      const now = Date.now();
      const expiryTime = entry.createdAt + this.#interval;

      if (now >= expiryTime) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reap();
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    if (this.#reapIntervalId) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
