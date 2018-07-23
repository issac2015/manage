// 数组去重
export function Unique(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) == -1) {
      res.push(arr[i]);
    }
  }
  return res;
}

// 数组取交集 -- 入参为数组
export function Intersect() {
	let res = [];
  let obj = {};
  for (let i = 0; i < arguments.length; i++) { // 获取到传入的参数 arguments[i]
    for (let j = 0; j < arguments[i].length; j++) { // 遍历数组
      let str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
      } else {
        obj[str]++;
        if (obj[str] == arguments.length) { // 取交集 -- 每个 arr 都有
          res.push(str);
        }
      }
    }
  }
  return res;
}

// 数组取并集 -- 入参为数组
export function Union() {
	let res = [];
  let obj = {};
  for (let i = 0; i < arguments.length; i++) {
    for (let j = 0; j < arguments[i].length; j++) {
      let str = arguments[i][j];
      if (!obj[str]) {
        obj[str] = 1;
        res.push(str);
      }
    }
  }
  return res;
}

/**
 * 日期转字符串
 * @param fmt
 * @returns
 */
export function setDateFormat() {
  Date.prototype.Format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

//兼容苹果浏览器 date的格式为2018-01-01 10:00:00 || 2018/01/01 10:00:00
export function dateFormat(dateStr,fmt) {
  if(dateStr){
    let arr = dateStr.split(/[- : \/]/);
    let date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    return date.Format(fmt);
  }
}

// '1,000.00' -> 1000.00 -- 价格转化
export function removeSeparator(num) {
  if (!num.length) {
    return 0
  }
  let fixNum
  let decimal = num.indexOf('.') ? num.substring(num.indexOf('.')) : 0
  if (decimal - 0 > 0) {
    fixNum = num
  } else {
    fixNum = num.substring(0, num.indexOf('.'))
  }
  fixNum = fixNum.toString().indexOf(',') !== -1 ? fixNum.toString().replace(/,/ig, '') : fixNum
  return parseFloat(fixNum)
}

// '1000.00' -> '1,000.00' -- 价格转化
export function addSeparator(str) {
  if (!str) return '0.00'
  let num = parseFloat(str).toFixed(3)
  let s = num.substring(0, (num.length - 1))
  return s && s.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
    return $1 + ','
  })
}

/**
 *  {getRequest -- 获取 url 搜索部分键所对应的值}
 *  @param name 需要获取所对应值的键
 *  @return     匹配键所得到的值
 * **/
export function getRequest(name) {
  // 去除 ?号 eg: name=Tony&id=1234
  // let urlSearch = window.location.search.substr(1) // 在 vue-router 中获取不到值
  let urlSearch = window.location.href.split('?')[1]; // 根据 ? 分割
  let results = new RegExp('(^|&)' + name + '=([^&]*)').exec(urlSearch);
  if (results) {
    return results[2];
  } else {
    return false;
  }
}

// 更改 url, 加 ?
export function directRightUrl() {
  let { href, protocol, host, search, hash } = window.location;
  const pathname = '/dist/';
  search = search || '?';
  hash = hash || '#/';
  let newHref = `${protocol}//${host}${pathname}${search}${hash}`;
  if (newHref !== href) {
    window.location.replace(newHref);
  }
}

// 客户端系统检查 -- 检测 ios
export function isIOS() {
  return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}

// 检测是否是 安卓
export function isAndroid() {
  // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // 参考android终端
  return /(Android|Adr)/i.test(navigator.userAgent);
}

// 客户端系统检查 -- 微信
export function isWeiXin() {
  let ua = navigator.userAgent.toLowerCase();
  let _MicroMessenger = ua.match(/MicroMessenger/i);
  if (_MicroMessenger && _MicroMessenger[0] === 'micromessenger') {
    let _MicVersion = ua.match(/MicroMessenger\/6.6.6/i);
    let _version = _MicVersion && _MicVersion[0];
    let version = _version && _version.split('/')[1];
    return { isWeiXin: true, version: version, match: _version };
  } else {
    return false;
  }
}

// 压缩图片
export function compressImg(file) {
  return new Promise(function(resolve, reject) {
    // FileReader API IE10 才兼容
    if (typeof FileReader === 'undefined') {
      reject(new Error('该浏览器不兼容 FileReader API'));
      return false;
    }
    // 判断选择的文件是否是图片 type: 'image/jpeg'
    if (file.type.indexOf('image') !== -1) {
      try {
        let reader = new FileReader();
        let img = new Image();
        reader.readAsDataURL(file);
        // 文件base64化，以便获知图片原始尺寸
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        // base64地址图片加载完毕后
        img.onload = function(e) {
          // 图片原始尺寸
          let originWidth = this.width;
          let originHeight = this.height;
          // 最大尺寸限制
          let maxWidth = 1920;
          let maxHeight = 1080;
          // 缩放图片需要的canvas
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          // 目标尺寸
          let targetWidth = originWidth;
          let targetHeight = originHeight;
          // 图片尺寸 超过 400x400 的限制 -- 否则 用原图尺寸
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 计算宽度, 按照宽度 限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
          }
          // canvas 对图片进行缩放
          canvas.width = targetWidth + 200;
          canvas.height = targetHeight + 200;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩 -- 传入 Image 对象 img
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          try {
            // canvas 转为 blob (二进制流)
            canvas.toBlob(
              function(blob) {
                resolve(blob);
              },
              file.type || 'image/png',
              0.95
            );
          } catch (err) {
            reject(err);
          }
          // canvas 转为 base64 格式信息; qualityArgument 默认值是0.92，是一个比较合理的图片质量输出参数
          // let base64Datas = canvas.toDataURL(file.type || 'image/png', 0.92)
          // resolve(base64Datas)
        };
      } catch (err) {
        reject(err);
      }
    } else {
      reject(new Error('该处理的文件类型不对，请上传 image 类型的文件'));
    }
  });
}

// H5接口获取用户地理位置
export function GetLocation(opt, instance) {
  opt = opt || {};
  let that = instance;
  let options = {
    enableHightAccuracy: opt.enableHightAccuracy || true, // 获取高精度位置
    maximumAge: opt.maximumAge || 30000, // 30s 过期时间
    timeout: opt.timeout || 15000 // ms 15000
  };

  return new Promise(function(resolve, reject) {
    // geolocation 在 IE9之后 才支持
    if (typeof navigator.geolocation === 'undefined') {
      reject(new Error('该浏览器不兼容 geolocation API'));
      return false;
    }
    navigator.geolocation.getCurrentPosition(
      function(position) {
        that.$store.commit('latMemory', { lat: position.coords.latitude });
        that.$store.commit('lngMemory', { lng: position.coords.longitude });
        resolve(position);
      },
      function(err) {
        reject(err);
      },
      options
    );
  });
}

// 返回从 x 轴到点 (x, y) 之间的角度
export function GetAngle(x, y) {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

// 返回值: 0, 1 上 2 下 3 左 4 右 -- 可能由于浏览器,而无法判断向下划
export function GetDirection(touchs) {
  let res = {
    code: 0
  };
  if (!touchs) {
    return res;
  }
  let x = touchs.endx - touchs.startx;
  // y 的值 上小下大 -- 对其取相反数
  let y = -(touchs.endy - touchs.starty);
  res.distance = {
    x: x,
    y: y
  };
  if (Math.abs(x) < 2 && Math.abs(y) < 2) {
    return res;
  }
  let angle = GetAngle(x, y);
  if (angle > 45 && angle < 135) {
    // 45< angle <= 135 -- 1 上
    res.code = 1;
  } else if (angle < -45 && angle > -135) {
    // -135< angle <= -45 -- 2 下
    res.code = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle <= -135)) {
    //  135< angle < 180 || -180< angle < -135 左
    res.code = 3;
  } else if (angle >= -45 && angle <= 45) {
    // -45< angle <45 右
    res.code = 4;
  }
  return res;
}
