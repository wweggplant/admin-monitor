/**
 * Parse simple path.
 * 使用:
 *   var obj = {
 *       a: {
 *         b: {
 *           c:"text"
 *         }
 *       }
 *   }
 *   var parseFn = parsePath("a.b.c");
 *   parseFn(obj);//"text"
 *   or
 *    ==>>parsePath("a.b.c")(obj) //"text"
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

export {
  parsePath
}
