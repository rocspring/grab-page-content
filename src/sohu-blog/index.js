const list = require('./list');
const content = require('./content');

list.getList()
  .then(function (list) {
    console.log(list);
    list.forEach((item, index) => {
      setTimeout(() => {
        content.grapContent(item);
      }, index * 10);
    });
  }, function (err) {
    console.log(err);
  });