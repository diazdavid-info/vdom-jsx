const renderElement = ({type, props, children}) => {
    const $el = document.createElement(type);
    for (const [k, v] of Object.entries(props)) {
        $el.setAttribute(k, v);
    }

    for (const child of children) {
        $el.appendChild(render(child));
    }

    return $el;
};

const render = vNode => {
    if(typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    return renderElement(vNode);
};

export default render;