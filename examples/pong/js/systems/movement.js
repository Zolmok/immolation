/**
 * How to move various entities around the game board
 */
function Movement (self) {
  let paddle1Up = false;
  let paddle1Down = false;
  let paddle2Up = false;
  let paddle2Down = false;

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    switch (keyName) {
      case 'w': // paddle1 up
        paddle1Up = true;
        break;
      case 's': // paddle1 down
        paddle1Down = true;
        break;
      case 'ArrowUp': // paddle2 up
        paddle2Up = true;
        break;
      case 'ArrowDown': // paddle2 down
        paddle2Down = true;
        break;

      default:
        break;
    }
  }, false);

  document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    switch (keyName) {
      case 'w': // paddle1 up
        paddle1Up = false;
        break;
      case 's': // paddle1 down
        paddle1Down = false;
        break;
      case 'ArrowUp': // paddle2 up
        paddle2Up = false;
        break;
      case 'ArrowDown': // paddle2 down
        paddle2Down = false;
        break;

      default:
        break;
    }
  }, false);

  return {
    // Called from the world
    update: (timestamp) => {
      const entities = self.world.getEntities();

      let ball;
      let paddle1;
      let paddle2;

      entities.forEach((entity) => {
        entity.components.forEach((component) => {
          if (component.name === 'ball') {
            ball = {
              direction: component.direction,
              position: component.position,
              velocity: component.velocity
            };
          }
          if (component.name === 'paddle1') {
            paddle1 = {
              dimensions: component.dimensions,
              position: component.position,
              velocity: component.velocity
            };
          }
          if (component.name === 'paddle2') {
            paddle2 = {
              dimensions: component.dimensions,
              position: component.position,
              velocity: component.velocity
            };
          }
        });
      });

      // move the ball around
      if (ball.direction.path === 'left') {
        ball.position.x -= ball.velocity;
      } else {
        ball.position.x += ball.velocity;
      }
      if (ball.direction.angle === 'down') {
        ball.position.y += (ball.velocity - 1);
      } else {
        ball.position.y -= (ball.velocity - 1);
      }

      // move paddle1 around
      if (paddle1Up && paddle1.position.y >= 0) {
        paddle1.position.y -= paddle1.velocity;
      }
      if (paddle1Down && (paddle1.position.y + paddle1.dimensions.height) <= 300) {
        paddle1.position.y += paddle1.velocity;
      }

      // move paddle2 around
      if (paddle2Up && paddle2.position.y >= 0) {
        paddle2.position.y -= paddle2.velocity;
      }
      if (paddle2Down && (paddle2.position.y + paddle2.dimensions.height) <= 300) {
        paddle2.position.y += paddle2.velocity;
      }
    },
    addedToWorld: (world) => {
      self.world = world;
    },
    removeFromWorld: () => {
      self.world = null;
    }
  };
}

export default Movement;
