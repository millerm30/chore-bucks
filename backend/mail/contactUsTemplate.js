const contactTemplate = (name, email, message) => {
  const html = `
  <style>
      body {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    </style>
    <div style="max-width:600px;margin:0 auto;padding:20px;box-sizing:border-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <img src="cid:logo" alt="Logo">
      </div>
      <div>
        <h1 style="font-size:22px;margin:0">Contact Us Form</h1>
      </div>
      <div style="margin-bottom:20px">
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      </div>
    </div>
  `;
  return html;
};

module.exports = contactTemplate;