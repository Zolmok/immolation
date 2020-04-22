
function World() {
  let _entities = [];
  let _systems = [];

  /**
   * Entity to associate with this World
   *
   * @param {Object|string|number} entity - entity to add
   */
  const addEntity = (entity) => {
    _entities.push(entity);
  };

  /**
   * Get a list of Entities added to the world
   *
   * @returns {Array} - array of Entities added to the world
   */
  const getEntities = () => {
    return _entities;
  };

  /**
   * Entity to remove from this World
   *
   * @param {Object|string|number} entity - entity to remove
   */
  const removeEntity = (entity) => {
    _entities = _entities.filter((_entity) => _entity.id !== entity.id);
  };

  /**
   * System to associate with this World
   *
   * @param {Object|string|number} system - system to add
   */
  const addSystem = (system) => {
    system.addedToWorld(self);
    _systems.push(system);
  };

  /**
   * Get a list of Systems added to the world
   *
   * @returns {Object} - an array of Systems added to the world
   */
  const getSystems = () => {
    return _systems;
  };

  /**
   * System to remove from this World
   *
   * @param {Object|string|number} system - system to remove
   */
  const removeSystem = (system) => {
    _systems = _systems.filter((_system) => {
      if (_system !== system) {
        return true;
      }

      system.removedFromWorld();

      return false;
    });
  };

  /**
   * For each System in the world call its `update` method
   *
   * @param {Number} timestamp - timestamp between update calls
   */
  const update = (timestamp) => {
    _systems.forEach((system) => system.update(timestamp));
  };

  const self = {
    addEntity,
    addSystem,
    getEntities,
    getSystems,
    removeEntity,
    removeSystem,
    update
  };

  return self;
}

export default World;
