// =======================
// WELCOME TEMPLATE
// =======================
export function welcomeTemplate(email, name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Mail</title>
    <style>
      body { background-color: #f4f6f8; font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      .container {
        max-width: 600px; margin: auto; background: #fff; border-radius: 12px;
        overflow: hidden; box-shadow: 0 6px 15px rgba(0,0,0,0.1);
      }
      .header {
        background: linear-gradient(135deg, #4CAF50, #2e7d32);
        color: #fff; text-align: center; padding: 25px;
      }
      .header h1 { margin: 0; font-size: 26px; }
      .body { padding: 20px; color: #333; line-height: 1.6; font-size: 16px; }
      .button {
        display: block; width: fit-content; margin: 25px auto;
        background: #4CAF50; color: #fff; text-decoration: none;
        padding: 14px 25px; border-radius: 8px; font-size: 16px;
      }
      .footer { text-align: center; padding: 15px; font-size: 13px; color: #888; }
      @media(max-width:480px){
        .header h1 { font-size: 20px; }
        .body { font-size: 14px; }
        .button { font-size: 14px; padding: 12px 20px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>Welcome, ${name}!</h1></div>
      <div class="body">
        <p>Hi <b>${name}</b> (<i>${email}</i>),</p>
        <p>🎉 Thanks for joining our platform. Your account has been created successfully.</p>
        <p>Click below to get started and explore our features.</p>
        <a href="#" class="button">Continue</a>
      </div>
      <div class="footer">© ${new Date().getFullYear()} Our Platform. All rights reserved.</div>
    </div>
  </body>
  </html>`;
}

// =======================
// OTP VERIFICATION TEMPLATE
// =======================
export function otpTemplate(name, otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
    <style>
      body { background:#eef2f7; font-family: Arial, sans-serif; margin:0; padding:20px; }
      .container {
        max-width: 600px; margin:auto; background:#fff; border-radius:12px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.1); overflow:hidden;
      }
      .header {
        background: linear-gradient(135deg, #007BFF, #0056b3);
        color:#fff; text-align:center; padding:25px;
      }
      .header h1 { margin:0; font-size:24px; }
      .body { padding:20px; color:#333; font-size:16px; line-height:1.5; }
      .otp {
        background:#007BFF; color:#fff; padding:15px 25px; border-radius:8px;
        font-size:22px; font-weight:bold; letter-spacing:6px; text-align:center;
        width:fit-content; margin:20px auto;
      }
      .footer { text-align:center; padding:15px; font-size:13px; color:#888; }
      @media(max-width:480px){
        .header h1 { font-size:20px; }
        .body { font-size:14px; }
        .otp { font-size:18px; padding:12px 18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>Email Verification</h1></div>
      <div class="body">
        <p>Hello <b>${name}</b>,</p>
        <p>Use the OTP below to verify your account:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
      </div>
      <div class="footer">If you didn’t request this, you can ignore this email.</div>
    </div>
  </body>
  </html>`;
}
// =======================
// OTP VERIFICATION TEMPLATE
// =======================
export function resetPasswordOtpTemplate(name, otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>OTP Verification</title>
    <style>
      body { background:#eef2f7; font-family: Arial, sans-serif; margin:0; padding:20px; }
      .container {
        max-width: 600px; margin:auto; background:#fff; border-radius:12px;
        box-shadow: 0 6px 15px rgba(0,0,0,0.1); overflow:hidden;
      }
      .header {
        background: linear-gradient(135deg, #007BFF, #0056b3);
        color:#fff; text-align:center; padding:25px;
      }
      .header h1 { margin:0; font-size:24px; }
      .body { padding:20px; color:#333; font-size:16px; line-height:1.5; }
      .otp {
        background:#007BFF; color:#fff; padding:15px 25px; border-radius:8px;
        font-size:22px; font-weight:bold; letter-spacing:6px; text-align:center;
        width:fit-content; margin:20px auto;
      }
      .footer { text-align:center; padding:15px; font-size:13px; color:#888; }
      @media(max-width:480px){
        .header h1 { font-size:20px; }
        .body { font-size:14px; }
        .otp { font-size:18px; padding:12px 18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header"><h1>Reset Password</h1></div>
      <div class="body">
        <p>Hello <b>${name}</b>,</p>
        <p>Use the OTP below to reset your password:</p>
        <div class="otp">${otp}</div>
        <p>This OTP is valid for <b>10 minutes</b>. Please do not share it with anyone.</p>
      </div>
      <div class="footer">If you didn’t request this, you can ignore this email.</div>
    </div>
  </body>
  </html>`;
}