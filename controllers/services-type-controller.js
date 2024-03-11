const ServicesType = require("../models/services-type-model");
const status = require("../utils/http_status");
const { servicesTypeSchema } = require("../schemas/services_type_schema");

exports.findAllServicesType = async (req, res) => {
  let result = await ServicesType.findAll({
    order: [["id", "DESC"]],
  });
  return res.send({ data: result, count: result.length });
};

exports.findServicesTypeById = async (req, res) => {
  let result = await ServicesType.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  return res.status(status.HTTP_SUCCESS).send({ data: result });
};

exports.createServicesType = async (req, res) => {
  const validate = servicesTypeSchema.validate(req.body);
  if (!validate) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({ msg: validate.error.message });
  }

  const checked = await ServicesType.findOne({
    where: { service_type_la: req.body.service_type_la },
  });
  if (checked) {
    return res.send({
      msg: `service type ${req.body.service_type_la} ຂໍ້ມູນມີແລ້ວ`,
    });
  }

  const newServiceType = await ServicesType.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newServiceType });
};

exports.updateServicesType = async (req, res) => {
  const result = await ServicesType.findByPk(req.params.id);
  if (!result) {
    return res.status(status.HTTP_NOT_FOUND).send({ msg: "ບໍ່ພົບຂໍ້ມູນ" });
  }

  if (
    result.service_type_la != req.body.service_type_la ||
    result.service_type_en != req.body.service_type_en
  ) {
    const checked = await ServicesType.findOne({
      where: { service_type_la: req.body.service_type_la },
    });
    if (checked) {
      return res.send({
        msg: `service type ${req.body.service_type_la} ຂໍ້ມູນມີແລ້ວ`,
      });
    }
  }
  await ServicesType.update(req.body, { where: { id: req.params.id } });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ msg: "Update Successfully...!" });
};

exports.deleteServicesType = async (req, res) => {
    const result = await ServicesType.findByPk(req.params.id)
    if(!result){
        return res.status(status.HTTP_NOT_FOUND).send({msg: "ບໍ່ພົບຂໍ້ມູນ"})
    }
    await ServicesType.destroy({where: {id:req.params.id}})
    return res.status(status.HTTP_SUCCESS).send({msg:"Delete Successfully...!"})
}
