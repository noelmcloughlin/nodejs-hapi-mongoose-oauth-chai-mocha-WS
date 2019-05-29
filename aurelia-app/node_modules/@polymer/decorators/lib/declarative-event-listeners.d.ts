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
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
export interface SuperClassConstructor {
    new (...args: any[]): PolymerElement;
    listeners?: Array<{
        target: string | EventTarget;
        eventName: string;
        handler: (ev: Event) => void;
    }>;
}
export interface DeclarativeEventListenersConstructor {
    new (...args: any[]): {};
    _addDeclarativeEventListener: (target: string | EventTarget, eventName: string, handler: (ev: Event) => void) => void;
}
/**
 * Element class mixin that provides API for adding declarative event
 * listener nodes.
 *
 * The API is designed to be compatible with override points implemented in
 * `TemplateStamp` such that declarative event listeners in templates will
 * support gesture events when this mixin is applied along with `TemplateStamp`.
 */
export declare const DeclarativeEventListeners: <T extends SuperClassConstructor>(base: T) => T & DeclarativeEventListenersConstructor;
