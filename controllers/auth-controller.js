const Role = require("../models/role-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../schemas/auth_schema");
const status = require('../utils/http_status');
require("dotenv").config();


exports.login = async (req, res) => {
  const validate = loginSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  const user = await User.findOne({
    where: { username: username, active: true },
    include: ["role"],
  });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send({ msg: "username ຫຼື password ບໍ່ຖືກຕ້ອງ" });
  }

  if (!user.role || !user.role.role_name_la) {
    return res.status(401).send({ msg: "ທ່ານບໍ່ມີສິດເຂົ້າເວັບນີ້" });
  }

  // const config = await Config.findOne({ where: { name: 'BACKOFFICE_TOKEN_EXPIRES_IN' } })
  const days = 7;
  let expiresIn = 24 * days;

  const token = jwt.sign(
    {
      user_id: user.id,
      fullname_en: user.fullname_en,
      fullname_la: user.fullname_la,
      role_id: user.role_id,
      role_name: user.role ? user.role.role_name_la : null,
      // can_access_web: user.role ? user.role.can_access_web : false,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: `${expiresIn}h`,
    }
  );
  res.send({ token: token });
};

exports.getCurrentUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ msg: "ກະລຸນາເຂົ້າສູ່ລະບົບ" });
  }

  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.user_id, {
      include: {
        model: Role,
        as: "role",
      },
    });
    if (!user) {
      return res.status(401).send({ msg: "ກະລຸນາເຂົ້າສູ່ລະບົບ" });
    }

    if (!user.role || !user.role.role_name) {
      return res.status(401).send({ msg: "ທ່ານບໍ່ມີສິດເຂົ້າເວັບນີ້" });
    }

    req.user = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      role_id: user.role_id,
    };

    next();
  } catch (err) {
    return res.status(401).send({ msg: "ກະລຸນາເຂົ້າສູ່ລະບົບ" });
  }
};
