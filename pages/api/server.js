const youtubedl = require('youtube-dl-exec') ;

export default function handler ( req , res ) {
  var is_audio = type => {
    return ( type === 'mp3' ) ?
      {
        extractAudio : true ,
        audioFormat : 'best' ,
      } :
      {
        format : 'best'
      }
  } , options = Object.assign( is_audio(req.query.F) , {
        noCheckCertificates: true,
        noWarnings: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ] ,
      } ) ,
      URL = decodeURIComponent(req.query.URL)  ;
      


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
  );
  
} ;

///