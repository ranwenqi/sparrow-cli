function sliceInput(input, { cursor, delimiter = '\\s' } = {}) {
  var string = '';
  var leftIndex = input.length;
  var rightIndex = input.length;
  var leftRgx = new RegExp(`([^${delimiter}]*)$`);
  var rightRgx = new RegExp(`^([^${delimiter}]*)`);

  /* eslint-disable-next-line eqeqeq, no-eq-null */
  if (cursor == null) {
    return {
      matching: string,
      leftIndex,
      rightIndex,
    };
  }
  cursor = Math.min(input.length, cursor);
  cursor = Math.max(0, cursor);

  if (leftRgx.test(input.slice(0, cursor))) {
    string += RegExp.$1;
    leftIndex = cursor - RegExp.$1.length;
  }
  if (rightRgx.test(input.slice(cursor))) {
    string += RegExp.$1;
    rightIndex = cursor + RegExp.$1.length;
  }
  return {
    matching: string,
    leftIndex,
    rightIndex,
  };
}

module.exports = sliceInput;
