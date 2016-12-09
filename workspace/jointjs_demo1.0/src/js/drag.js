

var graph = new joint.dia.Graph();

var paper = new joint.dia.Paper({
	el: $('#myholder'),
	width: 2000,
	height: 1000,
	gridSize: 1,
	model: graph
});
paper.on('cell:pointerup', function(cell,evt,x,y) {
	var clickNode = $("#"+cell.id+" tspan");
	console.log(clickNode.html())//获取实验名称
	$('#right-aside').show()
	
})


var c1;

//jointInitial end

// 上下圆圈模型start
joint.shapes.devs.TopBottomModel = joint.shapes.basic.Generic.extend(_.extend({}, joint.shapes.basic.PortsModelInterface, {

	markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><rect class="imgcircle" /><image class="icon"/><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
	portMarkup: '<g class="port port<%= id %>"><circle class="port-body"/><text class="port-label"/></g>',

	defaults: joint.util.deepSupplement({

		type: 'devs.TopBottomModel',
		size: {
			width: 1,
			height: 1
		},

		inPorts: [],
		outPorts: [],

		attrs: {
			'.': {
				magnet: false
			},
			'.body': {
				width: 150,
				height: 30,
				stroke: 'black',
				'rx': 15,
				'ry': 150,
			},
			'.port-body': {
				r: 6,
				magnet: true,
				stroke: 'black'
			},
			text: {
				fill: 'black',
				'pointer-events': 'none',
				'y-alignment': 'middle',
				'x-alignment': 'middle',
			},
			'.imgcircle': {
				width: 40,
				height: 40,
				'ref-x': -5,
				'ref-y': -5,
				ref: '.body',
				'rx': 20,
				'ry': 20
			},
			'.icon': {
				width: 40,
				height: 40,
				'ref-x': 0,
				'ref-y': 0,
				ref: '.imgcircle'
			},
			'.label': {
				text: '',
				'ref-x': 60,
				'ref-y': .2,
				'ref': '.body'
			},

			// CHANGED: find better positions for port labels 
			'.inPorts .port-label': {
				y: -15,
				x: 4
			},
			'.outPorts .port-label': {
				y: 25,
				x: 4
			}
			//
		}

	}, joint.shapes.basic.Generic.prototype.defaults),

	getPortAttrs: function(portName, index, total, selector, type) {
		var attrs = {};
		var portClass = 'port' + index;
		var portSelector = selector + '>.' + portClass;
		var portLabelSelector = portSelector + '>.port-label';
		var portBodySelector = portSelector + '>.port-body';

		attrs[portLabelSelector] = {
			text: portName
		};
		attrs[portBodySelector] = {
			port: {
				id: portName || _.uniqueId(type),
				type: type
			}
		};

		// CHANGED: swap x and y ports coordinates ('ref-y' => 'ref-x')
		attrs[portSelector] = {
			ref: '.body',
			'ref-x': (index + 0.5) * (1 / total)
		};
		// ('ref-dx' => 'ref-dy')
		if(selector === '.outPorts') {
			attrs[portSelector]['ref-dy'] = 0;
		}

		return attrs;
	}
}));

joint.shapes.devs.TopBottomModelView = joint.shapes.devs.ModelView;

// 上下圆圈模型end

var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};
//获取相关CSS属性
var getCss = function(o, key) {
	return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};

//拖拽的实现
var startDrag = function(target, callback) {
	if(getCss(target, "left") !== "auto") {
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto") {
		params.top = getCss(target, "top");
	}
	target.onmousedown = function(event) {
		params.flag = true;
		if(!event) {
			event = window.event;
			//防止IE文字选中
			target.onselectstart = function() {
				return false;
			}
		}
		var e = event;
		params.currentX = e.clientX - 110 - 100;
		params.currentY = e.clientY - 70 - 15;

		//拖拽创建元素
		params.content = target.innerHTML;
		c1 = new joint.shapes.devs.TopBottomModel({
			position: {
				x: params.currentX,
				y: params.currentY
			},
			size: {
				width: 200,
				height: 30
			},
			inPorts: [''],
			outPorts: ['', ''],
			attrs: {
				'.label': {
					text: params.content,
				},
				'.body': {
					'rx': 15,
					'ry': 150,
				},
				'.icon': {
					'xlink:href': 'img/1.png'
				},
				'.imgcircle': {
					fill: 'rgb(43,142,209)'
				}
			},
		});

		graph.addCells([c1]);

	};

	document.onmousemove = function(event) {
		var e = event ? event : window.event;
		if(params.flag) {
			var myHolder = document.getElementById('myholder');
			var moveX = e.clientX - 110 - 100,
				moveY = e.clientY - 70 - 15;
			c1.position(moveX, moveY)

		};

		if(typeof callback == "function") {
			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		}
	}

	document.onmouseup = function() {
		params.flag = false;
		

	};

};

//避免拖拽时文字被选中
var somediv = document.getElementById("nav-fixed");
disableSelection(somediv)

function disableSelection(target) {
	if(typeof target.onselectstart != "undefined") //IE route  
		target.onselectstart = function() {
		return false
	}
	else if(typeof target.style.MozUserSelect != "undefined") //Firefox route  
		target.style.MozUserSelect = "none"
	else //All other route (ie: Opera)  
		target.onmousedown = function() {
		return false
	}
	target.style.cursor = "default"
}
