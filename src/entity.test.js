
beforeEach(() => {
  jest.resetModules();
});

test('should have an id', (done) => {
  import('immolation').then(({Entity}) => {
  const testEntity = Entity();

    expect(testEntity.id).toBe(1);
    done();
  });
});

test('should increment id', (done) => {
  import('immolation').then(({Entity}) => {
    const first = Entity();
    const second = Entity();
    const third = Entity();

    expect(first.id).toBe(1);
    expect(second.id).toBe(2);
    expect(third.id).toBe(3);
    done();
  });
});

test('should add components', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {name: 'test-component3', value: 12};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop2, prop3]
    });
    done();
  });
});

test('should add components with name property', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {value: 12};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);
  }).catch((error) => {
    expect(error.message).toEqual('components should have a unique name property');
    done();
  });
});

test('should add components with a unique name', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {name: 'test-component2', value: 12};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);
  }).catch((error) => {
    expect(error.message).toEqual('components should have a unique name property');
    done();
  });
});

test('should remove a component', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {name: 'test-component3', value: {number: 12}};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    player.removeComponent('test-component2');

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop3]
    });

    player.removeComponent({number: 10, number2: 11});

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop3]
    });

    done();
  });
});

test('should remove exact object from component', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {name: 'test-component3', value: {number: 12}};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    player.removeComponent({number2: 11});

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop2, prop3]
    });

    done();
  });
});

test('should remove deeply nested object from component', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {
      name: 'test-component3',
      value: {
        properties: {
          number: 10
        }
      }
    };

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    player.removeComponent('test-component3');

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop2]
    });

    done();
  });
});

test('should remove exact object from deeply nested component', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {
      name: 'test-component3',
      value: {
        properties: {number: 10}
      }
    };

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    player.removeComponent({properties: {number2: 11}});

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop2, prop3]
    });

    done();
  });
});

test('should remove object with same value from component', (done) => {
  import('immolation').then(({Entity}) => {
    const player = Entity();
    const prop1 = {name: 'test-component1', value: 10};
    const prop2 = {name: 'test-component2', value: 11};
    const prop3 = {name: 'test-component3', value: {number: 12}};

    player.addComponent(prop1);
    player.addComponent(prop2);
    player.addComponent(prop3);

    player.removeComponent({number: 11});

    expect(player.toObject()).toEqual({
      id: 1,
      components: [prop1, prop2, prop3]
    });

    done();
  });
});
