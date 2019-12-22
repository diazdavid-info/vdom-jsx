/** @jsx createElement */
import createElement from "../vdom/createElement";
export default function (props, value) {
    const {id} = props;
    return (<h1 id={id}>{value}</h1>);
}