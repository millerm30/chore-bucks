export const emailTemplate = (getCartResult, total, userName, newBalance) => {
  const html =
  `
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
        <h1 style="font-size:22px;margin:0">Wish List Purchase</h1>
      </div>
      <div style="margin-bottom:20px">
        <p style="margin:0;font-size:14px;color:#777">Receipt Number: ${Math.floor(Math.random() * 1000000000)}</p>
        <p style="margin:0;font-size:14px;color:#777">Date: ${new Date().toLocaleDateString()}</p>
      </div>
      <div style="margin-bottom:20px">
        ${getCartResult
          .map(
            (wish) =>
              `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                <p style="margin:0;font-size:14px">${wish.wish_name} | $${wish.wish_value}</p>
              </div>`
          )
          .join("")}
      </div>
      <hr>
      <p style="font-size:18px;font-weight:bold">Total: $${total}</p>
      <hr>
      <p>Thank you for your purchase ${userName}!</p>
      <p>Here is your new balance: $${newBalance}</p>
      <p>Provide your receipt to your parents to order your wishlist!</p>
    </div>
  `;
  return html;
};