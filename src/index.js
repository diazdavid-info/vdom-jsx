/** @jsx createElement */
import createElement from "./vdom/createElement";
import Title from "./components/title";
import render from "./vdom/render";
import mount from "./vdom/mount";

const vApp = (<Title id='principal'>Qué pasaaaaaaa</Title>);
mount(render(vApp), document.getElementById('root'));
console.log(render(vApp));