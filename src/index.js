/** @jsx createElement */

import render from "./vdom/render";
import mount from "./vdom/mount";
import diff from "./vdom/diff";

const createElement = (type, props, ...child) => {
    return {type, props, child};
};

const vContainer = random => (
    <div id='container' data-count={random}>
        <h1 style='color:red;'>OOOOOHHH Yeaaahhhhh {random.toString()}</h1>
        <input type='text'/>
    </div>
);

let vApp = vContainer(1);
const $app = render(vApp);
let $root = mount($app, document.getElementById('root'));

setInterval(() => {
    const n = Math.floor(Math.random() * 10);
    const vNewApp = vContainer(n);
    const patch = diff(vApp, vNewApp);
    $root = patch($root);

    vApp = vNewApp;
}, 1000);
