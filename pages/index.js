import Info from './components/info' ;
import { AddBtn , DoAllBtn , Input } from './components/form' ;


export default function Home() {
  return (
    <main >
      <div>
        <Input />
        <Info  />
      </div>
      <div>
        <AddBtn />
        <DoAllBtn />
      </div>
    </main>
  )
}

