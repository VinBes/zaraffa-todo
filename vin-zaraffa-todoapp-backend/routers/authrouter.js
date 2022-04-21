const bcrypt = require("bcrypt");
const config = require("../auth/config");
const jwt = require("jsonwebtoken");

class AuthRouter {
  constructor(express, knex) {
    this.express = express;
    this.knex = knex;
  }

  router() {
    let router = this.express.Router();

    router.post("/login", this.login.bind(this));
    router.post("/signup", this.signup.bind(this));

    return router;
  }

  async login(req, res) {
    console.log(`Logging in`);
    console.log(req.body);
    let { username, email, password } = req.body;
    let user = await this.knex
      .select("*")
      .from("users")
      .where({ email: email })
      .then((data) => data[0]);
    console.log(user);
    if (await bcrypt.compare(password, user.password)) {
      let payload = {
        id: user.id,
      };
      let token = jwt.sign(payload, config.jwtSecret);
      console.log(token);
      res.json({ token });
    }
  }

  async signup(req, res) {
    console.log(req.body);
    let { username, email, password } = req.body;
    console.log(password);
    let hashed = await bcrypt.hash(password, 10);
    let userInfo = {
      username,
      email,
      password: hashed,
    };
    let userId = await this.knex("users").insert(userInfo).returning("id");
    res.send(userId);
  }
}
module.exports = AuthRouter;
