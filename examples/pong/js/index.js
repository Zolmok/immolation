import {Entity, System, World} from '../../../index.js';
import Collision from './systems/collision.js';
import Movement from './systems/movement.js';

// Game board
const dimensions = {
  'width': 300,
  'height': 300
};
const white = 'rgb(255, 255, 255)';

let player1Score = 0;
let player2Score = 0;
let gameRunning = true;

document.querySelector('#board').width = dimensions.width;
document.querySelector('#board').height = dimensions.height;
document.querySelector('.player1').textContent = player1Score;
document.querySelector('.player2').textContent = player2Score;

// Listen for score updates
addEventListener('player1-score', () => {
  document.querySelector('.player1').textContent = ++player1Score;

  if (player1Score === 10) {
    gameRunning = false;
    document.querySelector('.game-over').textContent = 'GAME OVER';
  }
}, false);
addEventListener('player2-score', () => {
  document.querySelector('.player2').textContent = ++player2Score;

  if (player2Score === 10) {
    gameRunning = false;
    document.querySelector('.game-over').textContent = 'GAME OVER';
  }
}, false);


const canvas = document.getElementById('board');
const paddle1 = Entity();
const paddle2 = Entity();
const ball = Entity();

const paddle1Settings = {
  'name': 'paddle1',
  'position': {
    'x': 5,
    'y': (300 - 50) / 2
  },
  'dimensions': {
    'width': 5,
    'height': 50
  },
  'velocity': 3
};
const paddle2Settings = {
  'name': 'paddle2',
  'position': {
    'x': dimensions.width - 10,
    'y': (300 - 50) / 2
  },
  'dimensions': {
    'width': 5,
    'height': 50
  },
  'velocity': 3
};
const ballSettings = {
  'name': 'ball',
  'position': {
    'x': dimensions.width / 2,
    'y': dimensions.height / 2
  },
  'direction': {
    'angle': 'none', // none, up, down
    'path': 'right'  // right, left
  },
  'velocity': 3
};
const collisionSystem = System(Collision);
const movementSystem = System(Movement);
const world = World();

paddle1.addComponent(paddle1Settings);
paddle2.addComponent(paddle2Settings);
ball.addComponent(ballSettings);

world.addEntity(paddle1);
world.addEntity(paddle2);
world.addEntity(ball);

world.addSystem(collisionSystem);
world.addSystem(movementSystem);

const ctx = ((getContext) => {
  if (canvas.getContext) {
    return canvas.getContext('2d');
  }

  return null;
})(canvas.getContext);

const Paddle = ({x, y, width, height, color}) => {
  const _x = x;
  const _y = y;
  const _width = width;
  const _height = height;
  const _color = color;

  const draw = () => {
    ctx.fillStyle = color;
    ctx.fillRect(_x, _y, _width, _height);
  };

  const update = () => {
    draw();
  };

  const self = {
    update
  };

  return self;
};

const Ball = ({x, y, radius, color}) => {
  const _x = x;
  const _y = y;
  const _radius = radius;
  const _color = color;

  const draw = () => {
    ctx.beginPath();
    ctx.arc(_x, _y, _radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const update = () => {
    draw();
  };

  const self = {
    update
  };

  return self;
};

const gameLoop = (timestamp) => {
  ctx.clearRect(0, 0, dimensions.width, dimensions.height); // clear canvas

  // paddles
  const paddle1 = Paddle({
    x: paddle1Settings.position.x,
    y: paddle1Settings.position.y,
    width: paddle1Settings.dimensions.width,
    height: paddle1Settings.dimensions.height,
    color: white
  });
  const paddle2 = Paddle({
    x: paddle2Settings.position.x,
    y: paddle2Settings.position.y,
    width: paddle2Settings.dimensions.width,
    height: paddle2Settings.dimensions.height,
    color: white
  });

  // ball
  const ball = Ball({
    x: ballSettings.position.x,
    y: ballSettings.position.y,
    radius: 5,
    color: white
  });

  paddle1.update();
  paddle2.update();
  ball.update();
  world.update(timestamp);

  if (gameRunning) {
    requestAnimationFrame(gameLoop);
  }
};

// Start game button-handler
document.querySelector('.start-game').addEventListener('click', () => {
  gameRunning = true;
  player1Score = 0;
  player2Score = 0;

  document.querySelector('.game-over').textContent = '';
  document.querySelector('.player1').textContent = player1Score;
  document.querySelector('.player2').textContent = player2Score;

  requestAnimationFrame(gameLoop);
});
