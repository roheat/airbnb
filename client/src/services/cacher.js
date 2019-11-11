import camelCase from "camel-case";

let instance = null;

class Cacher {
  cache = {};

  constructor() {
    if (!instance) instance = this;

    return instance;
  }

  cacheValue(key, value) {
    this.cache[camelCase(key)] = value;
  }

  getCachedValue(key) {
    return this.cache[camelCase(key)];
  }

  isValueCached(key) {
    return this.getCachedValue(key);
  }
}

export default Cacher;
