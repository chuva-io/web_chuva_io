#!/usr/bin/env node

const marked = require('marked');
const fs = require('fs');

let arg1;

const processFiles = (files) => {
  for (let file of files) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
    
      marked.setOptions({
        gfm: true,
        headerIds: false,
        langPrefix: '',
      });
    
      const fileName = file.split('/').slice(-1)[0];
    
      const dir = './blog/';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
    
      const htmlFileName = fileName.split('.')[0] + '.html';
      fs.writeFile(dir + htmlFileName, top + marked(data) + bottom, function (err) {
        if (err) throw err;
      });
    });
  }
};

if (process.stdin.isTTY) {
  // CLI
  arg1 = process.argv[2];
  
  processFiles(arg1);
}
else {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(data) {
    arg1 = data.split('\n');
    arg1.pop();
  
    processFiles(arg1);
  });
}

const top = `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PBKTQ92');</script>
    <!-- End Google Tag Manager -->

    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- build:css css/main.css -->
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">

    <link rel="stylesheet" href="../css/styles.css">
    <!-- endbuild -->

    <title>Chuva - Blog</title>
</head>

<body>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PBKTQ92"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div class="container content">`;

const bottom = `</div>
  
  <footer>
  <div class="container">
  <div class="text-center">
  <p>© Copyright 2019 Chuva, LLC.</p>
</div>
</div>
</footer>

<!-- build:js js/main.js -->
<!-- jQuery first, then Popper.js, then Bootstrap JS. -->
<script src="../node_modules/jquery/dist/jquery.slim.min.js"></script>
  <script src="../node_modules/popper.js/dist/umd/popper.min.js"></script>
  <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <!-- endbuild -->
  
  </body>
  
  </html>`;
