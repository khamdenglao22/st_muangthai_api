const Role = require("../models/role-model");
const status = require("../utils/http_status");
const { roleCreateSchema } = require("../schemas/role_schema");

exports.findAllRole = async (req, res) => {
  const roles = await Role.findAll({
    order: [["id", "DESC"]],
  });
  res.send({ data: roles, count: roles.length });
};

exports.deleteRole = async (req, res) => {
  const role = await Role.findByPk(req.params.id);
  if (!role) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: `ບໍ່ພົບຂໍ້ມູນ` });
  }
  await role.destroy();
  res.status(status.HTTP_SUCCESS).send({msg:"Delete Successfully...!"});
};

exports.findRoleById = async (req, res) => {
  const role = await Role.findOne({
    where: { id: req.params.id },
  });

  if (!role) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }
  res.send({ data: role, count: 1 });
};

exports.createRole = async (req, res) => {
  const validate = roleCreateSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  const _role = await Role.findOne({
    where: { role_name_la: req.body.role_name_la.trim() },
  });
  if (_role) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: `role = ${req.body.role_name_la} ມີຂໍ້ມູນຢູ່ແລ້ວ` });
  }
  // creat new role
  const newRole = await Role.create({
    role_name_la: req.body.role_name_la.trim(),
    role_name_en: req.body.role_name_en.trim(),
  });
  res.status(status.HTTP_CREATED).send({ data: newRole, count: 1 });
};

exports.updateRole = async (req, res) => {
  const validate = roleCreateSchema.validate(req.body);
  if (validate.error) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  const role = await Role.findByPk(req.params.id);
  if (!role) {
    return res
      .status(status.HTTP_NOT_FOUND)
      .send({ msg: `ບໍ່ພົບຂໍ້ມູນ role id ${req.params.id}` });
  }

  if (role.role_name_la != req.body.role_name_la.trim()) {
    const _role = await Role.findOne({
      where: { role_name_la: req.body.role_name_la.trim() },
    });
    if (_role) {
      return res
        .status(status.HTTP_BAD_REQUEST)
        .send({ msg: `role = ${req.body.role_name_la} ມີຂໍ້ມູນຢູ່ແລ້ວ` });
    }
  }

  role.role_name_la = req.body.role_name_la.trim();
  role.role_name_en = req.body.role_name_en.trim();
  await role.save();

  const update_role = await Role.findOne({
    where: { id: role.id },
    attributes: { exclude: ["id"]},
})

  res.status(status.HTTP_CREATED).send({ data: update_role, count: 1 });
};
