/*!

 @Title: Layui
 @Description：经典模块化前端框架
 @Site: www.layui.com
 @Author: 贤心
 @License：MIT

 */
 
!function(win) {
  
"use strict";

// 类 -- 函数原型
var Lay = function() { 
  this.v = '1.0.9_rls'; //版本号
};

Lay.fn = Lay.prototype;

var doc = document;
var config = Lay.fn.cache = {};

//获取layui所在目录 -- http://localhost:8080/chat_room/layui/
var getPath = function() { // 此函数会立即执行；如果没有 getPath = 则会报错
  var js = doc.scripts; 
  var jsPath = js[js.length - 1].src;
  return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
}();

//异常提示
var error = function(msg) {
  win.console && console.error && console.error('Layui hint: ' + msg);
};


var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';

//内置模块
var modules = {
  layer: 'modules/layer' //弹层
  ,laydate: 'modules/laydate' //日期
  ,laypage: 'modules/laypage' //分页
  ,laytpl: 'modules/laytpl' //模板引擎
  ,layim: 'modules/layim' //web通讯
  ,layedit: 'modules/layedit' //富文本编辑器
  ,form: 'modules/form' //表单集
  ,upload: 'modules/upload' //上传
  ,tree: 'modules/tree' //树结构
  ,table: 'modules/table' //富表格
  ,element: 'modules/element' //常用元素操作
  ,util: 'modules/util' //工具块
  ,flow: 'modules/flow' //流加载
  ,carousel: 'modules/carousel' //轮播
  ,code: 'modules/code' //代码修饰器
  ,jquery: 'modules/jquery' //DOM库（第三方）
  
  ,mobile: 'modules/mobile' //移动大模块 | 若当前为开发目录，则为移动模块入口，否则为移动模块集合
  ,'layui.all': 'dest/layui.all' //PC模块合并版
};

config.modules = {}; //记录模块物理路径
config.status = {}; //记录模块加载状态
config.timeout = 10; //符合规范的模块请求最长等待秒数
config.event = {}; //记录模块自定义事件

//定义模块
Lay.fn.define = function(deps, callback) {
  var that = this;
  var type = typeof deps === 'function';
  var mods = function() {
    typeof callback === 'function' && callback(function(app, exports) {
      // function(app, exports) { }); 
      // 即 exports('test', obj);
      layui[app] = exports; // 此处才是追加 test 到 layui 中
      config.status[app] = true; // 设置在 layui.cache.status 中
    });
    return this;
  };
  
  type && ( // 如果 deps传进来的是函数，则callback = deps
    callback = deps,
    deps = []
  );
  // console.log(deps)
  // console.log(callback)
  if(layui['layui.all'] || (!layui['layui.all'] && layui['layui.mobile'])) {
    // layui.define(function(exports) { 
    //     不会进到这里来
    // }); 
    // call方法: 调用一个对象的一个方法，以另一个对象替换当前对象。 
    // apply方法：应用某一对象的一个方法，用另一个对象替换当前对象。
    // console.log(">>>>  layui.all") 
    return mods.call(that);
  }
  
  that.use(deps, mods); // deps = []
  return that;
};

//使用特定模块
// 通过 callback.apply(layui, exports) 将特定模块加进去
Lay.fn.use = function(apps, callback, exports) {
  var that = this;
  var dir = config.dir = config.dir ? config.dir : getPath;
  var head = doc.getElementsByTagName('head')[0];
  apps = typeof apps === 'string' ? [apps] : apps; // apps 是数组
  // console.log(apps)

  //如果页面已经存在jQuery1.7+库且所定义的模块依赖jQuery，则不加载内部jquery模块
  if(window.jQuery && jQuery.fn.on) {
    that.each(apps, function(index, item) {
      if(item === 'jquery') {
        apps.splice(index, 1);
      }
    });
    layui.jquery = jQuery;
  }
  
  var item = apps[0];
  var timeout = 0;
  exports = exports || [];
  

  //静态资源host -- //localhost:8080/
  config.host = config.host || (dir.match(/\/\/([\s\S]+?)\//)||['//'+ location.host +'/'])[0];
  
  if(apps.length === 0 
  || (layui['layui.all'] && modules[item]) 
  || (!layui['layui.all'] && layui['layui.mobile'] && modules[item])
  ){
    // console.log(">>>> onCallback");  // 不执行下面代码
    return onCallback(), that;  
  }

  //加载完毕
  function onScriptLoad(e, url) {

    var readyRegExp = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
    
    if (e.type === 'load' || (readyRegExp.test((e.currentTarget || e.srcElement).readyState))) {
      config.modules[item] = url;
      
      head.removeChild(node);
      (function poll() {
        if(++timeout > config.timeout * 1000 / 4){
          return error(item + ' is not a valid module');
        };
        config.status[item] ? onCallback() : setTimeout(poll, 4);
      }());
    }
  }

  //加载模块
  var node = doc.createElement('script');
  // url -- http://localhost:8080/chat_room/layui/lay/modules/tree.js
  var url =  (
    modules[item] ? (dir + 'lay/') : (config.base || '')
  ) + (that.modules[item] || item) + '.js';

  
  node.async = true;
  node.charset = 'utf-8';
  node.src = url + function() {
    var version = config.version === true 
    ? (config.v || (new Date()).getTime())
    : (config.version||'');
    return version ? ('?v=' + version) : '';
  }();
  
  //首次加载
  if(!config.modules[item]) {
    head.appendChild(node);
    if(node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera){
      node.attachEvent('onreadystatechange', function(e) {
        onScriptLoad(e, url);
      });
    } else {
      node.addEventListener('load', function(e){
        onScriptLoad(e, url);
      }, false);
    }
  } else {
    (function poll() {
      if(++timeout > config.timeout * 1000 / 4){
        return error(item + ' is not a valid module');
      };
      (typeof config.modules[item] === 'string' && config.status[item]) 
      ? onCallback() 
      : setTimeout(poll, 4);
    }());
  }
  
  config.modules[item] = url;
  
  //回调
  function onCallback() {
    // console.log(apps)
    exports.push(layui[item]);
    apps.length > 1 ?
      that.use(apps.slice(1), callback, exports)
    : ( typeof callback === 'function' && callback.apply(layui, exports) );
    // Function.apply(obj,args)方法能接收两个参数
    // obj：这个对象将代替Function类里 this 对象 -- 即 this = layui
    // args：这个是数组，它将作为参数传给 Function(args-->arguments) 即 用arguments去接受参数
  }

  return that;

};

//获取节点的style属性值
Lay.fn.getStyle = function(node, name) {
  var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
  return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
};

//css外部加载器
Lay.fn.link = function(href, fn, cssname) {
  var that = this, link = doc.createElement('link');
  var head = doc.getElementsByTagName('head')[0];
  if(typeof fn === 'string') cssname = fn;
  var app = (cssname || href).replace(/\.|\//g, '');
  var id = link.id = 'layuicss-'+app;
  var timeout = 0;
  
  link.rel = 'stylesheet';
  link.href = href + (config.debug ? '?v='+new Date().getTime() : '');
  link.media = 'all';
  
  if(!doc.getElementById(id)){
    head.appendChild(link);
  }

  if(typeof fn !== 'function') return that;
  
  //轮询css是否加载完毕
  (function poll() {
    if(++timeout > config.timeout * 1000 / 100){
      return error(href + ' timeout');
    };
    parseInt(that.getStyle(doc.getElementById(id), 'width')) === 1989 ? function(){
      fn();
    }() : setTimeout(poll, 100);
  }());
  
  return that;
};

//css内部加载器
Lay.fn.addcss = function(firename, fn, cssname) {
  return layui.link(config.dir + 'css/' + firename, fn, cssname);
};

//图片预加载
Lay.fn.img = function(url, callback, error) {   
  var img = new Image();
  img.src = url; 
  if(img.complete){
    return callback(img);
  }
  img.onload = function(){
    img.onload = null;
    callback(img);
  };
  img.onerror = function(e){
    img.onerror = null;
    error(e);
  };  
};

//全局配置
Lay.fn.config = function(options) {
  options = options || {};
  for(var key in options) {
    config[key] = options[key];
  }
  return this;
};

//记录全部模块 -- 此函数自执行
Lay.fn.modules = function() {
  var clone = {};
  for(var o in modules){
    clone[o] = modules[o];
  }
  return clone;
}();

//拓展模块
Lay.fn.extend = function(options) {
  var that = this;

  //验证模块是否被占用
  options = options || {};
  for(var o in options){
    if(that[o] || that.modules[o]){
      error('\u6A21\u5757\u540D '+ o +' \u5DF2\u88AB\u5360\u7528');
    } else {
      that.modules[o] = options[o];
    }
  }
  
  return that;
};

//路由解析
Lay.fn.router = function(hash) {
  var that = this;
  var hash = hash || location.hash;
  var data = {
    path: [],
    search: {},
    hash: (hash.match(/[^#](#.*$)/) || [])[1] || ''
  };
  
  if(!/^#\//.test(hash)) return data; //禁止非路由规范
  hash = hash.replace(/^#\//, '').replace(/([^#])(#.*$)/, '$1').split('/') || [];
  
  //提取Hash结构
  that.each(hash, function(index, item){
    /^\w+=/.test(item) ? function(){
      item = item.split('=');
      data.search[item[0]] = item[1];
    }() : data.path.push(item);
  });

  return data;
};

//本地存储
Lay.fn.data = function(table, settings) {
  table = table || 'layui';
  
  if(!win.JSON || !win.JSON.parse) return;
  
  //如果settings为null，则删除表
  if(settings === null) {
    return delete localStorage[table];
  }
  
  settings = typeof settings === 'object' 
    ? settings 
  : {key: settings};
  
  try{
    var data = JSON.parse(localStorage[table]);
  } catch(e){
    var data = {};
  }
  
  if(settings.value) data[settings.key] = settings.value;
  if(settings.remove) delete data[settings.key];
  localStorage[table] = JSON.stringify(data);
  
  return settings.key ? data[settings.key] : data;
};

//设备信息
Lay.fn.device = function(key) {
  var agent = navigator.userAgent.toLowerCase();

  //获取版本号
  var getVersion = function(label) {
    var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
    label = (agent.match(exp)||[])[1];
    return label || false;
  };

  var result = {
    os: function(){ //底层操作系统
      if(/windows/.test(agent)){
        return 'windows';
      } else if(/linux/.test(agent)){
        return 'linux';
      } else if(/mac/.test(agent)){
        return 'mac';
      } else if(/iphone|ipod|ipad|ios/.test(agent)){
        return 'ios';
      }
    }()
    ,ie: function(){ //ie版本
      return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
      ) : false;
    }()
    ,weixin: getVersion('micromessenger')  //是否微信
  };
  
  //任意的key
  if(key && !result[key]){
    result[key] = getVersion(key);
  }
  
  //移动设备
  result.android = /android/.test(agent);
  result.ios = result.os === 'ios';
  
  return result;
};

//提示
Lay.fn.hint = function() {
  return {
    error: error
  }
};

//遍历
Lay.fn.each = function(obj, fn) {
  var that = this, key;
  if(typeof fn !== 'function') return that;
  obj = obj || [];
  if(obj.constructor === Object){
    for(key in obj){
      if(fn.call(obj[key], key, obj[key])) break;
    }
  } else {
    for(key = 0; key < obj.length; key++){
      if(fn.call(obj[key], key, obj[key])) break;
    }
  }
  return that;
};

//阻止事件冒泡
Lay.fn.stope = function(e) {
  e = e || win.event;
  e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
};

//自定义模块事件
Lay.fn.onevent = function(modName, events, callback) {
  if(typeof modName !== 'string' || typeof callback !== 'function') {
    return this;
  }

  config.event[modName + '.' + events] = [callback];
  
  //不再对多次事件监听做支持
  /*
  config.event[modName + '.' + events] 
    ? config.event[modName + '.' + events].push(callback) 
  : config.event[modName + '.' + events] = [callback];
  */
  
  return this;
};

//执行自定义模块事件
Lay.fn.event = function(modName, events, params) {
  var that = this;
  var result = null;
  var filter = events.match(/\(.*\)$/)||[]; // 提取事件过滤器
  var set = (events = modName + '.'+ events).replace(filter, ''); // 获取事件本体名
  var callback = function(_, item) {
    var res = item && item.call(that, params);
    res === false && result === null && (result = false);
  };
  layui.each(config.event[set], callback);
  filter[0] && layui.each(config.event[events], callback); // 执行过滤器中的事件
  return result;
};

win.layui = new Lay(); // 实例化类

}(window);

