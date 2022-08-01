import {g} from "./g";
import {h} from "./h";
import {i} from "./i";

export default () => {
    import(/* webpackChunkName: "C" */'./C').then(cModule => cModule.default({from: 'B', g, h, i}))
}

