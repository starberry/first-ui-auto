// Gatsby settings for the environment variables
require("dotenv").config({
  path: `.env`,
})
var cors = require('cors')
const express = require('express');
const _ = require('lodash');

const path = require("path")


const serverless = require('serverless-http');

var app = express();



var router = express.Router();

const bodyParser = require('body-parser');  

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
app.use(cors())

var request = require('request');
var rp = require('request-promise');
var apiBaseUrl = process.env.MAILGUN_API_URL;
var apiKey = process.env.MAILGUN_API_KEY;
var from = process.env.MAIL_FROM;
var bcc = process.env.MAIL_BCC;

let sampledata = [
  {
    a: process.env.MAIL_FROM,
    b: process.env.RECAPTCHA_KEY,
    c: process.env.MAILGUN_API_URL,
    d: process.env.MAILGUN_API_KEY,
    e: process.env.MAILGUN_DOMAIN,
    g: process.env.MAIL_TO,
    h: process.env.MAIL_SUBJECT_DEV  
  }
]

var company_name = "Redbrik";
var contact_email = "hello@redbrik.co.uk";  
var company_phone = "01743284990";
var address = "13 – 15 Glumangate, Chesterfield S40 1TX";
var fb_link = "https://www.facebook.com/redbrikestateagents";
var tw_link = "https://twitter.com/REDBRIKproperty";
var contact_url = "https://wardsofkent.q.starberry.com/contact";
 


const devEnvCheck = (template, to, cc) => {

  // if ('production' !== process.env.MAIL_ENV) {

    var message = '';
    var message = "<p>Original Recipients: To: " + to + "</p>\n";
    if (cc)
      message += "<p>CC: " + cc + "</p>\n";
    if (process.env.MAIL_BCC)
      message += "<p>BCC: " + process.env.MAIL_BCC + "</p>\n";

    template = message + template

    to = process.env.MAIL_BCC;
    cc = undefined;

  // }

  return [template, to, cc]
}


router.post('/test', function (req, res) {  
  res.send('test'); res.status(200);
});

 
router.post('/contact', async ({ body }, res) => {

  const myformdata = (body) 

  var axios = require('axios');

  axios.defaults.baseURL = process.env.GATSBY_SITE_URL; 
 

  axios.all([
    axios.get('/email/' + myformdata.email_temp_user + '.txt'),
    axios.get('/email/' + myformdata.email_temp_admin + '.txt')
  ]).then(axios.spread((resp, respadmin) => {
    var template = (resp.data).toString('utf8');

    var template_admin = (respadmin.data).toString('utf8');

    var d = new Date();

    template = template.replace(/__imgurl__/g, process.env.GATSBY_SITE_URL + '/images/')
    template = template.replace(/__siteurl__/g, process.env.GATSBY_SITE_URL + '/')

    template = template.replace(/__sitename__/g, company_name)
    template = template.replace(/__site_email__/g, contact_email)
    template = template.replace(/__site_phone_tel__/g, 'tel:' + company_phone)
    template = template.replace(/__site_phone__/g, company_phone)
    template = template.replace(/__site_address__/g, address)
    template = template.replace(/__twlink__/g, tw_link)
    template = template.replace(/__fblink__/g, fb_link)
    template = template.replace(/__contact_url__/g, contact_url)
    template = template.replace(/__copyRightYear__/g, d.getFullYear())
    template = template.replace(/__name__/g, (myformdata.name))
    template = template.replace(/__people_name__/g, (myformdata.people_name))
    template = template.replace(/__people_number__/g, (myformdata.people_number))


    template_admin = template_admin.replace(/__imgurl__/g, process.env.GATSBY_SITE_URL + '/images/')
    template_admin = template_admin.replace(/__siteurl__/g, process.env.GATSBY_SITE_URL + '/')

    template_admin = template_admin.replace(/__copyRightYear__/g, d.getFullYear())
    template_admin = template_admin.replace(/__sitename__/g, company_name)

    template_admin = template_admin.replace(/__name__/g, (myformdata.name))
    template_admin = template_admin.replace(/__email__/g, (myformdata.email))
    template_admin = template_admin.replace(/__message__/g, (myformdata.message))
    template_admin = template_admin.replace(/__telephone__/g, (myformdata.telephone))



    
    

    var to = myformdata.email;
    var subject = company_name + ' - ' + myformdata.email_subject_user + process.env.MAIL_SUBJECT_DEV;
    var subject_admin = company_name + ' - ' + myformdata.email_subject_admin + process.env.MAIL_SUBJECT_DEV;

    var mailgunOpts = {
      url: apiBaseUrl + '/messages',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
      },
      form: {
        from: from, to: to, bcc: bcc, subject: subject, html: template
      }
    };

    var to_admin = process.env.MAIL_TO;

    var mailgunOpts_admin = {
      url: apiBaseUrl + '/messages',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
      },
      form: {
        from: from, to: to_admin , bcc: bcc, subject: subject_admin, html: template_admin
      }
    };
    rp(mailgunOpts)
      .then(function (body) {

        rp(mailgunOpts_admin)
          .then(function () {
            res.send('success'); res.status(200);
          })
          .catch(function (err2) {
            res.send(err2); res.status(500);
          });

      })
      .catch(function (err3) {
        res.send(err3); res.status(500);
      });

    //res.send('success');
    //res.status(200);

  })).catch(err => {
    //console.log(err);
    //res.send(err);
    //res.status(500);
  });

});




router.post('/newsletter', async ({ body }, res) => {

  const myformdata = (body)

  var template = 'email goes here';

  var axios = require('axios');

  axios.defaults.baseURL = process.env.GATSBY_SITE_URL;

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  axios.all([
    axios.get('/email/' + myformdata.email_temp_user + '.txt'),
    axios.get('/email/' + myformdata.email_temp_admin + '.txt')
  ]).then(axios.spread((resp, respadmin) => {

    var template = (resp.data).toString('utf8');

    var template_admin = (respadmin.data).toString('utf8');

    var d = new Date();

    template = template.replace(/__imgurl__/g, process.env.GATSBY_SITE_URL + '/images/')
    template = template.replace(/__siteurl__/g, process.env.GATSBY_SITE_URL + '/')

    template = template.replace(/__sitename__/g, company_name)
    template = template.replace(/__site_email__/g, contact_email)
    template = template.replace(/__site_phone_tel__/g, 'tel:' + company_phone)
    template = template.replace(/__site_phone__/g, company_phone)
    template = template.replace(/__site_address__/g, address)
    template = template.replace(/__twlink__/g, tw_link)
    template = template.replace(/__fblink__/g, fb_link)
    template = template.replace(/__contact_url__/g, contact_url)
    template = template.replace(/__copyRightYear__/g, d.getFullYear())
    template = template.replace(/__name__/g, (myformdata.name))


    template_admin = template_admin.replace(/__imgurl__/g, process.env.GATSBY_SITE_URL + '/images/')
    template_admin = template_admin.replace(/__siteurl__/g, process.env.GATSBY_SITE_URL + '/')

    template_admin = template_admin.replace(/__copyRightYear__/g, d.getFullYear())
    template_admin = template_admin.replace(/__sitename__/g, company_name)

    template_admin = template_admin.replace(/__email__/g, (myformdata.email))
    template_admin = template_admin.replace(/__name__/g, (myformdata.name))
 
    var to = myformdata.email;
    var subject = company_name + ' - ' + myformdata.email_subject_user + process.env.MAIL_SUBJECT_DEV;
    var subject_admin = company_name + ' - ' + myformdata.email_subject_admin + process.env.MAIL_SUBJECT_DEV;

    var mailgunOpts = {
      url: apiBaseUrl + '/messages',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
      },
      form: {
        from: from, to: to, bcc: bcc, subject: subject, html: template
      }
    };

    var to_admin = process.env.MAIL_TO;

    var mailgunOpts_admin = {
      url: apiBaseUrl + '/messages',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
      },
      form: {
        from: from, to: to_admin, bcc: bcc, subject: subject_admin, html: template_admin
      }
    };

    rp(mailgunOpts)
      .then(function (body) {

        rp(mailgunOpts_admin)
          .then(function () {
            res.send('success'); res.status(200);
          })
          .catch(function (err2) {
            res.send(err2); res.status(500);
          });

      })
      .catch(function (err3) {
        res.send(err3); res.status(500);
      });

    //res.send('success');
    //res.status(200);

  })).catch(err => {
    console.log(err);
    res.send(err);
    res.status(500);
  });

});



 
app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);
