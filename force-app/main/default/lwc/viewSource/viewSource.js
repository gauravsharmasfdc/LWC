import { LightningElement, api } from "lwc";

export default class ViewSource extends LightningElement {
  @api source;
  baseURL =
    "https://github.com/gauravsharmasfdc/lwc-recipes/tree/master/force-app/main/default/";

  get sourceUrl() {
    return this.baseURL + this.source;
  }
}
