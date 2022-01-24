function startGame() {
	document.getElementById('startButton').disabled = true;
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	var gameOver = 0, first_random = 1, numbers = [], foodx, foody;
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
	var directionOn = 1;
	var LEFT_KEY = 37, UP_KEY = 38, RIGHT_KEY = 39, DOWN_KEY = 40;
	var last_direction = RIGHT_KEY;
	var dx = 10, dy = 0;
	document.onkeydown = checkKey;
	function checkKey(e) {
		
	    e = e || window.event;
	    var direction = e.keyCode;
	    
	    // left
	    if (direction == LEFT_KEY && last_direction != RIGHT_KEY && directionOn == 1) {
	    	dx = -10;
	    	dy = 0;
	    	last_direction = direction;
	    // up
	    }else if (direction == UP_KEY && last_direction != DOWN_KEY && directionOn == 1) {
	    	dx = 0;
	    	dy = -10;
	    	last_direction = direction;
	    // right
	    }else if (direction == RIGHT_KEY && last_direction != LEFT_KEY && directionOn == 1) {
	    	dx = 10;
	    	dy = 0;
	    	last_direction = direction;
	    // down
	    }else if (direction == DOWN_KEY && last_direction != UP_KEY && directionOn == 1) {
	    	dx = 0;
	    	dy = 10;
	    	last_direction = direction;
	    }
	    firstMove = 1;
	    directionOn = 0;
	}

	info.innerHTML = "For now you have " + points + " points! Try and make as many points as possible!";
	infoLevel.innerHTML = "speed-LEVEL: " + level;
	main();
	function main() {
		setTimeout(function onTick() {
			if (gameOver == 0) {
				directionOn = 1;
				moveSnake();
				drawSnake();
				checkGame();
				createFood();
				main();
			}
		}, speed_level);
	}

	function moveSnake() {
		
		var head = {x: snake[0].x + dx, y: snake[0].y + dy};
		
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
		}else if (snake[0].x != numbers[foodx] || snake[0].y != numbers[foody]) {
			snake.unshift(head);
			snake.pop();
			board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
		}
		infoLevel.innerHTML = "speed-LEVEL: " + level;
	}

	function drawSnake() {
		snake.forEach(drawSnakePart);
	}

	function drawSnakePart(snakePart) {
		board_2d.fillStyle = 'lightBlue';
		board_2d.strokeStyle = 'black';
		board_2d.fillRect(snakePart.x, snakePart.y, 10, 10);
		board_2d.strokeRect(snakePart.x, snakePart.y, 10, 10);
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
}

function resetGame() {
	startGame();
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
}
