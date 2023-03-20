const nodemailer = require('nodemailer');

module.exports = async (req) => {
    const { email, active } = req;
    const { validateKey } = active;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const html = `<a href="http://localhost:4000/users/activated?email=${email}&validateKey=${validateKey}">Please click to the link for validate register</a>
  `;
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <foo@example.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: 'Validate Register', // Subject line
        html: html, // html body
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
