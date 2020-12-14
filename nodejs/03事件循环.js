//引入 events 模块
var events = require('events');
//创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
//绑定事件及事件的处理程序
// eventEmitter.on('eventName', eventHandler);
//触发事件
// eventEmitter.emit('eventName');

//事件处理程序
var connectHandler = function connected(){
	console.log('链接成功。');

	//触发 data_received 事件
	eventEmitter.emit('data_received');
}

//绑定 connection事件处理程序
eventEmitter.on('connection', connectHandler);

// 绑定 data_received 事件
eventEmitter.on('data_received', function(){
	console.log('数据接收成功。');
})

//触发 connection 事件
eventEmitter.emit('connection');

console.log("程序执行完毕。");