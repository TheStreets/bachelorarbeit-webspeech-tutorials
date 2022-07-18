import {ITutorial} from "./tutorial-interface";

export class Tutorial implements ITutorial {
  private _id: number;
  private _description: string;
  private _tutorialNumber: string;
  private _title: string;
  private _status: number;

  constructor(id: number, description: string, number: string, title: string) {
      this._id = id;
      this._title = title;
      this._description = description;
      this._tutorialNumber = number;
      this._status = 0;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get tutorialNumber(): string {
    return this._tutorialNumber;
  }

  set tutorialNumber(value: string) {
    this._tutorialNumber = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }
}
