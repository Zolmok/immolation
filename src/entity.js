
/**
 * The entity is a general purpose object. Usually, it only consists
 * of a unique id. They "tag every coarse gameobject as a separate
 * item". Implementations typically use a plain integer for this.
 */

const idCounter = {};
const prefix = 'entityCounter';

function Entity() {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  let _components = [];

  const _id = ++idCounter[prefix];

  /**
   * Component to associate with this Entity
   *
   * @param {Object} component - component to add
   */
  const addComponent = (component) => {
    const error = 'components should have a unique name property';

    if (typeof component.name !== 'string') {
      throw new Error(error);      
    }
    if (_components.find((properties) => properties.name === component.name)) {
      throw new Error(error);
    }

    _components.push(component);
  };

  /**
   * Component to remove from this Entity
   *
   * @param {Object} component - component to remove
   */
  const removeComponent = (name) => {
    _components = _components.filter((properties) => properties.name !== name);
  };

  /**
   * Return this object for debugging
   */
  const toObject = () => {
    return {id: _id, components: _components};
  };

  const self = {id: _id, addComponent, removeComponent, toObject, components: _components};

  return self;
}

export default Entity;
