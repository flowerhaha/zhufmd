let utils = (function(){
  function getCss(ele, attr) {
    var value = null;
    if ('getComputedStyle' in window) { // 检测一下当前getComputedStyle在浏览器下能不能用
      value = getComputedStyle(ele)[attr]
    }
    else {
      value = ele.currentStyle[attr]
    }
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom|opacity)$/;
    // 把这些以后可能会累加的样式转换成数字
    if (reg.test(attr)) {
      value = parseFloat(value)
    }
    return value
  }
  function setCss(ele, attr, value) {
    // 1.先确定当前的样式需不需要单位
    // 2.在确定当前样式用户给有没有加单位
    var reg = /^(width|height|padding|margin|fontSize|lineHeight|left|top|right|bottom)$/;
    if (reg.test(attr)) {
      let number = parseFloat(value); // '100'
      ele.style[attr] = number + 'px'
    }
    ele.style[attr] = value;
  }
  function setGroupCss(ele, obj) {
    // 循环当前对象，然后每循环一次就调用setCss一次
    for (var key in obj) {
      console.log(key);
      if (!obj.hasOwnProperty(key)) return;
      setCss(ele, key, obj[key]);
    }
  }
  function css() {
    // 通过判断用户传参的个数和传递参数的类型，就能判断出用户的意图
    let [ele, attr, value] = arguments;
    // 如果arguments的length是2的话，不是获取就是批量设置
    if (arguments.length === 2) {
      // 如果attr是对象的话，那就是批量设置
      if (typeof attr === 'object') {
        setGroupCss(ele, attr)
      }
      else {
        return getCss(ele, attr)
      }
    }
    // 如果arguments的length是3的话，那就是单个设置
    if (arguments.length == 3) {
      setCss(ele, attr, value)
    }

  }
  function win(attr, value) {
    // 如果value是undefined，说明用户传递的是一个参，那就是想获取浏览器的某个属性对应的值
    if (value === undefined) {
      return document.documentElement[attr] || document.body[attr];
    }
    else {
      document.body[attr] = value;
      document.documentElement[attr] = value;
    }
  }
  function offset(curEle) {
    let l = curEle.offsetLeft;
    let t = curEle.offsetTop;
    let parent = curEle.offsetParent;

    while (parent !== document.body) {
        l += parent.clientLeft + parent.offsetLeft;
        t += parent.clientTop + parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        left: l,
        top: t
    }
}

  return {
    getCss,
    setCss,
    setGroupCss,
    css,
    win,
    offset
  }
})()