/**
 * Figure out what to do when the ball hits a wall or a paddle
 */
function Collision (self) {
  /**
   * Figure out if the ball hit a paddle
   *
   * @param {Object} ball - the ball properties
   * @param {Object} paddle - the paddle properties
   * @returns {Boolean} - true if the ball hit a paddle, false otherwise
   */
  function didBallHitPaddle(ball, paddle) {
    if (ball.position.x > paddle.position.x &&
        ball.position.x < paddle.position.x + paddle.dimensions.width &&
        ball.position.y > paddle.position.y &&
        ball.position.y < paddle.position.y + paddle.dimensions.height) {
      return true;
    }

    return false;
  }

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
              position: component.position
            };
          }
          if (component.name === 'paddle2') {
            paddle2 = {
              dimensions: component.dimensions,
              position: component.position
            };
          }
        });
      });

      // Did the ball hit a paddle?
      if (didBallHitPaddle(ball, paddle1)) {
        ball.direction.path = 'right';
      }
      if (didBallHitPaddle(ball, paddle2)) {
        ball.direction.path = 'left';
      }

      // Did the ball hit a wall?
      if (ball.position.x >= 300) {
        dispatchEvent(new CustomEvent('player1-score'));
        ball.direction.path = 'left';
      }
      if (ball.position.x <= 0) {
        dispatchEvent(new CustomEvent('player2-score'));
        ball.direction.path = 'right';
      }
      if (ball.position.y >= 300) {
        ball.direction.angle = 'up';
      }
      if (ball.position.y <= 0) {
        ball.direction.angle = 'down';
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

export default Collision;
