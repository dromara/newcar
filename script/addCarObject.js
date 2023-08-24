/* eslint-disable no-console */
/* eslint-disable @so1ve/function-style */
/* eslint-disable prefer-template */
/* eslint-disable @so1ve/prettier/prettier */
const OBJECT_NAME = "NumberAxis";
const object_name = "number_axis";
const PARAMETER = {
  params: [
    {
      name: "max",
      type: "number"
    },
    {
      name: "min",
      type: "number"
    }
  ],
  datas: [
    {
      name: "color",
      type: "string",
      default: "white"
    },
    {
      name: "direction",
      type: `"left" | "right"`,
      default: `"right"`
    },
    {
      name: "width",
      type: "number",
      default: "2"
    },
    {
      name: "point_interval",
      type: "number",
      default: "50"
    },
    {
      name: "arrow",
      type: "boolean",
      default: "true"
    },
    {
      name: "displayPoint",
      type: "boolean",
      default: "true"
    },
  ],
};

function montageArrayToString(array_data) {
  let result = "";
  for (const i of array_data) {
    // eslint-disable-next-line unused-imports/no-unused-vars
    result += i;
  }

  return result;
}

const index_code = `
import { Carobj } from "../carobj";
import type { carobject } from "../carobj/input_type";
import type { ${object_name}object } from "./input_type"

export class ${OBJECT_NAME} extends Carobj {
  ${montageArrayToString(PARAMETER.params.map(
    // eslint-disable-next-line @eslint-community/eslint-comments/no-duplicate-disable
    // eslint-disable-next-line prefer-template
    (param) => "#" + param.name + ":" + param.type + "\n  "
  ))}
  ${montageArrayToString(PARAMETER.datas.map(
    // eslint-disable-next-line @eslint-community/eslint-comments/no-duplicate-disable
    // eslint-disable-next-line prefer-template
    (data) => "#" + data.name + ":" + data.type + "\n  "
  ))}
  constructor(${montageArrayToString(PARAMETER.params.map(
    // eslint-disable-next-line @eslint-community/eslint-comments/no-duplicate-disable
    // eslint-disable-next-line prefer-template
    (param) => param.name + ":" + param.type + ","
  ))} datas: ${object_name}object & carobject) {
    super(datas);
    // eslint-disable-next-line prefer-template
    ${montageArrayToString(PARAMETER.params.map(param => ("this.#" + param.name + " = " + param.name + (param.default ? " ?? " + param.default : "") + "\n  ")))}
    ${montageArrayToString(PARAMETER.datas.map(data=> ("this.#" + data.name + " = datas." + data.name + (data.default ? " ?? " + data.default : "") + "\n  ")))}
  }

  override onDraw(ctx: CanvasRenderingContext2D) {
    super.onDraw(ctx)
    // ......
    
    return ctx;
  }
  ${montageArrayToString(PARAMETER.params.map(param => {
    return `
  get ${param.name}() {
    return this.#${param.name};
  }

  set ${param.name}(value: ${param.type}) {
    this.#${param.name} = value;
  }
    `
  }))} ${montageArrayToString(PARAMETER.datas.map(data => {
    return `
  get ${data.name}() {
    return this.#${data.name}
  }

  set ${data.name}(value: ${data.type}) {
    this.#${data.name} = value;
  }
    `
  }))}
}
`;

const input_type_code = `
export interface ${object_name} {
  ${montageArrayToString(PARAMETER.datas.map(data => `${data.name}: ${data.type}; \n  `))}
}
`

console.log("// index.ts\n")
console.log(index_code);
console.log("// input_type.ts")
console.log(input_type_code);
