const render = vNode => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }

    return renderElement(vNode);
};

const renderElement = vNode => {
    const $element = document.createElement(vNode.type);

    const props = vNode.props || {};
    for (const [k, v] of Object.entries(props)) {
        $element.setAttribute(k, v);
    }

    const child = vNode.child || [];
    for (const children of child) {
        const $elementChild = render(children);
        $element.appendChild($elementChild);
    }

    return $element;
};

export default render;