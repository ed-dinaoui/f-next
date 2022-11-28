import { useState } from 'react' ;
import { DoBtn } from './form' ;


function InfoCard (props) {
    const [ is , set_is ] = useState(true) ;
    const [ info , set_info ] = useState(props.p) ;
    const [ load , set_load ] = useState(false) ;
    

    return is ? (
        <div className={info.id} >
            <div>
                <p> { info.title } </p>
                <p onClick={ () => {
                    props.close( info , con => set_is(con) )
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
                            () => { props.click( info , inf => set_info(inf) , con => set_load(con) ) }
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


export default InfoCard ;