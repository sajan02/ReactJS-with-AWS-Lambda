export const objectToQueryString = (obj) => {
    return Object.keys(obj).reduce(function (str, key, i) {
      var delimiter, val;
      delimiter = (i === 0) ? '?' : '&';
      key = encodeURIComponent(key);
      val = typeof obj[key] === "object" ? JSON.stringify(encodeURIComponent(obj[key])) : encodeURIComponent(obj[key]) ;
      return [str, delimiter, key, '=', val].join('');
    }, '');
  }