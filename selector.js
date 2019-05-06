const equal = require("fast-deep-equal");

module.exports = (...funcs) => {
  let selectorCache = [];

  return state => {
    // retrieve cached value if exists
    const found = selectorCache.find(cacheItem => {
      return equal(state, cacheItem.state);
    });

    if (found !== undefined) {
      return found.result;
    }

    // No cached value
    const result = funcs.pop()(...funcs.map(func => func(state)));
    selectorCache.push({
      state,
      result
    });

    return result;
  };
};
