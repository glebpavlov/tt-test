/**
 * decorator for auto-unsubscribe (unsubscribe) on the ngOnDestroy event
 * @param unsubscribeProps array of class properties to unsubscribe
 */
export function AutoUnsubscribe(unsubscribeProps: string[] = []): ClassDecorator {
  return function fabric(constructor: Function) {
    const original = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function onDestroy() {
      original && original.apply(this, arguments);
      unsubscribeProps.forEach((prop) => {
        if (prop && this[prop] && typeof this[prop].unsubscribe === 'function') this[prop].unsubscribe();
      });
    };
  };
}
