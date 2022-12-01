import { useState } from 'react' ;
import { DoBtn } from './form' ;

export class M_Object {
  constructor( params , url , f  ){
    this.url = url ;
    this.id = params.display_id ;
    this.title = params.title ;
    this.duration = params.duration_string ;
    this.size = ( ( (params.filesize !== null) ? 
      params.filesize : 
      params.filesize_approx  ) / 1000000 ).toFixed(2) + "MB" ,
    this.media_type = f ,
    this.name = ( f === 'mp4' ) ? 
      params.requested_downloads[0]._filename :
      '.' + ( params.requested_downloads[0]._filename.split('.')[1] ) + '.' + params.acodec
  }
}

function InfoCard (props) {
    const [ is , set_is ] = useState(true) ;
    const [ load , set_load ] = useState(false) ;
    const [ info , set_info ] = useState(props.o) ;
    
    return is ? (
        <div className={info.id} >
            <div>
                <p> { info.title } </p>
                <p onClick={ () => {
                    fetch(`${process.env.ROOT}/api/remove?N=${info.name}`) ;
                    set_is(false)
                } } >x</p>
            </div>
            <div>
                <p>{ info.duration }</p>
                <p>{ info.size } </p>
            </div>
            {
                load ? <div><p>...</p></div> : (
                    <div>
                        <p onClick={ 
                            () => {
                                set_load(true)
                                let f = info.media_type === 'mp3' ? 'mp4' : 'mp3' ;
                                fetch(`${process.env.ROOT}/api/remove?N=${info.name}`) ;
                                fetch(`${process.env.ROOT}/api/add?F=${f}&URL=${encodeURIComponent(info.url)}`)
                                    .then(res => res.json())
                                    .then( d => {
                                        set_info(new M_Object( d , info.url , f )) ;
                                        set_load(false)
                                    } )
                             }
                            } style={ { color : ( info.media_type === 'mp3' ) ?
                            'var(--color)' : 
                            'var(--color-2)'  } } >
                                mp3
                        </p>
                        <DoBtn tl={info.name} />
                    </div>
                )
            }
        </div>
    ) : []
}


export default InfoCard ;