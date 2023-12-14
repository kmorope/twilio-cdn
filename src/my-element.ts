/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { conversations } from './cdn_bundles/twilio-conversation-esm';
import './cdn_bundles/twilio-conversation'

/** TODO - Uncomment the below code to check if the ESM import works or not **
 *
 * import { Client } from '@twilio/conversations';
 *
 */

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the initialisation changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Boolean})
  status = false;

  override render() {
    return html`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClickWithCDN_ESM} part="button">
        Initialise twilio client with CDN: ${this.status}
      </button>
      
      <button @click=${this._onClickWithCDN_CommonJS} part="button">
        Initialise twilio client with NPM - CommonJS format: ${this.status}
      </button>

      <button @click=${this._onClickWithNPMES} part="button">
        Initialise twilio client with NPM - ESM format: ${this.status}
      </button>
      <slot></slot>
    `;
  }

  private _onClickWithCDN_ESM() {
    const clientCreateStartTime = new Date().getTime();
    // @ts-ignore
    const client = new conversations.Client.create('', { region: 'ie1', twilsock: {} }); // eslint-disable-line new-cap
    client.then(() => {
      console.log(`time taken for registering twilio client : ${new Date().getTime() - clientCreateStartTime}`);
      this.status = true;
    }).catch(() => {
      console.log(`Twilio client initialisation failed`);
      this.status = false;
    });
    this.dispatchEvent(new CustomEvent('count-changed'));
  }


  private _onClickWithCDN_CommonJS() {
    const clientCreateStartTime = new Date().getTime();
    // @ts-ignore
    const client = new window.Twilio.Conversations.Client.create('', { region: 'ie1', twilsock: {} }); // eslint-disable-line new-cap
    client.then(() => {
      console.log(`time taken for registering twilio client : ${new Date().getTime() - clientCreateStartTime}`);
      this.status = true;
    }).catch(() => {
      console.log(`Twilio client initialisation failed`);
      this.status = false;
    });

    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  private _onClickWithNPMES() {
    const clientCreateStartTime = new Date().getTime();
    // @ts-ignore
    const client = new Client.create('', { region: 'ie1', twilsock: {} }); // eslint-disable-line new-cap
    client.then(() => {
      console.log(`time taken for registering twilio client : ${new Date().getTime() - clientCreateStartTime}`);
      this.status = true;
    }).catch(() => {
      console.log(`Twilio client initialisation failed`);
      this.status = false;
    });

    this.dispatchEvent(new CustomEvent('count-changed'));
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
