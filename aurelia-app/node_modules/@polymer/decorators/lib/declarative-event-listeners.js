/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
/**
 * Element class mixin that provides API for adding declarative event
 * listener nodes.
 *
 * The API is designed to be compatible with override points implemented in
 * `TemplateStamp` such that declarative event listeners in templates will
 * support gesture events when this mixin is applied along with `TemplateStamp`.
 */
export const DeclarativeEventListeners = dedupingMixin((base) => {
    /**
     * @property listeners {object} Stores the declared event listeners to be
     * subscribed to durning ready().
     */
    return class extends base {
        ready() {
            super.ready();
            const c = this.constructor;
            if (!c.hasOwnProperty('listeners')) {
                c.listeners = [];
            }
            c.listeners.forEach((listener) => {
                const targetElement = typeof listener.target === 'string' ?
                    this.$[listener.target] :
                    listener.target;
                this._addEventListenerToNode(
                // TODO(aomarks) This TemplateStamp method should take
                // EventTarget.
                targetElement, listener.eventName, listener.handler.bind(this));
            });
        }
        /**
         * Adds to stored listeners to subscribe to on ready()
         *
         * @param target Element/node for listener to target.
         * @param eventName Name of event to listen for.
         * @param {function} handler Function which receives the notification.
         */
        static _addDeclarativeEventListener(target, eventName, handler) {
            if (!this.hasOwnProperty('listeners')) {
                this.listeners = [];
            }
            this.listeners.push({ target, eventName, handler });
        }
    };
});
//# sourceMappingURL=declarative-event-listeners.js.map