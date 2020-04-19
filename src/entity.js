
/**
 * The entity is a general purpose object. Usually, it only consists
 * of a unique id. They "tag every coarse gameobject as a separate
 * item". Implementations typically use a plain integer for this.
 */


function Entity(id) {
  this.id = id;

  return {
  };
}

export default Entity;
