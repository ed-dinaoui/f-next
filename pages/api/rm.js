const fs = require('fs') ;

export default function handler(req , res){
    fs.unlinkSync( req.query.N )
    res.end()
}