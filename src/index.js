/** @jsx h */

function h(type, props, ...children) {
    console.log(type);
    console.log(props);
    console.log(children);
    return {type, props, children};
}

function createElement(node) {
    let element = document.createElement(node.type);
    element.appendChild(
        document.createTextNode(node.children[0])
    );
    return element;
}

const box = (<h2>Hello! David</h2>);
const box3 = (<h3>Otro h3</h3>);

const $root = document.getElementById('root');
$root.appendChild(createElement(box));
$root.appendChild(createElement(box3));