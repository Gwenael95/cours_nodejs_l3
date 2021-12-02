import nodemailer from "nodemailer" ;
import config from "./config.js";


//@todo link should contain a key (generated with date and some other data
/**
 * Send a mail to user who forgot his password.
 * The mail contain a link to a reset password page.
 * @param mail {String} : mail of the user
 * @return {Promise<void>}
 */
export async function sendMailForgotPassword(mail) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '<l3.cergy@edu.itescia.fr>', // sender address
        to: mail, // list of receivers
        subject: "Mot de passe oublié ✔", // Subject line
        html: "<b>Voici un lien pour récuperer votre mot de passe." +
            "<a href='http://" + config.HOST + ":" + config.PORT + "/resetPassword?mail=" + mail + "'>Cliquez ici.</a>" +
            "</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


