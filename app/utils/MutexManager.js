import { Mutex } from 'async-mutex';

const MUTEX_MAX_AGE = 60 * 1000;
const MUTEX_CHECKING_INTERVAL = 60 * 1000;

export class MutexManager {
  static mutexMap = new Map();

  static async acquire(key) {
    let mutex = this.mutexMap.get(key);
    if (!mutex) {
      mutex = {
        instance: new Mutex(),
        maxAge: Date.now() + MUTEX_MAX_AGE,
      };
      this.mutexMap.set(key, mutex);
    } else {
      mutex.maxAge = Date.now() + MUTEX_MAX_AGE;
    }
    const release = await mutex.instance.acquire();
    return release;
  }

  static isAcquired(key) {
    const mutex = this.mutexMap.get(key);
    if (mutex) {
      return mutex.isLocked();
    }
    return false;
  }

  static removeExpiredMutex() {
    const now = Date.now();
    for (const [key, mutex] of this.mutexMap) {
      if (mutex.maxAge < now) this.mutexMap.delete(key);
    }
  }

  static async handleExpiredMutex() {
    setInterval(() => {
      this.removeExpiredMutex();
    }, MUTEX_CHECKING_INTERVAL);
  }
}

MutexManager.handleExpiredMutex();
