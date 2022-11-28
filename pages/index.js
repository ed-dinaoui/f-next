import Info from '../components/info' ;
import AddBtn , { DoAllBtn , Input } from '../components/form' ;


function Home({data}) {
  return (
    <main >
      <div>
        <Input />
        <Info click={ ( fni , inf , loa ) => {
            loa(true) ;
            let f = ( fni.media_type === 'mp3' ) ? 'mp4' : 'mp3' ;
            
            fetch('https://f-next.vercel.app/api/server?WHAT=rm&ID=' + fni.id ) ;
            fetch(`https://f-next.vercel.app/api/server?WHAT=info&F=${f}&URL=${fni.url}`)
                .then(res => res.json())
                .then(
                    data => {
                        inf(data.nM) ;
                        loa(false) ;
                    }
                ) ;
          }} close={ ( inf , is ) => {
            is(false) ;
            fetch("https://f-next.vercel.app/api/server?WHAT=rm&ID=" + inf.id) ;
        }} c_media={d => d(data)} />
      </div>
      <div>
        <AddBtn click={ call => {
            let val = document.getElementById("input").value ,
                v_l = val.length ;
                
            if(v_l > 20){
              let s = val.slice(8 , v_l ).split('/')[0] ,
                  va = ( s.length <= 8 ) ? s.replace('.' , '') : s.split('.')[1] ;
              if( va === 'youtube' ){
                call(true) ;
                fetch(  "https://f-next.vercel.app/api/server?WHAT=info&F=mp4&URL=" + val) 
                  .then((res) => res.json())
                  .then( d => {
                    
                    call(false) ;
                  } ) ;
                  
              }else{ alert(' Only youtube , if this a yt video url you better watch a tutorial on how to retrive a Valid one ') }
            }else{ alert('Try again with a valid Url') }
            
        }} />
        <DoAllBtn />
      </div>
    </main>
  )
}

export async function getServerSideProps(){
  var res = await fetch('https://f-next.vercel.app/api/server?WHAT=media') ;
  var data = await res.json() ;
  if(!data){
    return {
      notFound : true
    }
  } ;
  
  return {
    props : { data }
  }
}

export default Home ;
