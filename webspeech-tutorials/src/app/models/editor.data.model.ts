import {EditorDataInterface} from "./editor.data.interface";

export class EditorData implements EditorDataInterface{
  private _html: string;
  private _js: string;

  constructor(html: string, js: string) {
    this._html = html;
    this._js = js;
  }

  get html(): string {
    return this._html;
  }

  set html(value: string) {
    this._html = value;
  }

  get js(): string {
    return this._js;
  }

  set js(value: string) {
    this._js = value;
  }
}
