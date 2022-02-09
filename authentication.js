// const jwt = require('jsonwebtoken');
// const jwsClient = require('jwks-rsa');

// const client = jwksClient({
//     jwksUri: process.env.JWKS_URI
// });

// function getKey(header, callback){
//     client.getSignInKey(header.kid, function(err, key) {
//         const signInKey = key.publicKey || key.rsaPublicKey;
//         callback(null, signInKey);
//     });
// }

// function verifyUser(request, errOrUserCallback) {

//     try {
//         const token = request.headers.authorization.split(' ')[1];
//         console.log(token);
//         jwt.verify(token, getKey, {}, errOrUserCallback);
//     } catch (error) {
//         errOrUserCallback('Not Authorized');
//     }
// }

// module.exports = verifyUser