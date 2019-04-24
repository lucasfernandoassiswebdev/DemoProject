"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const UserService_1 = require("./modules/users/UserService");
const config = require('../config/env/config')();
class Auth {
    config() {
        let opts = {
            secretOrKey: config.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
        };
        passport.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
            UserService_1.default.findOne({ _id: jwtPayload.id }).then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            }).catch(error => {
                done(error, null);
            });
        }));
        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', { session: false })
        };
    }
}
exports.default = new Auth();
