
beforeEach(() => {
  jest.resetModules();
});

test('should add an entity', (done) => {
  import('immolation').then(({Entity, World}) => {
    const testEntity = Entity();
    const testWorld = World();

    testWorld.addEntity(testEntity);

    const entities = testWorld.getEntities();

    expect(entities.length).toBe(1);
    done();
  });
});

test('should remove an entity', (done) => {
  import('immolation').then(({Entity, World}) => {
    const testEntity1 = Entity();
    const testEntity2 = Entity();
    const testEntity3 = Entity();
    const testWorld = World();

    testWorld.addEntity(testEntity1);
    testWorld.addEntity(testEntity2);
    testWorld.addEntity(testEntity3);

    testWorld.removeEntity(testEntity2);

    const entities = testWorld.getEntities();

    expect(entities.length).toBe(2);

    expect(entities).toEqual([
      testEntity1,
      testEntity3
    ]);
    done();
  });
});

test('should add a system', (done) => {
  import('immolation').then(({System, World}) => {
    const collisionDetection = (self) => ({
      update: () => {}
    });

    const testSystem = System(collisionDetection);
    const testWorld = World();

    testWorld.addSystem(testSystem);

    const systems = testWorld.getSystems();

    expect(systems.length).toBe(1);
    done();
  });
});

test('should remove a system', (done) => {
  import('immolation').then(({System, World}) => {
    const collisionDetection = (self) => ({
      update: () => {}
    });
    const movement = (self) => ({
      update: () => {}
    });
    const combat = (self) => ({
      update: () => {}
    });
    const testSystem1 = System(collisionDetection);
    const testSystem2 = System(movement);
    const testSystem3 = System(combat);
    const testWorld = World();

    testWorld.addSystem(testSystem1);
    testWorld.addSystem(testSystem2);
    testWorld.addSystem(testSystem3);

    testWorld.removeSystem(testSystem2);

    const systems = testWorld.getSystems();

    expect(systems.length).toBe(2);
    expect(systems).toEqual([testSystem1, testSystem3]);
    done();
  });
});

test('should update all the systems', (done) => {
  import('immolation').then(({System, World}) => {
    const testTimestamp = 11031.68;
    const collisionDetection = (self) => ({
      update: (timestamp) => {
        expect(timestamp).toBe(testTimestamp);
        expect(typeof self.world.getEntities).toBe('function');
      },
      addedToWorld: (world) => {
        self.world = world;
      }
    });
    const movement = (self) => ({
      update: (timestamp) => {
        expect(timestamp).toBe(testTimestamp);
        expect(typeof self.world.getEntities).toBe('function');
      },
      addedToWorld: (world) => {
        self.world = world;
      }
    });
    const combat = (self) => ({
      update: (timestamp) => {
        expect(timestamp).toBe(testTimestamp);
        expect(typeof self.world.getEntities).toBe('function');
        done();
      },
      addedToWorld: (world) => {
        self.world = world;
      }
    });
    const testSystem1 = System(collisionDetection);
    const testSystem2 = System(movement);
    const testSystem3 = System(combat);
    const testWorld = World();

    testWorld.addSystem(testSystem1);
    testWorld.addSystem(testSystem2);
    testWorld.addSystem(testSystem3);

    testWorld.update(testTimestamp);
  });
});
