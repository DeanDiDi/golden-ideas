import axios from 'axios';

export const sendEmail = params => {
  const message = {
    from: params.from || 'goldean.ideas@mail.utoronto.ca',
    subject: params.subject || 'Link to your project',
    to: params.to,
    text: params.text,
  };
  axios.post('/api/email/send', { message })
  .then((response) => {
    console.log('please go to this url to check email:', response.data.url);
  })
  .catch((error) => {
    console.log('error occured when sending email', error);
  });
};
