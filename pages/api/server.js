const fs = require('fs') ,
      youtubedl = require('youtube-dl-exec') ;
      
class M_Array {
  constructor(  ){
    this._arr = new Array ;
  }
  set_media_info( params ){
    this._arr.push(params)
  }
  get_media( id ){
    return this._arr.find( ob => {
      return ob.id === id
    })
  }
  rm_media_info( id ){
    let tar = this.get_media(id) ;
        
    this._arr.splice( this._arr.indexOf(tar) , 1) ;
    fs.unlinkSync( tar.name )
  }
}
var C_Media = new M_Array ;

function getVideoInfo ( videoUrl , format , call ) {
  var is_audio = type => {
    return ( type === 'mp3' ) ?
      {
        extractAudio : true ,
        audioFormat : 'best' ,
      } :
      {
        format : 'best'
      }
  } , options = Object.assign( is_audio(format) , {
        noCheckCertificates: true,
        noWarnings: true,
        ffmpegLocation : '../../node_modules/ffmpeg/index' ,
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ] ,
      } );


  youtubedl( videoUrl , Object.assign( options , {
          paths : './output/'  
        } ) ) ;

  youtubedl( videoUrl , Object.assign( options , {
    dumpSingleJson: true ,
    } ) ).then(
      data => {
        call(data)
      } ,
      err => console.error(err)
  );
} ;

///

export default function handler ( req , res ){
  switch ( req.query.WHAT ) {
    case 'info' :
      var URL = req.query.URL ;
      getVideoInfo( URL , req.query.F , data => {
        var newMedia = {
          url : URL ,
          id : data.display_id ,
          title : data.title ,
          duration : data.duration_string ,
          size : ((
            ( data.filesize !== null ) ? data.filesize : 
            data.filesize_approx
          ) / 1000000).toFixed(2) + 'MB' ,
          media_type : req.query.F ,
          name  : ( req.query.F === 'mp4' ) ?
            data.requested_downloads[0]._filename :
            '.' + (data.requested_downloads[0]._filename.split('.')[1]) + '.' + data.acodec
            
        } ;
        C_Media.set_media_info(newMedia) ;
        res.json({ nM : newMedia }) 
      } )
    break ;
    case 'rm' :
      C_Media.rm_media_info(req.query.ID) ;
      res.end() 
    break ;
    case 'media' :
      res.json({ media : C_Media._arr }) 
    break ;
    case 'download' :
      res.download( C_Media.get_media( req.query.ID ).name )
    break ;
    default : 
      res.status(404).json({ message : ' Relax! ' })
  }
}