const fs = require('fs') ,
      youtubedl = require('youtube-dl-exec') ;

class M_Object {
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


export default async function handler ( req , res ) {
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
        
        //https://www.youtube.com/watch?v=hD5hIqeKNVE//
        
    youtubedl( URL , Object.assign( options , {
            paths : `/output/`
        } ) ).catch(err => console.log(err)) ;

    youtubedl( URL , Object.assign( options , {
      dumpSingleJson: true ,
      } ) ).then(
        data => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.end(JSON.stringify(new M_Object( data , URL , qu.F )))
          //res.json( data )
          //res.status(200).end()
        } ,
        err => {
          console.log(err)
          res.status(500).end()
        }
    )
  }else if( qu.ope === 'remove' ){
    fs.unlinkSync( qu.N )
    res.end()
  }else if( qu.ope === 'download' ){
    res.download( qu.N )
  }
  else {
    res.status(505).json({ message : 'Rilax!' })
  }
  
  
  
  
} ;

///
