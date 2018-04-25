WebBLE = {}

WebBLE.Device = '';
WebBLE.Server = '';
WebBLE.Service=''
WebBLE.Characteristics = '';
WebBLE.characteristicValueChanged=''
WebBLE.ServiceUuid=0xFFF0;
WebBLE.CharactUuid =0xFFE1;


//编码
function textEncoder(value) {
	var encoder = new TextEncoder('utf-8');
	value = encoder.encode(value)
	return value
}
var  writeValue=textEncoder('writeValue')
// var  readValue=textEncoder('readValue')
//解码	
function textDecoder(value) {
	var decoder = new TextDecoder('utf-8');
	value = decoder.decode(value)
	return value
}


//请求搜索蓝牙设备
WebBLE.request = function(){
	console.log('request')
	console.log(navigator.bluetooth);
	
	navigator.bluetooth.requestDevice({
		filters: [{
			services: [WebBLE.ServiceUuid]
		}],

		// acceptAllDevices: true
	})
	.then(function(device) {
		WebBLE.Device = device;
		return WebBLE.Device
		console.log(WebBLE.Device)
	})
}

//连接蓝牙设备
WebBLE.gattConnect = function(){
	console.log('connect')
	WebBLE.Device.gatt.connect().then(function(server){
		WebBLE.Server=server
		console.log(WebBLE.Server)
	})
}

WebBLE.disconnect=function(){
	console.log('disconnect')
	WebBLE.gatt.disconnect()
	console.log(WebBLE.gatt.connect)
}

//取蓝牙服务
WebBLE.getService=function(){
	console.log('getService')
	WebBLE.Server.getPrimaryService(WebBLE.ServiceUuid).then(function(service){
		WebBLE.Service=service
		console.log(WebBLE.Service)
	})
}

//取蓝牙属性
WebBLE.getCharacteristics=function(){
	console.log('getCharacteristics')
	WebBLE.Service.getCharacteristics(WebBLE.CharactUuid).then(function(characteristics){
		for(key in characteristics)	{
			console.log(characteristics)
		}
		WebBLE.Characteristics=characteristics[0]
		
		console.log(WebBLE.Characteristics)
	})
}	

//监听蓝牙
WebBLE.openListener=function(){
	console.log('openListener')
	WebBLE.Characteristics.startNotifications().then(function(){
		console.log('监听开启')
	})

}

//监听改变的值

WebBLE.changeListener=function(){
	console.log('changeListener')
	WebBLE.Characteristics.addEventListener('characteristicvaluechanged',function(success){
		console.log(success)
		var changevalue=success.target.value
		// WebBLE.Characteristics.writeValue(textEncoder('lastTime'))
		console.log('监听到了改变事件'+textDecoder(changevalue))
	})
}

//关闭监听
WebBLE.closeListener=function(){
	console.log('closeListener')
	WebBLE.Characteristics.stopNotifications().then(function(){
		console.log('监听关闭')
	})

}
//写入值
WebBLE.writeValue=function(){
	console.log('writeValue')
	WebBLE.Characteristics.writeValue(writeValue)
}
//读取值
WebBLE.readValue=function(){
	console.log('readValue')
	WebBLE.Characteristics.readValue()
	.then(function(Values){
		console.log(textDecoder(Values))
	})
	console.log(WebBLE.Characteristics.readValue())
}
