//needs to move to appropriate dir... tbd
import jwt from 'jsonwebtoken';

function authenticate(req, res, next){
    console.log(req.header)
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');//

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch(e){
        res.status(400).send('INVALIDE TOKEN');
    }

}

export default authenticate