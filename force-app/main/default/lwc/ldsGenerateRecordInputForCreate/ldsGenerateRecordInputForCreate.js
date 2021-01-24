import { LightningElement, wire, track } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.name";
import AREA_NUMBER_FIELD from "@salesforce/schema/Account.AreaNumber__c";

import {
  createRecord,
  generateRecordInputForCreate,
  getRecordCreateDefaults
} from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class LdsGenerateRecordInputForCreate extends LightningElement {
  @track name = {
    fieldApiName: NAME_FIELD.fieldApiName,
    defaultValue: "",
    isNotEditable: true
  };

  @track areaNumber = {
    fieldApiName: AREA_NUMBER_FIELD.fieldApiName,
    defaultValue: "",
    isNotEditable: true
  };

  recordInput; // {apiName : ObjectApi Name,fields:{ key:value}}

  @wire(getRecordCreateDefaults, { objectApiName: ACCOUNT_OBJECT })
  loadAccountCreateDefault({ data, error }) {
    if (data) {
      this.recordInput = generateRecordInputForCreate(
        data.record,
        data.objectInfos[ACCOUNT_OBJECT.objectApiName]
      );
      this.checkFieldEditibility();
      this.assignDefaultValues();
    } else if (error) {
      this.recordInput = undefined;
    }
  }

  checkFieldEditibility() {
    const editableFields = this.recordInput.fields;

    if (this.name.fieldApiName in editableFields) {
      this.name.isNotEditable = false;
    }
    if (this.areaNumber.fieldApiName in editableFields) {
      this.areaNumber.isNotEditable = false;
    }
  }

  assignDefaultValues() {
    const editableFields = this.recordInput.fields;
    this.name.defaultValue = editableFields[this.name.fieldApiName];
    this.areaNumber.defaultValue = editableFields[this.areaNumber.fieldApiName];
  }

  handleFieldChange(event) {
    this.recordInput.fields[event.target.dataset.fieldName] =
      event.target.value;
  }

  createAccount() {
    createRecord(this.recordInput)
      .then((result) => {
        const event = new ShowToastEvent({
          title: "Record Created",
          message: "Record created successfully",
          variant: "success"
        });

        this.dispatchEvent(event);
      })
      .catch((err) => {
        const event = new ShowToastEvent({
          title: "Error",
          message: err,
          variant: "error"
        });
        this.dispatchEvent(event);
      });
  }
}
