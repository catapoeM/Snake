function startGame() {
	document.getElementById('startButton').disabled = true;
	document.getElementById('resetButton').disabled = true;
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	var gameOver = 0, first_random = 1, numbers = [], foodx, foody;
	var points = 0, speed_level = 300, level = 1, directionOn = 1;
	var info = document.getElementById('info');
	var infoLevel = document.getElementById('infoLevel');
	let snake = [
		{x: 200, y: 200},
		{x: 190, y: 200},
		{x: 180, y: 200},
		{x: 170, y: 200},
		{x: 160, y: 200},
	];
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
	    directionOn = 0;
	}
	info.innerHTML = "For now you have " + points + " points! Try and make as many points as possible!";
	infoLevel.innerHTML = "Speed-LEVEL: " + level;
	main();

	function main() {
		setTimeout(function onTick() {
			if (gameOver == 0) {
				directionOn = 1;
				moveSnake();
				drawSnake();
				checkWall();
				checkSnake();
				createFood();
				main();
			}
		}, speed_level);
	}

	function moveSnake() {
		var head = {x: snake[0].x + dx, y: snake[0].y + dy};
		// If snake's head is exactly on the food coordinates, then it grows
		if (snake[0].x == numbers[foodx] && snake[0].y == numbers[foody]) {
			snake.unshift(head);
			board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
			++points;
			info.innerHTML = points + " points!"
			random();
			createFood();
			// If variable "points" is diveded exactly by 2, then increase speed level
			if (points % 2 == 0 && speed_level > 60) {
				speed_level -= 20;
				++level;
			}
		// Otherwise it only moves
		}else if (snake[0].x != numbers[foodx] || snake[0].y != numbers[foody]) {
			snake.unshift(head);
			snake.pop();
			board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
		}
		infoLevel.innerHTML = "Speed-LEVEL: " + level;
	}
	// This function draws any part of the snake 
	function drawSnake() {
		snake.forEach(drawSnakePart);
	}
	// This one draws the colours and the rectangles
	function drawSnakePart(snakePart) {
		board_2d.fillStyle = 'lightBlue';
		board_2d.strokeStyle = 'black';
		board_2d.fillRect(snakePart.x, snakePart.y, 10, 10);
		board_2d.strokeRect(snakePart.x, snakePart.y, 10, 10);
	}
	// This one check if the game hit any wall of bites itself, if this happens then gameover.
	function checkWall() {
		// Check if snake hit the wall and GameOver
		if (snake[0].x < 0 || snake[0].x >= 400 || snake[0].y < 0 || snake[0].y >= 400) {
			if (points == 1) {
				info.innerHTML = "GAME OVER! The snake has hit the wall. You only got " + points + " point!";
			}else {
				info.innerHTML = "GAME OVER! The snake has hit the wall. You only got " + points + " points!";
			}
			gameOver = 1;
			document.getElementById('resetButton').disabled = false;
		}
	}
	// Check if snake bites itself and GameOver
	function checkSnake() {
		for (var i = 0, j = 1; j < snake.length; ++j) {
			if (snake[i].x == snake[j].x && snake[i].y == snake[j].y) {
				info.innerHTML = "GAME OVER! The snake has bitten itself. You only got " + points + " points!";
				gameOver = 1;
				document.getElementById('resetButton').disabled = false;
			}
		}
	}

	function createFood() {
		board_2d.fillStyle = 'lightgreen';
		board_2d.strokeStyle = 'black';
		board_2d.fillRect(numbers[foodx], numbers[foody], 10, 10);
		board_2d.strokeRect(numbers[foodx], numbers[foody], 10, 10);
		// This if conditional makes the first food
		if (first_random == 1) {
			random();
			first_random = 0;
		}	
	}
	// Random number for creating random position for the food
	function random() {
		for (var i = 0; i < 400; i += 10) {
			numbers.push(i);
		}
		foodx = Math.floor((Math.random() * 39) + 1);
		foody = Math.floor((Math.random() * 39) + 1);
	}
}
// Here we reset the game after gameover
function resetGame() {
	startGame();
	var gameBoard = document.getElementById('gameBoard');
	var board_2d = gameBoard.getContext('2d');
	board_2d.clearRect(0, 0, gameBoard.width, gameBoard.height);
}
