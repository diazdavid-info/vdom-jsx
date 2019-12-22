export default function createElement(type, props, ...children) {
    if(typeof type === 'string') {
        return {type, props, children};
    }
    return type(props, ...children);
}