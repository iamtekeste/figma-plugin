import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import { useEffect } from "preact/hooks";

function Plugin() {
  const mysecondfunc = () => {
    throw new Error("failing");
  };

  const myfirstfunc = () => {
    mysecondfunc();
  };

  useEffect(() => {
    myfirstfunc();
  }, []);

  throw new Error('Testing stack trace')
  return <h1>hello</h1>;
}

export default render(Plugin);
