const rp = require('request-promise');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const jetpack = require('fs-jetpack');
const handlerPage = require('./handler');
const saveContent = require('./save');
const MAX_PAGE_NUM = 19;

let pageNum = 1;
let listCache = [];

const grapListContent = url => {
  let options = {
    uri: url,
    gzip: true //返回的数据有gzip压缩,需要解压
  };

  return new Promise(function (resolve, reject) {
    rp(options)
    .then(function (data) {
      let $ = cheerio.load(data);
      let content = handlerPage($);
      listCache = listCache.concat(content);
      pageNum++;
      if (pageNum <= MAX_PAGE_NUM) {
        grapListContent(getPageUrl(pageNum));
      } else {
        saveContent(listCache)
          .then(function (data) {
            resolve(listCache);
          })
      }
    })
    .catch(function (err) {
      console.log('save list error.');
      console.log(err);
    }); 
  });
}

const getPageUrl = num => {
  num = num || 1;
  return 'http://zhounianyang.blog.sohu.com/action/v_frag-ebi_4ccf5e4792-pg_' + num + '/entry/';
};

const getList = () => {
  return new Promise(function (resolve, reject) {
    let listPath = 'dist/sohu-blog/list.json';
    let list;
    if (jetpack.exists(listPath)) {
      list = jetpack.read(listPath, 'json');
      resolve(list);
    } else {
      grapListContent(getPageUrl(pageNum))
        .then(function (data) {
          resolve(data);
        })
    }
  });
}

module.exports = {
  getList
};