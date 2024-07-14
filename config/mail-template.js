const HTML_TEMPLATE = (title, header, text) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <title>Notification</title>
    <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=DM+Sans&display=swap" rel="stylesheet" />
    <style>
      
      .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #f4f4f4;
      }
  
      .email {
        width: 60%;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
      }
  
      .email-header {
        /* background-color: #333; */
        background: linear-gradient(180deg,
            rgb(180, 229, 224) 0%,
            rgb(119, 207, 194) 19.27%,
            rgb(63, 184, 163) 58.85%,
            rgb(56, 156, 154) 100%);
        color: #070707;
        padding: 20px;
        text-align: center;
      }
  
      .email-body {
        padding: 20px;
      }
  
      .email-footer {
        /* background-color: #333; */
        background: linear-gradient(180deg,
            rgb(180, 229, 224) 0%,
            rgb(119, 207, 194) 19.27%,
            rgb(63, 184, 163) 58.85%,
            rgb(56, 156, 154) 100%);
        color: #010101;
        padding: 20px;
        text-align: center;
      }
      .young-delivery-man-r {
          /* height: 159px; */
          left: 2%;
          position: relative;
          top: 20%;
          width: 220px;
      }
  
      .ulaa-2023-all-rights-reserved {
        align-self: center;
        color: var(--gray1);
        font-family: var(--font-family-dm_sans);
        font-size: var(--font-size-xs);
        font-weight: 400;
        letter-spacing: 0;
        line-height: normal;
        margin-right: 1px;
        min-height: 16px;
        min-width: 174px;
      }
      .title {
        color: var(--vulcan);
        font-family: var(--font-family-dm_sans);
        font-size: var(--font-size-xxl);
        font-weight: 700;
        left: 30%;
        letter-spacing: 0;
        line-height: normal;
        position: absolute;
        /* top: 0%; 
        width: 295px;*/
      }
      .logo {
        background-color: var(--text500);
        background-image: url("../../assets//images/logo.png");
        background-size: 100% 100%;
        border-radius: 12px;
        height: 24px;
        margin-bottom: 1px;
        width: 24px;
      }
      .ulaa {
        color: var(--vulcan);
        font-family: var(--font-family-bebas_neue);
        font-size: var(--font-size-xl);
        font-weight: 400;
        letter-spacing: 0;
        line-height: normal;
        min-height: 29px;
        min-width: 38px;
      }
      .group-33771 {
        align-items: center;
        display: flex;
        gap: 9px;
        height: 29px;
        left: 25%;
        min-width: 73px;
        position: absolute;
        top: 10%;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="email">
        <div class="email-header">
          <!-- <div class="group-33771">
            <div class="logo"></div>
            <div class="ulaa">Ulaa</div>
          </div> -->
          <h1 >${header} <br/>Registration Approval</h1>
          <img class="young-delivery-man-r" src="https://firebasestorage.googleapis.com/v0/b/al-ulaa-dev.appspot.com/o/v1189_21617.png?alt=media&token=eea8086d-9e38-4b73-9e68-e9a4e7993ced">
        </div>
        <div class="email-body">
          <p>
          ${text}
          </p>
  
        </div>
        <div class="email-footer">
          <p class="ulaa-2023-all-rights-reserved">
            © Ulaa 2023. All rights reserved
          </p>
        </div>
      </div>
    </div>
  </body>
  
  </html>
    `;
};

module.exports = HTML_TEMPLATE;
