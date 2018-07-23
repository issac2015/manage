/**
 * 工具函数包 -- 封装使用的静态工具函数
 * @file
 *
 */

var utils = {
  generateMixed: function(n) {
    if (!n) { n =5 }
    var chars = ['0','1','2','3','4','5','6','7','8','9',
      'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
  },
};
