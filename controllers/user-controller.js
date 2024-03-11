const Role = require("../models/role-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const {
  userCreateSchema,
  userUpdateSchema,
  changePasswordSchema,
} = require("../schemas/user_schema");
const status = require("../utils/http_status");

function passwordHash(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

exports.findAllUser = async (req, res) => {
  const users = await User.findAll({
    order: [["id", "DESC"]],
    attributes: { exclude: ["password", "role_id"] },
    include: { model: Role, as: "role" },
  });
  res.send({ data: users, count: users.length });
};

// exports.findAllRole = async (req, res) => {
//   const users = await Role.findAll();
//   res.send({ data: users, count: users.length });
// };

exports.createUser = async (req, res) => {
  const validate = userCreateSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  req.body.username = req.body.username.trim();
  req.body.password = req.body.password.trim();

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (user) {
    return res.send({ msg: `username: ${req.body.username} ມີຂໍ້ມູນຢູ່ແລ້ວ` });
  }

  req.body.password = passwordHash(req.body.password);
  const newUser = await User.create(req.body);
  res.send({ data: newUser, count: 1 });
};

exports.findUserById = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }, // res ໃຫ້ມັນຕັດ password role_id ອອກ
    include: { model: Role, as: "role" },
  });
  if (!user) {
    return res.send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }
  res.send({ data: user, count: 1 });
};

exports.updateUserById = async (req, res) => {
  const validate = userUpdateSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return res.send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }

  req.body.username = req.body.username.trim();

  // ຖ້າ user ປ່ຽນ username ໃຫ້ກວດວ່າມີຄົນໃຊ້ username ນີ້ແລ້ວບໍ່?
  if (req.body.username != user.username) {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
      return res.send({
        msg: `username: ${req.body.username} ມີຂໍ້ມູນຢູ່ແລ້ວ`,
      });
    }
  }

  // update user
  user.fullname_en = req.body.fullname_en;
  user.fullname_la = req.body.fullname_la;
  user.username = req.body.username;
  user.active = req.body.active;
  user.role_id = req.body.role_id;
  await user.save();
  res.send({ data: user, count: 1 });
};

exports.deleteUserById = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }
  user.active = 0;
  await user.save();
  res.send({ msg: "ລຶບສຳເລັດ" });
};

exports.changePassword = async (req, res) => {
  const validate = changePasswordSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }
  user.password = passwordHash(req.body.password);
  await user.save();
  res.send({ msg: "ສຳເລັດ" });
};

// exports.updateUserDeviceToken = async (req, res) => {
//   const user = await User.findOne({ where: { id: req.params.id } });
//   if (!user) {
//     return res.status(status.HTTP_NOT_FOUND).send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
//   }
//   user.registration_token = req.body.registration_token;
//   await user.save();
//   res.status(status.HTTP_SUCCESS).send({ msg: "success" });
// };
