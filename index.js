
const axios = require("axios");
const inquirer = require("inquirer");
const generatehtml = require("./generateHTML")
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
const pdf = require('html-pdf');

// var conversion = convertFactory({ converterPath: convertFactory.converters.PDF });

const fs = require('fs');
const convertFactory = require('electron-html-to');

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };
  
// let watchers = [];

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
};

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub UserName?"
    },
    {
        type: "checkbox",
        message: "color?",
        name: "mycolor",
        choices: [
            "green",
            "blue",
            "pink",
            "red"
        ]
    }
]
// ).then(function ({ username, mycolor }) {

//     console.log(username);
//     console.log(mycolor);

    
// const queryURL = `https://api.github.com/users/${username}/repos?per_page=100`;
//     const queryURL2 = `https://api.github.com/users/${username}`;
//     axios.get(queryURL2)
//         .then(function (response) {

//             let feedback = {
//                 color: mycolor,
//                 profileimageurl: response.data.avatar_url,
//                 username: response.data.name,
//                 location: response.data.location,
//                 profilelink: response.data.html_url,
//                 blog: response.data.blog,
//                 bio: response.data.bio,
//                 publicrepos: response.data.public_repos,
//                 followers: response.data.followers,
//                 following: response.data.following,
//             };


            )
            .then(function({ username }) {
                const queryURL2 = `https://api.github.com/users/${username}`;
                const queryURL = `https://api.github.com/users/${username}/repos?per_page=100`;
            
            axios.get(queryURL2).then(function(response){
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

            // axios.get(queryURL)
            //     .then(function (response) {
            //         for (let i = 0; i < response.data.length; i++) {
            //             watchers.push(response.data[i].watchers_count);
            //         }
            //         // console.log(watchers);
            //         let totalwatchers = watchers.reduce((a, b) => a + b);

            //         //  Number of GitHub stars
            //         console.log("watches/stars" + totalwatchers);

            //         // fs.writeFile("myselection.txt",)
            //         feedback.stars = totalwatchers;
                    
            //         generatehtml(feedback);



            //         fs.writeFile("resume.html", generatehtml(feedback), function (err) {
            //             if (err) {
            //                 return console.log(err);
            //             }
            //             console.log("Done!");
            //         })


            //         fs.readFile('resume.html', 'utf8', (err, htmlString) => {
            //             // add local path in case your HTML has relative paths
            //             htmlString = htmlString.replace(/href="|src="/g, match => {
            //                 return match + './';
            //             });
            //             const conversion = convertFactory({
            //                 converterPath: convertFactory.converters.PDF,
            //                 allowLocalFilesAccess: true
            //             });
            //             conversion({ html: htmlString }, (err, result) => {
            //                 if (err) return console.error(err);
            //                 result.stream.pipe(fs.createWriteStream('./resume.pdf'));
            //                 conversion.kill(); 
            //             });
            //         });

            //     });
        })

})