import { useState } from "react";
import InfoCard from "../components/info";
import AddBtn, { DoAllBtn, Input } from "../components/form";
import AES from 'crypto-js/aes' ;

class M_Array {
  constructor(  ){
    this._arr = new Array ;
  }
  set_media_info( url , format , callBack ){
    
    fetch(`${process.env.ROOT}/api/server?F=${format}&URL=${encodeURIComponent(AES.encrypt(url , '$n[ex+t-@f-01ed').toString())}`)
    .then(res => res.json())
    .then(d => {
      var data = d.info ,
          newMedia = {
        url : url ,
        id : data.display_id ,
        title : data.title ,
        duration : data.duration_string ,
        size : ((
          ( data.filesize !== null ) ? data.filesize : 
          data.filesize_approx
        ) / 1000000).toFixed(2) + 'MB' ,
        media_type : format ,
        name  : ( format === 'mp4' ) ?
          data.requested_downloads[0]._filename :
          '.' + (data.requested_downloads[0]._filename.split('.')[1]) + '.' + data.acodec
          
      } ;
      console.log(newMedia)
      this._arr.push(newMedia) ;
      callBack(newMedia , this._arr) ;
    })
  }
  get_media( id ){
    return this._arr.find( ob => {
      return ob.id === id
    })
  }
  rm_media_info( id , call ){
    let tar = this.get_media(id) ;
        
    this._arr.splice( this._arr.indexOf(tar) , 1) ;
    fetch(`${process.env.ROOT}/api/rm?N=${tar.name}`)
    .then(
      resolve => call() ,
      err => console.log(err)
    )
  }
  download_media( id ){
    fetch(`${process.env.ROOT}/api/dow?N=${ this.get_media( id ).name }`)
  }
}
var C_Media = new M_Array ;


function Home() {
  const [media_d, set_media_d] = useState([]);

  return (
    <main>
      <div>
        <Input />
        <div>{media_d}</div>
      </div>
      <div>
        <AddBtn
          click={(call) => {
            let val = document.getElementById("input").value,
              v_l = val.length;
            if (v_l > 20) {
              let s = val.slice(8, v_l).split("/")[0],
                va = s.length <= 8 ? s.replace(".", "") : s.split(".")[1];
              if (va === "youtube") {
                call(true);
                C_Media.set_media_info(val , `mp4` , (info , allInfo) => {
                  allInfo.forEach((ob) => {
                      set_media_d(
                        media_d.concat(
                          <InfoCard
                            p={ob}
                            click={(fni, inf, loa) => {
                              loa(true);
                              let f = fni.media_type === `mp3` ? `mp4` : `mp3`;
                              C_Media.rm_media_info(fni.id , () => {
                                C_Media.set_media_info( fni.url , f , (info , allInfo) => {
                                  inf(info) ;
                                  loa(false)
                                })
                              } ) ;
                            }}
                            close={(inf, is) => {
                              C_Media.rm_media_info(inf.id , () => is(false) )
                            }}
                          />
                        )
                      )
                    })
                    call(false);
                }) ;
                
              } else {
                alert(
                  " Only youtube , " +
                  " if this a yt video url you better watch" +
                  " a tutorial on how to retrive a Valid one "
                )
              }
            } else {
              alert("Try again with a valid Url")
            }
          }}
        />
        <DoAllBtn />
      </div>
    </main>
  )
}

export default Home
