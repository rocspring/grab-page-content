const jetpack = require('fs-jetpack');

module.exports = content => {
  jetpack
    .dir('dist')
    .dir('sohu-blog');

  return new Promise(function (resolve, reject) {
    jetpack.appendAsync('dist/sohu-blog/list.json', JSON.stringify(content), {
        mode: '700'
      })
      .then(function (data) {
        console.log('save list success.');
        resolve(data);
      });
  });

};