import Info , { up_ga_a } from '../components/info' ;
import AddBtn , { DoAllBtn , Input } from '../components/form' ;

var f_click = call => {
    let val = document.getElementById("input").value ,
        v_l = val.length ;
        
    if(v_l > 20){
      let s = val.slice(8 , v_l ).split('/')[0] ,
          va = ( s.length <= 8 ) ? s.replace('.' , '') : s.split('.')[1] ;
      if( va === 'youtube' ){
        call(true) ;
        fetch(  "/api/server?WHAT=info&F=mp4&URL=" + val) 
          .then((res) => res.json())
          .then( d => {
            up_ga_a() ;
            call(false) ;
          } ) ;
          
      }else{ alert(' Only youtube , if this a yt video url you better watch a tutorial on how to retrive a Valid one ') }
    }else{ alert('Try again with a valid Url') }
    
};

var get_media = ( fni , inf , loa ) => {
  loa(true) ;
  let f = ( fni.media_type === 'mp3' ) ? 'mp4' : 'mp3' ;
  
  fetch('/api/server?WHAT=rm&ID=' + fni.id ) ;
  fetch(`/api/server?WHAT=info&F=${f}&URL=${fni.url}`)
      .then(res => res.json())
      .then(
          data => {
              inf(data.nM) ;
              loa(false) ;
          }
      ) ;
}

var p_close = ( inf , is ) => {
  is(false) ;
  fetch("/api/server?WHAT=rm&ID="+inf.id) ;
}

var g_media = set_m => {
  fetch("/api/server?WHAT=media")
        .then(res => res.json())
        .then(data => {
          set_m(data)    
        }) ;
}

export default function Home() {
  return (
    <main >
      <div>
        <Input />
        <Info click={get_media} close={p_close} c_media={g_media} />
      </div>
      <div>
        <AddBtn click={f_click} />
        <DoAllBtn />
      </div>
    </main>
  )
}

