export default function handler(req,res){
    res.download( req.query.N )
}