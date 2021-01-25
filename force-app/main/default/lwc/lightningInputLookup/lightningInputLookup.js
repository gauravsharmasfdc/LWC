import { LightningElement, api, wire, track } from "lwc";
import getRecords from "@salesforce/apex/lightningInputLookup.getRecords";
const DELAY = 300; //delay apex callout for milliseconds
export default class LightningInputLookup extends LightningElement {
  @api label;
  @api sObjectApiName = "Account";
  @api multiSelected = false;

  searchKey = "";
  @track searchResult = [];

  delayTimeout;
  connectedCallback() {
    window.addEventListener("resize", this.windowResizing.bind(this));
  }

  @wire(getRecords, {
    searchTerm: "$searchKey",
    sObjectApiName: "$sObjectApiName"
  })
  searchResult({ data, error }) {
    if (data) {
      this.searchResult = JSON.parse(JSON.stringify(data));
      console.log(this.searchResult);
    } else if (error) {
      console.log(error);
    }
  }
  handleUserInput(event) {
    let searchTerm = event.target.value;
    searchTerm = searchTerm.trim();

    window.clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchTerm;
    }, DELAY);
  }

  handleLookupSearchClick(event) {
    this.windowResizing(event);
    this.template.querySelector(".dropdown").classList.remove("slds-hide");
  }
  showDropdown(event) {
    this.template.querySelector(".dropdown").classList.remove("slds-hide");
  }
  hideDropdown(event) {
    this.template.querySelector(".dropdown").classList.add("slds-hide");
  }

  handleRecordSelection(event) {
    let tah = event.target;
    let selectedRecordId = event.target.dataset.id;
    console.log(selectedRecordId);
    console.log(event.target.tagName);
    event.stopPropagation();
  }

  // Method to resize Lookup result droupdown according to lookup search width
  // this method called from "resize" event registed in connectedCallBack, fired when browser resize
  windowResizing(event) {
    let lookupSearchWidth = this.template.querySelector(".lookup-search");
    if (lookupSearchWidth != null) {
      lookupSearchWidth = lookupSearchWidth.offsetWidth + "px";
      this.template.querySelector(".dropdown").style.width = lookupSearchWidth;
    }
  }
}
