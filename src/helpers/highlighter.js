module.exports = function(resultItem, objOptions) {
  const prefix = objOptions.highlight.prefix || '<b>';
  const suffix = objOptions.highlight.suffix || '</b>';
  const recursiveOpt = objOptions.recursive;

  resultItem.matches.forEach(matchItem => {
    var text = resultItem.item[matchItem.key];
    var result = [];
    var matches = [].concat(matchItem.indices); // limpar referencia
    var pair = matches.shift();

    for (var i = 0; i < text.length; i++) {
      var char = text.charAt(i);
      if (pair && i == pair[0]) {
        result.push(prefix);
      }
      result.push(char);
      if (pair && i == pair[1]) {
        result.push(suffix);
        pair = matches.shift();
      }
    }
    resultItem.highlight = result.join('');

    if (
      recursiveOpt.enabled &&
      recursiveOpt.key &&
      resultItem[recursiveOpt.key] &&
      resultItem[recursiveOpt.key].length > 0
    ) {
      resultItem[recursiveOpt.key].forEach(child => {
        highlighter(child);
      });
    }
  });
};
