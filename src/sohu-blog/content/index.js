const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const handlerPage = require('./handler');
const saveContent = require('./save');

const grapContent = url => {
  let options = {
    uri: url,
    encoding: null, // 处理中文乱码
    transform: function (body) {
      let html = iconv.decode(body, 'gb2312');
      return cheerio.load(html, {decodeEntities: false});
    }
  };

  rp(options)
    .then(function ($) {
      saveContent(handlerPage($));
    })
    .catch(function (err) {
      console.log('save content error.');
    });
}

module.exports = {
  grapContent
};
