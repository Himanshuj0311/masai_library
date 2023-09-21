const express = require("express")

const jwt = require("jsonwebtoken")


const authorization = (req, res, next) => {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, "token");
      if (decoded.isAdmin) {
        next();
      } else {
        res.send("access denied");
      }
    ;
  };


module.exports = {authorization}
