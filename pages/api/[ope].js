const fs = require('fs') ,
      youtubedl = require('youtube-dl-exec') ;

export default function handler ( req , res ) {
  var qu = req.query ;
  
  if( qu.ope === 'add' ){
    var URL = decodeURIComponent(qu.URL) ,
        is_audio = type => {
          return ( type === 'mp3' ) ?
            {
              extractAudio : true ,
              audioFormat : 'best' ,
            } : { format : 'best' }
        },
        options = Object.assign( is_audio(qu.F) , {
              noCheckCertificates: true,
              noWarnings: true,
              addHeader: [
                'referer:youtube.com',
                'user-agent:googlebot'
              ] ,
        } ) ;
        
    youtubedl( URL , Object.assign( options , {
            paths : `public/output/`
          } ) );

    youtubedl( URL , Object.assign( options , {
      dumpSingleJson: true ,
      } ) ).then(
        data => {
          res.json( data ) 
        } ,
        err => console.error(err)
    )
  }else if( qu.ope === 'remove' ){
    fs.unlinkSync( qu.N )
    res.end()
  }else if( qu.ope === 'download' ){
    res.download( qu.N )
  }else {
    res.status(505).json({ message : 'Rilax!' })
  }
  
  
  
  
} ;

///