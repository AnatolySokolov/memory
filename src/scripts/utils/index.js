export default class Utils {
  static getImportAssets(r, re) {
    const cache = {};

    r.keys().forEach((key) => {
      const id = key.replaceAll(re, '');

      cache[id] = r(key);
    });

    return cache;
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }
}
