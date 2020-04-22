
/**
 * Each System runs continuously (as though each System had its own
 * private thread) and performs global actions on every Entity that
 * possesses a Component of the same aspect as that System.
 */


function System(behavior) {
  /**
   * Override this function in your system if you wish to use it.  It
   * will be called when this System is added to the World.
   *
   * @param {Object} world - A reference to the World
   */
  const addedToWorld = (world) => {};

  /**
   * Override this function in your system if you wish to use it.
   * It will be called when this System is removed from the World.
   */
  const removedFromWorld = () => {};

  const self = {addedToWorld, removedFromWorld};

  return Object.assign(self, behavior(self));
}

export default System;
