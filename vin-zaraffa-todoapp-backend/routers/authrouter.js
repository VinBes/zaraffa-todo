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
    router.post("/login/facebook", this.loginFacebook.bind(this));
    router.post("/signup", this.signup.bind(this));

    return router;
  }

  async login(req, res) {
    console.log(`Logging in`);
    console.log(req.body);
    let { email, password } = req.body;
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
      let userInfo = {
        user: user,
        token: token,
      };
      res.json({ userInfo });
    } else {
      res.send("Login Failed");
    }
  }

  async loginFacebook(req, res) {
    console.log(req.body);
    if (req.body.info) {
      let accessToken = req.body.info.accessToken;
      axios
        .get(`https://graph.facebook.com/me?access_token=${accessToken}`)
        .then(async (data) => {
          if (!data.data.error) {
            let oldUser = await this.knex("users")
              .select("id")
              .where("facebookid", req.body.info.id);
          }
          if (oldUser.length >= 1) {
            console.log(`existing user`);
            let payload = {
              id: oldUser[0].id,
            };
            let token = jwt.sign(payload, config.jwtSecret);
            let userInfo = {
              user: oldUser[0],
              token: token,
            };
            res.json({ userInfo });
          } else {
            let newUser = {
              name: req.body.info.name,
              email: req.body.info.email,
              facebookaccesstoken: req.body.info.facebookaccesstoken,
              facebookid: req.body.info.id,
            };
            let userInfoDB = await this.knex("users")
              .insert(newUser)
              .returning("id");
            let payload = {
              id: userInfoDB[0].id,
            };
            const token = jwt.sign(payload, config.jwtSecret);
            let userInfo = {
              user: userInfoDB[0],
              token: token,
            };
            res.json({ payload });
          }
        });
    } else {
      res.sendStatus(401);
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
