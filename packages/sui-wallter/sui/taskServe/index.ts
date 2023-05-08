// 定义要执行的任务
const task1 = () => {
  console.log("任务1");
};
const task2 = () => {
  console.log("任务2");
};
const task3 = () => {
  console.log("任务3");
};

// 定义任务数组
const tasks = [task1, task2, task3];

// 定义任务执行函数
const executeTask = () => {
  // 从任务数组中随机选择一个任务并执行
  const taskIndex = Math.floor(Math.random() * tasks.length);
  const task = tasks[taskIndex];
  task();
};

// 定义定时器并开始执行任务
const intervalID = setInterval(executeTask, 5000);

// 设置定时器的清除函数
const clearTimer = () => {
  clearInterval(intervalID);
};

// 10秒后清除定时器，停止任务执行
setTimeout(clearTimer, 10000);
