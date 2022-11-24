import { useState } from 'react' ;
import { DoBtn } from './form' ;

export var up_ga_a ;


function InfoCard (props) {
    const [ is , set_is ] = useState(true) ;
    const [ info , set_info ] = useState(props.p) ;
    const [ load , set_load ] = useState(false) ;
    

    return is ? (
        <div className={info.id} >
            <div>
                <p> { info.title } </p>
                <p onClick={ () => {
                    set_is(false) ;
                    fetch("../api/server?WHAT=rm&ID="+info.id) ;
                } } >x</p>
            </div>
            <div>
                <p>{ info.duration }</p>
                <p>{ info.size } </p>
            </div>
            {
                load ? <p>...</p> : (
                    <div>
                        <p onClick={ 
                            () => {
                            set_load(true) ;
                            let f = ( info.media_type === 'mp3' ) ? 'mp4' : 'mp3' ;
                            fetch('../api/server?WHAT=rm&ID=' + info.id ) ;
                            fetch(`../api/server?WHAT=info&F=${f}&URL=${info.url}`)
                                .then(res => res.json())
                                .then(
                                    data => {
                                        set_info(data.nM) ;
                                        set_load(false) ;
                                    }
                                ) ;
                            
                            }
                            } style={ { color : ( info.media_type === 'mp3' ) ?
                            'var(--color)' : 
                            'var(--color-2)'  } } >
                                mp3
                        </p>
                        <DoBtn tl={info.id} />
                    </div>
                )
            }
        </div>
    ) : []
}


function Info () {
    const [ a , set_a ] = useState([])
    
    up_ga_a = () => {
        fetch("../api/server?WHAT=media")
        .then(res => res.json())
        .then(data => {
            data.media.forEach(ob => {
                set_a( a.concat(<InfoCard p={ob} />) ) ;
            } ) 
        }) ;
    } ;
    
    
    
    
    
    
    return (
        <div>
            {a}
        </div>
    )
}





export default Info ;