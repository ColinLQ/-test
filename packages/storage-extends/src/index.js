function toMilliseconds(duration) {
  if (typeof duration === 'number') {
      return duration;
  }
  const { milliseconds = 0, seconds = 0, minutes = 0, hours = 0, days = 0, weeks = 0, millisecond = 0, second = 0, minute = 0, hour = 0, day = 0, week = 0, ms = 0, s = 0, m = 0, h = 0, d = 0, w = 0, } = duration;
  return (milliseconds || millisecond || ms)
      + (seconds || second || s) * 1000
      + (minutes || minute || m) * 60 * 1000
      + (hours || hour || h) * 60 * 60 * 1000
      + (days || day || d) * 24 * 60 * 60 * 1000
      + (weeks || week || w) * 7 * 24 * 60 * 60 * 1000;
}
/**
* 存值函数
*
* @param  {string}            key      键
* @param  {any}               value    值
* @param  {DurationUnitsType} duration 有效时长
*
* @return {[void]}                     值
*/
Storage.prototype.setExpireItem = function (key, value, duration) {
  // 依赖 dayjs Duration 插件
  const expire = toMilliseconds(duration);
  // 判断传入的有效期是否为数值或有效
  if (expire || expire < 1) {
      throw new Error('有效期应为一个有效数值');
  }
  let obj = {
      data: value,
      time: Date.now(),
      expire, //过期时间
  };
  // 注意，localStorage 不能直接存储对象类型，sessionStorage 也一样
  // 需要先用JSON.stringify()将其转换成字符串，取值时再通过JSON.parse()转换回来
  this.setItem(key, JSON.stringify(obj));
};
/**
* 取值函数
*
* @param  {string} key 存值的键
*
* @return {any}        存的值
*/
Storage.prototype.getExpireItem = function (key) {
  const originVal = localStorage.getItem(key);
  // 如果没有值就直接返回null
  if (!originVal) {
      return originVal;
  }
  // 存的时候转换成字符串了，现在转回来
  try {
      const val = JSON.parse(originVal);
      // 存值时间戳 + 有效时间 = 过期时间戳
      // 如果当前时间戳大于过期时间戳说明过期了，删除值并返回空
      if (Date.now() > Number(val.time) + Number(val.expire)) {
          localStorage.removeItem(key);
          return;
      }
      return val.data;
  }
  catch (e) {
      // 如果 JSON.parse 解析不出来，说明数据被损坏，删除值并返回空
      localStorage.removeItem(key);
      return;
  }
};
