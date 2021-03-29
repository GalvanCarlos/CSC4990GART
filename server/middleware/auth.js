/** (WIP) 
 * Middlewares
 * Middleware functions are functions that have access to the request object (req), the response object (res),
 * and the next middleware function in the application’s request-response cycle. The next middleware function 
 * is commonly denoted by a variable named next
 * 
 * This will verify info for post
 * 
 */

import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

<<<<<<< Updated upstream
      //req.userId = decodedData?.id;
=======
      //req.userID = decodedData?.id;
>>>>>>> Stashed changes

    } else {
      decodedData = jwt.decode(token);

<<<<<<< Updated upstream
      //req.userId = decodedData?.sub;
=======
      //req.userID = decodedData?.sub;
>>>>>>> Stashed changes
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;