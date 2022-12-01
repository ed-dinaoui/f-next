import { useState } from "react";

export default function AddBtn(props) {
  const [ load , set_load ] = useState(false) ;
  
  return load ? <button>...</button> : (
    <button onClick={ () => {
      
      let val = document.getElementById("input").value,
                v_l = val.length;
      if (v_l > 20) {
        
        let s = val.slice(8, v_l).split("/")[0],
          va = s.length <= 8 ? s.replace(".", "") : s.split(".")[1];
          
        if (va === "youtube") {
          set_load(true) ;
          fetch(`${process.env.ROOT}/api/add?F=mp4&URL=${encodeURIComponent(val)}`)
            .then(res => res.json())
            .then(data => {
              props.call( data ) ;
              set_load(false)
            } ,
            err => console.log(err) )
        }
      }
      
    } } >
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
        window.open(`${process.env.ROOT}/api/download?N=${props.tl}`, "_blank");
      }}
    >
      do.
    </button>
  );
}

export function Input() {
  return <input type={"url"} id={"input"} placeholder={"Youtube video URL"} />;
}
