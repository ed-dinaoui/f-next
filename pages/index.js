import { useState } from "react";
import InfoCard from "../components/info";
import AddBtn, { DoAllBtn, Input } from "../components/form";


function Home() {
  const [media_d, set_media_d] = useState([]) ;

  return (
    <main>
      <div>
        <Input />
        <div>{
            media_d.map(ob => {
              return <InfoCard key={ob.id} o={ob} />
            })
          }</div>
      </div>
      <div>
        <AddBtn call={ ar => 
          set_media_d( media_d.concat( ar ))
        }/>
        <DoAllBtn />
      </div>
    </main>
  )
}

export default Home
