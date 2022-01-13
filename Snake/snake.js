function startGame() {
	document.getElementById('startButton').disabled = true;
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	var direction, gameOver = 0, first_random = 1, numbers = [], foodx, foody;
	var firstMove = 0, points = 0, speed_level = 300, level = 1;
	var info = document.getElementById('info');
	var infoLevel = document.getElementById('infoLevel');
	
	let snake = [
		{x: 200, y: 200},
		{x: 190, y: 200},
		{x: 180, y: 200},
		{x: 170, y: 200},
		{x: 160, y: 200},
	];
	info.innerHTML = "For now you have " + points + " points! Try and make as many points as possible!";
	infoLevel.innerHTML = "speed-LEVEL: " + level;
	main();
	function main() {
		setTimeout(function onTick() {
			if (gameOver == 0) {
				moveSnake();
				drawSnake();
				checkGame();
				createFood();
				main();
			}
		}, speed_level);
	}

	function drawSnakePart(snakePart) {
		board_2d.fillStyle = 'lightBlue';
		board_2d.strokeStyle = 'black';
		board_2d.fillRect(snakePart.x, snakePart.y, 10, 10);
		board_2d.strokeRect(snakePart.x, snakePart.y, 10, 10);
	}
	
	function drawSnake() {
		snake.forEach(drawSnakePart);
	}

	function moveSnake() {
		var head;
		// left
		if (direction == 37) {
			head = {x: snake[0].x - 10, y: snake[0].y};
		// up
		}else if (direction == 38) {
			head = {x: snake[0].x, y: snake[0].y - 10};
		// right
		}else if (direction == 39) {
			head = {x: snake[0].x + 10, y: snake[0].y};
		// down	 
		}else if (direction == 40) {
			head = {x: snake[0].x, y: snake[0].y + 10};
		}
		if (snake[0].x == numbers[foodx] && snake[0].y == numbers[foody]) {
			snake.unshift(head);
			board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
			++points;
			info.innerHTML = points + " points!"
			random();
			createFood();
			if (points % 2 == 0 && speed_level > 60) {
				speed_level -= 20;
				++level;
			}
		}else if (direction >= 37 && direction <= 40) {
			snake.unshift(head);
			snake.pop();
			board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
		}
		infoLevel.innerHTML = "speed-LEVEL: " + level;
	}

	function createFood() {
		board_2d.fillStyle = 'lightgreen';
		board_2d.strokeStyle = 'black';
		board_2d.fillRect(numbers[foodx], numbers[foody], 10, 10);
		board_2d.strokeRect(numbers[foodx], numbers[foody], 10, 10);
		if (first_random == 1) {
			random();
			first_random = 0;
		}	
	}

	function random() {
		for (var i = 0; i < 400; i += 10) {
			numbers.push(i);
		}
		foodx = Math.floor(Math.random() * 40) + 1;
		foody = Math.floor(Math.random() * 40) + 1;
	}

	function checkGame() {
		// Check if snake hit the wall
		if (snake[0].x < 0 || snake[0].x >= 400 || snake[0].y < 0 || snake[0].y >= 400) {
			if (points == 1) {
				info.innerHTML = "GAME OVER! You only got " + points + " point!";
			}else {
				info.innerHTML = "GAME OVER! You only got " + points + " points!";
			}
			gameOver = 1;
		}
		// Check if snake bites itself
		for (var i = 0, j = 1; j < snake.length; ++j) {
			if (snake[i].x == snake[j].x && snake[i].y == snake[j].y) {
				info.innerHTML = "GAME OVER! You only got " + points + " points!";
				gameOver = 1;
			}
		}
	}

	document.onkeydown = checkKey;
	function checkKey(e) {
	    e = e || window.event;
	    // left
	    if (e.keyCode == 37 && direction != 39 && firstMove == 1) {
	    	direction = e.keyCode;
	    // up
	    }else if (e.keyCode == 38 && direction != 40) {
	    	direction = e.keyCode;
	    // right
	    }else if (e.keyCode == 39 && direction != 37) {
	    	direction = e.keyCode;
	    // down
	    }else if (e.keyCode == 40 && direction != 38) {
	    	direction = e.keyCode;
	    }
	    firstMove = 1;
	}
}

function resetGame() {
	startGame();
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
}
