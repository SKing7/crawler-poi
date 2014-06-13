var request = require('request');
var co = require('cheerio');
var _ = require('lodash');
var _global = {};
var ops = {
    url: 'http://www.dianping.com/shop/4512919',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
}
var c_q = [];
request(ops, function (error, result) {
    var $ = co.load(result.body);
    var r_f =  '.shop-info-con';
    var shopTitle = $(r_f + ' .shop-title').html();
    var shopLoc = $(r_f + ' .shop-location');
    var locInfo = $(shopLoc).find('li');
    var address = '';
    var phone= '';
    var i = 0;
    _.forEach(locInfo, function (nd) {
        var liText = $(nd).html().replace(/<em>[\s\S]*?<\/em\>/, '');
        if (i === 0) {
            address = joinNodes(liText.replace(/<div.*?class="mall".*?<\/div\>/g, ''), '');
        } else if (i=== 1){
            phone = joinNodes(liText, '/');
        }
        i++;
    });
console.log(decodeEntity(joinNodes(shopTitle), ''));
console.log(decodeEntity(address));
console.log(phone);
return;
    var branchWp = $(r_f + ' .subbranch-list');
    if (branchWp) {
        var list = branchWp.find('li'); 
        $.each(list, function (nd) {
            c_q.push($(nd).find('h4 a').html());
        });
    }
    
});
function joinNodes(html, separator) {
        return html.replace(/<[^>]+?\>/g, '').replace(/(^\s+)|(\s+$)/, '').replace(/\s+/g, separator);
}
function decodeEntity(entity) {
    var gTextArea = _global['textarea'];
    if (!gTextArea) {
        _gTextArea = _global['textarea'] = co('<textarea></textarea>');
    }
    _gTextArea.html(entity);
    return _gTextArea.text();
}
