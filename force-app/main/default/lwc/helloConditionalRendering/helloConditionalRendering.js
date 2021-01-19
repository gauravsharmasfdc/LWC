import { LightningElement } from "lwc";

export default class HelloConditionalRendering extends LightningElement {
  areDataVisible = false;

  handleChange(event) {
    this.areDataVisible = event.target.checked;
  }
}
