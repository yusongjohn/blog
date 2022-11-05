import {e} from "./e";
import {f} from "./f";
import {g} from "./g";

import(/* webpackChunkName: "B" */'./B').then(bModule => bModule.default())
import(/* webpackChunkName: "C" */'./C').then(cModule => cModule.default({from: 'A', e, f, g}))


