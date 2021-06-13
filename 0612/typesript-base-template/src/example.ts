import lad from "lodash";

const arr: number[] = lad.fill(Array(10), 4)
console.log(arr)


import * as logger from "./logger";
logger.debug("This is debug!");
logger.log("This is log!!");
logger.error("This is error!!!");

import calc from "./calcurator"
console.log(calc.sum(3, 4), calc.sub(4, 3), calc.multiply(2, 2), calc.divide(3, 2));