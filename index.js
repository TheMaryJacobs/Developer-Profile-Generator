const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const pdf = require('html-pdf');

const options = { format: 'Letter' };

let feedback = {
    avatar: '',
    name: '',
    location: '',
    profile: '',
    blog: '',
    bio: '',
    repos: '',
    followers: '',
    following: '',
    stars: '',
    // bgColor: '',


};


inquirer.prompt([
    {
        type:"input",
        message: "Enter your GitHub UserName",
        name: "username"
    },
    { type: "checkbox",
        message: "color?",
        name: "mycolor",
        choices: [
            "salmon",
            "coral",
            "pink",
            "sunset"]
    }

]).then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(response){
    const repoNames = response.data.avatar_url;


            feedback.avatar=response.data.avatar_url;
            feedback.name=response.data.login;
            feedback.location=response.data.location;
            feedback.profile=response.data.html_url;
            feedback.blog=response.data.blog;
            feedback.bio=response.data.bio;
            feedback.repos=response.data.public_repos;
            feedback.followers=response.data.followers;
            feedback.following=response.data.following;
            feedback.stars=response.data.starred_url;

  console.log(feedback);


let html = `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=Bebas+Neue|Comfortaa&display=swap" rel="stylesheet">
      <title>GitHub Profile</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: rgb(255, 166, 166);
         padding-top: 100px;
         }
         body {
         background-color: rgb(255, 166, 166);
         -webkit-print-color-adjust: exact !important;
         font-family: 'Comfortaa', sans-serif;
         }
         main {
         background-color: rgb(209, 209, 209);
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'Bebas Neue', serif;
         margin: 0;
         }
         h1 {
         font-size: 48px;
         }
         h2 {
         font-size: 28px;
         }
         h3 {
         font-size: 24px;
         }
         h4 {
         font-size: 20px;
         }
         h5 {
         font-size: 18px;
         }
         h6 {
         font-size: 16px;
         }
         .photo-header {
         position: relative;
         margin: 10px auto;
         /* margin-bottom: -50px; */
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: white;
         color: black;
         padding: 10px;
         width: 95%;
         border-radius: 0px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid black;
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           background-color: rgba(255, 255, 255, 0.897);
           padding: 20px;
           border-radius: 6px;
           background-color: b;
           color:gray;
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
          <body>

            <div class="wrapper">
                     <div class="photo-header">
                       <img id="profileimage" class="photo-header img" src ="${feedback.avatar}">
                       <h2 class= "photo-header h1">Hi!</h1>
                       <h1 class ="h1" id = "username">I'm ${feedback.name}</h1>
                        <div class = "links-nav">
                            <a href= "" class = "link-nav"></a>
                            <i class="fab fa-github"></i><a href = "${feedback.profile}" id = "profilelink" class = "nav-link" target="_blank" >GitHub</a>
                      </div> 
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <h2 class="" id="bio">${feedback.bio}</h2>
                      </div>
                    </div>
                </div>
                     </div>
              
                
               
                
                <div class = "container">
                  <div class = "row">
                      <div class = "col">
                        <div class = "card">
                          <h3>Public Repos</h3>
                          <h3>${feedback.repos}</h3>
                        </div>
                    </div>
                    <div class = "col">
                      <div class = "card">
                        <h3>Followers</h3>
                        <h3>${feedback.followers}</h3>
                      </div>
                    </div>
                  </div>

                  <div class = "row">
                    <div class = "col">
                      <div class = "card">
                        <h3>Following</h3>
                        <h3>${feedback.following}</h3>
                      </div>
                    </div>
                      <div class = "col">
                        <div class = "card">
                          <h3>GitHub Stars</h3>
                          <h3>${feedback.stars}</h3>
                        </div>
                    </div>
                  </div>

                </div>
        </div>
              
                <script src = "index.js"></script>
                <script type="text/javascript" src="generateHTML.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js" integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>
                </body>
                </html>`

pdf.create(html, options).toFile('./Profile.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); 
});
});


  });