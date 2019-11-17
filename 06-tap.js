/**
 * 注册轻击操作的函数
 * @param { Element } element 绑定tap事件的元素
 * @param { Function } callback 事件处理程序
 * @param { Number } spanTime 轻击操作的时限
 * @param { Number } distance 轻击操作的距离
 * @returns { undefined }
 */
function tap(element,callback,spanTime,distance) {
  spanTime = spanTime || 250;
  distance = distance || 50;
  // 定义变量记录点下的时间
  let startTime;
  // 定义变量，记录开始的点
  let startX, startY;
  // 注册触摸开始事件
  element.addEventListener('touchstart', function (e) {
    // 判断是否单指操作
    if (e.touches.length !== 1) {
      console.log('不是单指操作');
      return;
    }
    // 记录 点下的时间
    startTime = Date.now();
    // 记录开始的位置
    // console.log(e.touches[0]);
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  })
  // 注册触摸结束事件
  element.addEventListener('touchend', function (e) {
    // 在触摸结束的事件里面，只能使用changedTouches，因为离开了屏幕，屏幕和元素都没有点了
    if (e.changedTouches.length !== 1) {
      console.log('不是单指操作');
      return;
    }
    // 判断 按下的时间
    // 得到松手的时间
    let endTime = Date.now();
    if (endTime - startTime > spanTime) {
      console.log('按下的时间太长了');
      return;
    }
    // 判断松手的位置
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    // 这里判断距离，要忽略方向
    if (Math.abs(endX - startX) > distance || Math.abs(endY - startY) > distance) {
      console.log('滑动的太远了');
      return;
    }
    // 以上条件都不成立，就是一个tap操作了
    // 实现轻击操作的逻辑 - 轻击操作的逻辑是不一定的
    callback();
  })
}
