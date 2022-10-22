import passport from "server/src/middleware/passport";

export const authChecker = passport.authenticate("jwt", { session: false });