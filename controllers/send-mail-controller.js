const nodemailer = require("nodemailer");


exports.sendMail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "stmti_system_notify@stmuangthai.com",
          pass: "$tmti@$yst3mN0t1f!",
        },
    
      });
    
      let mailOptions = {
        from: "stmti_system_notify@stmuangthai.com",
        to: "info@stmuangthai.com",
        subject: "ST-MungThai Notify",
        text: "Hello...!",
        html: `
        <h3>Full Name: ${req.body.fullName}</h3>
        <p>${req.body.email}</p>
        <span>${req.body.des}</span>
        `,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          //   return console.log(error.message);
          return res.status(200).json({
            RespCode: 400,
            ResMessage: "bad",
            ResError: error,
          });
        }
        // console.log("success");
        return res.status(200).json({
          ResCode: 200,
          ResMessage: "success",
        });
      });

}