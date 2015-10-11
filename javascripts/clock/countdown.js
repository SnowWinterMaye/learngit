var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 700;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curShowTimeSeconds = 0

//var ball = { x: 512, y: 100, r: 20, g: 2, vx: -4, vy: 0, color: "#005588" };
var ball = [];
var colors = ["#33B5E5", "#EE1A30", "#20DD1A", "#0099CC", "#669900", "#FFBB00", "#FF8800", "#CC0000", "#AA1199", "#1166EE"];
app.controller('clockCtrl', function ($timeout, $scope) {
	var canvas = document.getElementById('canvas');
	var content = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	//render(content);
	
	$scope.date = new Date();

	$scope.$watch('date', function (value) {
		var h = $scope.date.getHours(), m = $scope.date.getMinutes(), s = $scope.date.getSeconds();
		render(content, h, m, s);

		//update();
		updateTime();
		//
	});

	function updateBalls() {
		for (var i = 0; i < ball.length; i++) {
			ball[i].x += ball[i].vx;
			ball[i].y += ball[i].vy;
			ball[i].vy += ball[i].g;

			if (ball[i].y > WINDOW_HEIGHT - RADIUS) {
				ball[i].y = WINDOW_HEIGHT - RADIUS;
				ball[i].vy = -ball[i].vy * 0.5;
			}

		}

	}
	function getCurrentShowTimeSeconds() {
		var curTime = new Date();
		//var ret = endTime.getTime() - curTime.getTime();
		var ret = curTime.getTime();
		ret = Math.round(ret / 1000)

		return ret >= 0 ? ret : 0;
	}

	function addBalls(x, y, num) {
		for (var i = 0; i < digit[num].length; i++) {
			for (var j = 0; j < digit[num][i].length; j++) {
				if (digit[num][i][j] == 1) {
					var aBall = {
						x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
						y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
						g: 1.5 + Math.random(),
						vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
						vy: -5,
						color: colors[Math.floor(Math.random() * colors.length)]
					}
					ball.push(aBall);
				}

			}
		}
	}


	function update() {

		var nextShowTimeSeconds = getCurrentShowTimeSeconds();

		var nextHours = parseInt(nextShowTimeSeconds / 3600);
		var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
		var nextSeconds = nextShowTimeSeconds % 60

		var curHours = parseInt(curShowTimeSeconds / 3600);
		var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
		var curSeconds = curShowTimeSeconds % 60

		if (nextSeconds != curSeconds) {
			if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
				addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
			}
			if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
				addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
			}

			if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
				addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
			}
			if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
				addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
			}

			if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
				addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
			}
			if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
				addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
			}

			curShowTimeSeconds = nextShowTimeSeconds;
		}

		updateBalls();
	}


	function updateTime() {
		//每隔1s重新获取一次
		$timeout(function () {
			$scope.date = new Date();
			//
		}, 50);
		update();
	}

});

function render(ext, hours, minutes, second) {
	// var hours = 12;
	// var minutes = 34;
	// var second = 56;
	ext.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);



	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ext);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ext);

	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ext);

	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ext);
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ext);

	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ext);

	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ext);
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ext);

	for (var i = 0; i < ball.length; i++) {
		ext.fillStyle = ball[i].color;
		ext.beginPath();
		ext.arc(ball[i].x, ball[i].y, RADIUS, 0, 2 * Math.PI, true);
		ext.closePath();
		ext.fill();

	}

}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = 'rgb(0,102,153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();

				cxt.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);

				cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					RADIUS,
					0,
					2 * Math.PI)

				cxt.closePath();

				cxt.fill();
			}

		}

	}
}