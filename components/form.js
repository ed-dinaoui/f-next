import { useState } from "react";

export default function AddBtn(props) {
  const [ load , set_load ] = useState(false) ;
  
  return load ? <button>...</button> : (
    <button onClick={() => props.click(con => set_load(con))} id={"add_"}>
      add
    </button>
  )
}

export function DoAllBtn() {
  return <button>do. all</button>;
}

export function DoBtn(props) {
  return (
    <button
      onClick={() => {
        window.open(`${process.env.ROOT}/api/dow?ID=${props.tl}`, "_blank");
      }}
    >
      do.
    </button>
  );
}

export function Input() {
  return <input type={"url"} id={"input"} placeholder={"Youtube video URL"} />;
}
