const jwt = require('jsonwebtoken');

exports.obrigatorio = (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY );
        req.usuario = decode;
        next();
    } catch(err){
        return res.status(401).send({error: 'Token inválido.'});
    }
    

}

exports.opcional = (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY );
        req.usuario = decode;
        next();
    } catch(err){
        next();
    }
    

}