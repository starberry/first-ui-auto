var rp = require('request-promise');

var site_url = process.env.GATSBY_SITE_URL;
var apiBaseUrl = process.env.MAILGUN_API_URL;
var apiKey = process.env.MAILGUN_API_KEY;
var from = process.env.MAIL_FROM;
var bcc = process.env.MAIL_BCC;
var company_name = process.env.GATSBY_SITE_NAME;

const isProduction = 'production' === process.env.MAIL_ENV

  export default function formHandler(req, res) {
      const myformdata = (req.body) 

    var axios = require('axios');
  
    axios.defaults.baseURL = process.env.GATSBY_CLOUD_URL; 
    
    function formatproplist(url,title,img) {

      return '<a href="'+url+'" target="_blank" class="link" style="color:#242220; text-decoration:none"><img src="'+img+'" width="400" height="300" /><br /><span class="link" style="color:#2b3a4c; text-decoration:none"><span class="link" style="color:#2b3a4c; text-decoration:none"><span class="link" style="color:#242220; text-decoration:none"><u>'+title+'</u></span></span></span></a><br /><br />';
   }
  
    axios.all([
      axios.get('/email/' + myformdata.email_temp_user + '.txt'),
      axios.get('/email/' + myformdata.email_temp_admin + '.txt')
    ]).then(axios.spread((resp, respadmin) => {
      var template = (resp.data).toString('utf8');
  
      var template_admin = (respadmin.data).toString('utf8');
  
      var d = new Date();

      template = template.replace(/__imgurl__/g, process.env.GATSBY_CLOUD_URL + '/images/')
      template = template.replace(/__siteurl__/g, site_url+ '/')
  
      template = template.replace(/__sitename__/g, company_name)
      template = template.replace(/__site_email__/g, myformdata.company_email)
      template = template.replace(/__site_phone_tel__/g, 'tel:' + myformdata.company_phone)
      template = template.replace(/__site_phone__/g, myformdata.company_phone)
      template = template.replace(/__site_address__/g, myformdata.company_address)
      template = template.replace(/__contact_url__/g, site_url + myformdata.enquiry_url)
      template = template.replace(/__valuation_url__/g, site_url + myformdata.valuation_url)
      template = template.replace(/__copyRightYear__/g, d.getFullYear())
      template = template.replace(/__name__/g, (myformdata.name))
      template = template.replace(/__lastname__/g, (myformdata.lastname))
      template = template.replace(/__office_url__/g, myformdata.office_url)
      template = template.replace(/__address__/g, (myformdata.address))  
      template = template.replace(/__Days__/g, myformdata.company_available_days)
      template = template.replace(/__Timinigs__/g, myformdata.company_available_time)
      template = template.replace(/__property_address__/g, (myformdata.property_address))  
      template = template.replace(/__property_url__/g, (myformdata.property_url))  
      template = template.replace(/__property_img_url__/g, (myformdata.property_img_url))  
      template = template.replace(/__primary_color__/g, (myformdata.primary_color))  


      template = template.replace(/__propertylist__/g, formatproplist( myformdata.property_url , myformdata.property_title, myformdata.property_img))

      
      var propertyshowuser = 'none';
      if (myformdata.property_url) {
        propertyshowuser = 'block';
      }

      template = template.replace(/__property_show_user__/g, (propertyshowuser))
  
      template_admin = template_admin.replace(/__imgurl__/g, process.env.GATSBY_CLOUD_URL + '/images/')
      template_admin = template_admin.replace(/__siteurl__/g, site_url+ '/')
  
      template_admin = template_admin.replace(/__copyRightYear__/g, d.getFullYear())
      template_admin = template_admin.replace(/__sitename__/g, company_name)
      template_admin = template_admin.replace(/__iam__/g, (myformdata.iamname))
      template_admin = template_admin.replace(/__name__/g, (myformdata.name))
      template_admin = template_admin.replace(/__lastname__/g, (myformdata.lastname))
      template_admin = template_admin.replace(/__email__/g, (myformdata.email))
      template_admin = template_admin.replace(/__message__/g, (myformdata.message))
      template_admin = template_admin.replace(/__file_url__/g, (myformdata.file_url))
      template_admin = template_admin.replace(/__telephone__/g, (myformdata.telephone))
      template_admin = template_admin.replace(/__date_time__/g, (myformdata.date_time))
      template_admin = template_admin.replace(/__address__/g, (myformdata.address))
      template_admin = template_admin.replace(/__newsletter_subscribe__/g, (myformdata.newsletter_subscribe))      
      template_admin = template_admin.replace(/__phone__/g, (myformdata.telephone))
      template_admin = template_admin.replace(/__phone_tel__/g, (myformdata.telephone))      
      template_admin = template_admin.replace(/__propertylist__/g, formatproplist( myformdata.property_url , myformdata.property_title, myformdata.property_img))
      template_admin = template_admin.replace(/__subject__/g, myformdata.subject)
      template_admin = template_admin.replace(/__postcode__/g, myformdata.postcode)
      template_admin = template_admin.replace(/__date__/g, myformdata.preferred_date)
      template_admin = template_admin.replace(/__time__/g, myformdata.preferred_time)
      template_admin = template_admin.replace(/__property_address__/g, myformdata.property_address)
      template_admin = template_admin.replace(/__property_url__/g, myformdata.property_url)
      template_admin = template_admin.replace(/__branch__/g, (myformdata.branch))
      template_admin = template_admin.replace(/__enquiry__/g, (myformdata.enquiry))
      template_admin = template_admin.replace(/__bedrooms__/g, (myformdata.bedrooms))
      template_admin = template_admin.replace(/__propertytype__/g, (myformdata.property_type))
      template_admin = template_admin.replace(/__property_address__/g, (myformdata.property_address))  
      template_admin = template_admin.replace(/__property_url__/g, (myformdata.property_url))  
      template_admin = template_admin.replace(/__property_img_url__/g, (myformdata.property_img_url))  
      template_admin = template_admin.replace(/__cv__/g, (myformdata.cvname))  
      template_admin = template_admin.replace(/__department__/g, (myformdata.department))

      var propertyshowadmin = 'none';
      if (myformdata.property_url) {
        propertyshowadmin = 'block';
      }

      template_admin = template_admin.replace(/__property_show_admin__/g, (propertyshowadmin))

    

      var to = myformdata.email;
      var subject = "";
      var subject_admin = "";

      if (company_name) {
        subject = company_name + ' - ' + myformdata.email_subject_user;
        subject_admin = company_name + ' - ' +myformdata.email_subject_admin;
      } else {
        subject = myformdata.email_subject_user ;
        subject_admin = myformdata.email_subject_admin;
      }
  
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

      // SEND TO EMAILS ONLY ON PRODUCTION
      if (isProduction) {
          // if(myformdata.to_email_id != "" && myformdata.to_email_id != false) {
          //   to_admin = myformdata.to_email_id;
          // }
          if (myformdata.to_email_id && myformdata.to_email_id !== "") {
            to_admin = myformdata.to_email_id+","+process.env.MAIL_TO
          }
      }
      // SEND TO EMAILS ONLY ON PRODUCTION

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
              return res.send('success');
            })
            .catch(function (err2) {
              // res.send(err2); res.status(500);
              throw err2
            });
  
        })
        .catch(function (err3) {
          // res.send(err3); res.status(500);
          throw err3
        });
  
      //res.send('success');
      //res.status(200);
  
    })).catch(err => {
      // console.log(err);
      return res.send(err);
      //res.status(500);
    });


    // return res.json(`OK`)
}
