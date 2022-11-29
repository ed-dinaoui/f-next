const youtubedl = require('youtube-dl-exec') ;
import { enc } from 'crypto-js' ;
import AES from 'crypto-js/aes' ;

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
      URL = AES.decrypt( decodeURIComponent(req.query.URL) , '$n[ex+t-@f-01ed').toString(enc.Utf8) ;
      
  console.log('URL : '+URL , 'url  : '+ req.query.URL) ;


  youtubedl( URL , Object.assign( options , {
          paths : `public/output/`
        } ) );

  youtubedl( URL , Object.assign( options , {
    dumpSingleJson: true ,
    } ) ).then(
      data => {
        res.json( { info : data } ) 
      } ,
      err => console.error(err)
  );
  
} ;

///