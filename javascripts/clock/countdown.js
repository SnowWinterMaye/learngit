var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;


app.controller('clockCtrl', function ($timeout,$scope) {
	var canvas = document.getElementById('canvas');
	var content = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	
	//render(content);
	
	$scope.date = new Date();
	
	$scope.$watch('date', function (value) {
		var h = $scope.date.getHours(), m = $scope.date.getMinutes(), s = $scope.date.getSeconds();
		render(content, h, m, s);
		updateTime();
		//
	});

	function updateTime() {
		//每隔1s重新获取一次
		 $timeout(function () {
			$scope.date = new Date();
		}, 1000);
	}
	
});

function render(ext, hours, minutes, second) {
	// var hours = 12;
	// var minutes = 34;
	// var second = 56;
	ext.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ext);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ext);

	renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ext);

	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ext);
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ext);

	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ext);

	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), ext);
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), ext);
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = 'rgb(0,102,153)';

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();

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