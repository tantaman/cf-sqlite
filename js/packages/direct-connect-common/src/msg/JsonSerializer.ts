import { jsonDecode, jsonEncode } from "../index.js";
import { ISerializer, Msg } from "../types.js";

export default class JsonSerializer implements ISerializer {
  constructor(
    private readonly stringify: boolean = false,
    private readonly parse: boolean = false
  ) {}

  encode(msg: Msg): any {
    const encoded = jsonEncode(msg);
    if (this.stringify) {
      return JSON.stringify(encoded);
    }
    return encoded;
  }

  decode(msg: any): Msg {
    if (this.parse) {
      msg = JSON.parse(msg);
    }
    return jsonDecode(msg);
  }
}