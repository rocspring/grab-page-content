module.exports = $ => {
  let $content = $('.revoArtRight');
  let title = $content.find('.newBlog-title h2').text();
  let date = $content.find('.newBlog-top-opration .date').text();
  let nextPageUrl = $content.find('.newBlog-bom-pn .bom-n a').attr('href');
  let $contentList = [];
  let content = '';

  // 处理多种不同格式的结构
  if ($content.find('.item-content>div>span p').length > 0) {
    $contentList =$content.find('.item-content>div>span p'); 
  } else if ($content.find('.item-content>div:first-child p').length > 0) {
    $contentList = $content.find('.item-content>div:first-child p'); 
  } else if ($content.find('.item-content>div:first-child div').length > 0) {
    $contentList = $content.find('.item-content>div:first-child div'); 
  } else if ($content.find('.item-content>p').length > 0) {
    $contentList = $content.find('.item-content>p'); 
  }


  $contentList.each((index, item) => {
    content += $(item).text() + '\n';
  });

  console.log(title);

  let obj = {
    title,
    date,
    content
  };

  return obj;
};