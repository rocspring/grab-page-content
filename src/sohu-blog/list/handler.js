module.exports = $ => {
  let $urlList = $('ul li');
  let urlList = [];

  $urlList.each((index, item) => {
    urlList.push($(item).find('.newBlog-list-title a').attr('href'));
  });

  return urlList;
};