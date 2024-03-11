const ServiceCountry = require("../models/service-country-model");
const { serviceCountrySchema } = require("../schemas/service_country_schema");
const status = require("../utils/http_status");
const ServicesType = require("../models/services-type-model");
const { Op } = require("sequelize");

exports.findAllServiceCountry = async (req, res) => {
  const service_type_id = req.query.service_type_id;
  let filter = {};
  if (service_type_id) {
    filter = {
      [Op.or]: [
        {
          service_type_id: { [Op.like]: `%${service_type_id}%` },
        },
      ],
    };
  }
  const result = await ServiceCountry.findAll({
    order: [["id", "DESC"]],
    // attributes: { exclude: ["service_type_id"] },
    include: { model: ServicesType, as: "servicesType" },
    where: {...filter}
  });
  return res
    .status(status.HTTP_SUCCESS)
    .send({ data: result, count: result.length });
};

exports.findServiceCountryById = async (req, res) => {
  const result = await ServiceCountry.findOne({
    where: {id: req.params.id},
    include:{model: ServicesType, as: "servicesType"}
  })

  if(!result){
    return res.status(status.HTTP_NOT_FOUND).send({msg:"ຂໍ້ມູນບໍ່ມີ"})
  }

  return res.status(status.HTTP_SUCCESS).send({data:result})
}

exports.createServiceCountry = async (req, res) => {
  const validate = serviceCountrySchema.validate(req.body);
  if (!validate) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .res({ msg: validate.error.message });
  }

  const checked = await ServiceCountry.findOne({
    where: {
      [Op.and]: [
        {
          country_name_la: req.body.country_name_la,
        },
        {
          service_type_id: req.body.service_type_id,
        },
      ],
    },
  });

  if (checked) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .send({
        msg: `Service Country: ${req.body.country_name_la} ຂໍ້ມູນມີແລ້ວ`,
      });
  }

  const newServiceCountry = await ServiceCountry.create(req.body);
  return res.status(status.HTTP_SUCCESS).send({ data: newServiceCountry });
};

exports.updateServiceCountry = async (req, res) => {
  const result = await ServiceCountry.findByPk(req.params.id)
  if(!result){
    return res.status(status.HTTP_NOT_FOUND).send({msg:"ຂໍ້ມູນບໍ່ມີ"})
  }
  const validate = serviceCountrySchema.validate(req.body);
  if (!validate) {
    return res
      .status(status.HTTP_BAD_REQUEST)
      .res({ msg: validate.error.message });
  }
  const newUpdate = await ServiceCountry.update(req.body,{ where: { id: req.params.id } })
  if(newUpdate > 0){
    return res.status(status.HTTP_SUCCESS).send({msg:"Update Successfully...!"})
  }

}

exports.deleteServiceCountry = async (req, res) => {
  const result = await ServiceCountry.findByPk(req.params.id)
  if(!result){
    return res.status(status.HTTP_NOT_FOUND).send({msg:"ຂໍ້ມູນບໍ່ມີ"})
  }
  const deleteData = await ServiceCountry.destroy({where: {id:req.params.id}})
  if(deleteData > 0 ){
    return res.status(status.HTTP_SUCCESS).send({msg: "Delete Successfully...!"})
  }
}
