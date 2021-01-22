import { LightningElement } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
export default class LdsCreateRecord extends LightningElement {
  name = "";
  accountId = "";
  handleNameChange(event) {
    this.name = event.target.value;
  }

  createAccount(event) {
    const fields = {};
    fields[ACCOUNT_NAME.fieldApiName] = this.name;

    const recordInput = {
      apiname: ACCOUNT_NAME.objectApiName,
      fields: fields
    };

    createRecord(recordInput)
      .then((account) => {
        this.accountId = account.id;
        console.log("Account created : " + account.id);
      })
      .catch((err) => {
        console.log("Something wrong ");
      });
  }
}
