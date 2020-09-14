const mongoose = require("mongoose");
const User = require("../models/user");
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});
//s1
exports.user_register = (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(500).json({
      message: "Inputs are empty",
    });
  }
  User.findOne({ email: req.body.email })
    .exec()
    .then((info) => {
      if (info) {
        return res.status(200).json({
          message: "Email already exist!",
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          account_status: req.body.account_status,
          email: req.body.email,
          password: req.body.password,
          user_type: req.body.user_type,
        });
        bcrypt.hash(user.password, 10, function (err, hash) {
          user.password = hash;
          user
            .save()
            .then(() => {
              res.status(200).json({
                message: "register success",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      message: "Inputs are empty",
    });
  }
  User.findOne({ email: req.body.email })
    .select("password user_type account_status name _id")
    .exec()
    .then((doc) => {
      if (doc) {
        bcrypt.compare(req.body.password, doc.password, function (err, result) {
          if (result) {
            const token = jwt.sign(
              {
                email: req.body.email,
              },
              process.env.JWT_KEY,
              {
                expiresIn: 1200,
              }
            );
            if (doc.account_status == "Active") {
              res.status(200).json({
                token,
                user_type: doc.user_type,
                name: doc.name,
                _id: doc._id,
                message: "success",
              });
            } else if (doc.account_status == "Pending") {
              res.status(200).json({
                message:
                  "Your Account has not been approved by the Administrator",
              });
            } else if (doc.account_status == "Inactive") {
              res.status(200).json({
                message: "Your account has been inactive",
              });
            }
          } else {
            res.status(401).json({
              message: "invalid credentials",
            });
          }
          if (err) {
            res.status(401).json({
              message: "Authentication failed",
            });
          }
        });
      } else {
        res.status(401).json({
          message: "email not found ",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.forgot_password = (req, res) => {
  if (!req.body.email) {
    return res.status(401).json({
      message: "inputs are empty",
    });
  }
  User.findOne({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result) {
        const token = jwt.sign(
          {
            email: req.body.email,
          },
          process.env.JWT_RESET,
          {
            expiresIn: 900,
          }
        );
        const data = {
          from: "Mailgun Sandbox <noreply@optimum.com>",
          to: req.body.email,
          subject: "Reset Password",
          html: `
                    <p>
                    Hello there,
                    <p>
                        There was recently a request to change the password on your account.
                        If you requested this password change, please click the link below to set a new password within 15min
                        <br>
                        <a href=" http://localhost:3000/ResetPass/recover/${token}">Click here to change your password</a>
                        <p>
                            If the link above does not work, paste this into your browser:
                            <br>
                            http://localhost:3000/ResetPass/recover/${token}
                        </p>
                        <p>
                            If you don't want to change your password, just ignore this message.
                        <p>
                        <p>
                        Thank you
                        <br>
                        Optimum Solution
                        </p>
                    </p>`,
        };
        mg.messages().send(data, function (error, body) {
          if (error) {
            console.log(error);
            return res.status(401).json({
              error: error,
            });
          } else {
            console.log(body.message);
            User.updateOne(
              { email: req.body.email },
              {
                $set: {
                  resetPasswordToken: token,
                },
              }
            ).exec();
            res.status(200).json({
              token,
              message: "Email has been sent",
            });
          }
        });
      } else {
        res.status(200).json({
          message: "Email not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.resetPassword = (req, res) => {
  if (!req.body.password) {
    return res.status(500).json({
      message: "Input is empty",
    });
  }
  User.findOne({ resetPasswordToken: req.params.token })
    .select("email password")
    .exec()
    .then((result) => {
      if (result) {
        bcrypt.compare(req.body.password, result.password, function (
          err,
          match
        ) {
          if (match) {
            res.status(200).json({
              message: "Password cannot be the same",
            });
          }
          if (err) {
            res.status(401).json({
              err: err,
            });
          }
          if (!match) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              User.updateOne(
                { email: result.email },
                {
                  $set: {
                    password: hash,
                    resetPasswordToken: null,
                  },
                }
              )
                .exec()
                .then((doc) => {
                  const data = {
                    from: "Mailgun Sandbox <noreply@optimum.com>",
                    to: result.email,
                    subject: "Password has been reset",
                    text: `Your password has been successfully reset`,
                  };
                  mg.messages().send(data, function (error, body) {
                    if (error) {
                      res.status(500).json({
                        error: error,
                      });
                    }
                    console.log(body.message);
                  });
                  res.status(200).json({
                    message: "Successfully update",
                  });
                });
            });
          }
        });
      } else {
        res.status(404).json({
          message: "404 not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.resetAuth = (req, res) => {
  User.findOne(req.param.token)
    .exec()
    .then((res) => {
      if (res) {
        console.log(res);
      }
    });
};

//s2

//view customer details
exports.user_get_all = (req, res) => {
  User.find({ user_type: "Customer" })
    .select("name email account_status user_type")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Users: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            user_type: doc.user_type,
            account_status: doc.account_status,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//view customer details search by ID
exports.user_get_by_id = (req, res) => {
  const id = req.body.userId;
  User.findById(id)
    .select("name email account_status user_type")
    .exec()
    .then((doc) => {
      console.log("From db", doc);
      if (doc) {
        if (doc.user_type == "Customer") {
          res.status(200).json({
            user: doc,
          });
        } else {
          res
            .status(404)
            .json({ message: "Don't go looking for an admin you dodo" });
        }
      } else {
        res.status(404).json({
          message: "No valid entry found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//get user by email
exports.users_get_by_email = (req, res) => {
  const email = req.body.email;
  User.find({ email: email })
    .select("name email account_status user_type _id")
    .exec()
    .then((doc) => {
      console.log("From db", doc);
      if (doc) {
        if (doc.user_type == "Customer") {
          res.status(200).json({
            user: doc,
          });
        } else {
          res
            .status(404)
            .json({ message: "Don't go looking for an admin you dodo" });
        }
      } else {
        res.status(404).json({ message: "No valid entry found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_pending = (req, res) => {
  User.find({ account_status: "Pending" })
    .select("name email account_status user_type")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Users: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            user_type: doc.user_type,
            account_status: doc.account_status,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//get user by name
exports.users_get_by_name = (req, res) => {
  const name = req.body.name;
  User.find({ name: name })
    .select("name email account_status user_type _id")
    .exec()
    .then((doc) => {
      console.log("From db", doc);
      if (doc) {
        if (doc.user_type == "Customer") {
          res.status(200).json({
            user: doc,
          });
        } else {
          res
            .status(404)
            .json({ message: "Don't go looking for an admin you dodo" });
        }
      } else {
        res.status(404).json({ message: "No valid entry found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_delete = (req, res) => {
  const id = req.body.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//account activate
exports.update_activate_account = (req, res) => {
  const id = req.body.userId;
  User.updateOne(
    { _id: id },
    {
      $set: {
        account_status: req.body.status,
      },
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//account deny
exports.update_deactivate_account = (req, res) => {
  const id = req.body.userId;
  User.updateOne(
    { _id: id },
    {
      $set: {
        account_status: "Inactive",
      },
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_active = (req, res) => {
  User.find({ account_status: "Active", user_type: "Customer" })
    .select("name email account_status user_type")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        Users: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            user_type: doc.user_type,
            account_status: doc.account_status,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
