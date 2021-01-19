import { LightningElement } from "lwc";

export default class HelloExpression extends LightningElement {
  firstName = "";
  lastName = "";

  handleChange(event) {
    const field = event.target.name;
    if (field === "firstName") {
      this.firstName = event.target.value;
    }
    if (field === "lastName") {
      this.lastName = event.target.value;
    }
  }

  get upperCasedFullName() {
    return `${this.firstName} ${this.lastName}`.trim().toUpperCase();
  }
}
