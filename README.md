# Immolation

## Features
* Entity component system: https://en.wikipedia.org/wiki/Entity_component_system
* 100% test coverage
* Simple API
* Framework agnostic
* 0 dependencies

## Example

``` javascript
// Create some entities which are basically just containers for components
const paddle1 = Entity();
const paddle2 = Entity();
const ball = Entity();

// Create some components which are just settings, no logic
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

// Create some systems which are the logic that glues everything together
function Collision (self) {
  return {
    update: (timestamp) => {
      // logic here for collision system
    },
    addedToWorld: (world) => {
      self.world = world;
    },
    removeFromWorld: () => {
      self.world = null;
    }
  };
}
function Movement (self) {
  return {
    update: (timestamp) => {
      // logic here for collision system
    },
    addedToWorld: (world) => {
      self.world = world;
    },
    removeFromWorld: () => {
      self.world = null;
    }
  };
}

// Register the components with the entities
paddle1.addComponent(paddle1Settings);
paddle2.addComponent(paddle2Settings);
ball.addComponent(ballSettings);

// Register the systems
const collisionSystem = System(Collision);
const movementSystem = System(Movement);

// Create a world which manages all of the entities, components and systems
const world = World();

// Add the entities to the world
world.addEntity(paddle1);
world.addEntity(paddle2);
world.addEntity(ball);

// Add the systems to the world
world.addSystem(collisionSystem);
world.addSystem(movementSystem);

const gameLoop = (timestamp) => {
  world.update(timestamp);

  if (gameRunning) {
    requestAnimationFrame(gameLoop);
  }
};

requestAnimationFrame(gameLoop);
```

For a more detailed working example see the examples directory.  From the root directory of this project run `python -m SimpleHTTPServer 3001` then navigate to the example you want to run so that way the server can access the library which would otherwise be out of the document root.
