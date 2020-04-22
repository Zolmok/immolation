beforeEach(() => {
  jest.resetModules();
});

test('should create a system', (done) => {
  import('immolation').then(({System}) => {
    const collisionDetection = (self) => ({
      update: () => {}
    });

    const testSystem = System(collisionDetection);

    expect(testSystem).toBe(testSystem);
    done();
  });
});
