const jetpack = require('fs-jetpack');

module.exports = contetObj => {
  jetpack
    .dir('dist')
    .dir('sohu-blog');

  return new Promise(function (resolve, reject) {
    jetpack.appendAsync('dist/sohu-blog/' + contetObj.date + '.txt', [
        contetObj.title,
        contetObj.date,
        contetObj.content
      ].join('\n'), {
        mode: '700'
      })
      .then(function (data) {
        resolve(data);
      });

  });

};