const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const app = express();
const parser = require('./client/src/parser.js')
app.use(express.static(path.join(__dirname, 'client/build')));
let axios = require('axios');
let cheerio = require('cheerio');
let base_url_programs = 'https://kurser.lth.se/lot/?val=program'
let base_url_courses = [
  'https://kurser.lth.se/lot/?lasar=',
  '&sort1=lp&sort2=slut_lp&sort3=namn&prog=',
  '&forenk=t&val=program&soek=t'
]
let base_url_selected_course= [
  'https://kurser.lth.se/kursplaner/',
]
let specialisation = 'https://kurser.lth.se/lot/?val=kurs&kurskod='

app.get('/api/programs', (req, res) => {
  let programs = [];
  axios.get(base_url_programs).then( (response) => {
  let $ = cheerio.load(response.data);

  $('label').each( (i, elm) => {
    if(i>=15 && i <= 56){
      programs.push( {
        name: $(elm).text(),
      });
    }
  })
  return(programs);
  })
  .then ( (programs) => {
  res.json(programs);
  return(programs)
  });
});

app.get('/api/courses/:id/:year', (req, res) => {

  let years = req.params.year.substring(2,4)+ '_' + (req.params.year.substring(2,3) === 0 ? '0' : '')+ (parseInt(req.params.year.substring(2,4))+1);

  let full_url = base_url_courses[0]+years+base_url_courses[1] + req.params.id + base_url_courses[2]

  axios.get(full_url).then( (response) => {

  let $ = cheerio.load(response.data);
  let courses = [];


  $('td a').each( (i, elm) => {
    if(elm.children[0].data.length === 6 && courses.filter(e=>e.code === $(elm).text()).length === 0){
      courses.push( {
        code: $(elm).text(),
      });
    }
  })
  return(courses);
  })
  .then ( (courses) => {
  res.json(courses)
  return courses
  });
});

app.get('/api/specialisations/:id/:year', (req, res) => {

  let years = req.params.year.substring(2,4)+ '_' + (req.params.year.substring(2,3) === 0 ? '0' : '')+ (parseInt(req.params.year.substring(2,4))+1);

  let full_url = base_url_courses[0]+years+base_url_courses[1] + req.params.id + base_url_courses[2]

  axios.get(full_url).then( (response) => {

  let $ = cheerio.load(response.data);
  let specialisations = [];

  $('h3').each( (i, elm) => {
    if($(elm).text().startsWith("Specialisering")){
      specialisations.push( {
        title: $(elm).text().substring($(elm).text().indexOf('-')+2, $(elm).text().length),
        courses: [],
      });
    }
  })
  return(specialisations);
  })
  .then ( (specialisations) => {
  res.json(specialisations)
  return specialisations
  });
});


app.get('/api/getspecialisations/:coursecode', (req, res) => {

  let courseCode = req.params.coursecode



  axios.get(specialisation+courseCode).then( (response) => {

  let $ = cheerio.load(response.data);
  let specialisations = [];

  $('td .pdf-noprint').each( (i, elm) => {

    if(! $(elm).text().startsWith("Föreläsningar") && specialisations.indexOf($(elm).text()) === -1){
      console.log("pushing", $(elm).text(), specialisations.indexOf($(elm).text()));
      specialisations.push($(elm).text());
    }


  })
  return(specialisations);
  })
  .then ( (specialisations) => {
  res.json(specialisations)
  return specialisations
  });

});


app.get('/api/courseInfo/:id/:year', (req, res) => {

  let years = req.params.year.substring(2,4)+ '_' + (req.params.year.substring(2,3) === 0 ? '0' : '')+ (parseInt(req.params.year.substring(2,4))+1);

  let full_url = base_url_selected_course[0]+years+'/'+ req.params.id


  axios.get(full_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let information = {
    title: '',
    points: '',
    scale: '',
  };

  $('h1').each( (i, elm) => {
    information.title= elm.children[0].data
  })
  $('h2').each( (i, elm) => {
    if(i === 0){
      let points = $(elm).text().substring(8)

      points = points.substring(0, points.indexOf(' ')+1).replace(',', '.')
      information.points= parseFloat(points)

    }
  })
  $('p').each( (i, elm) => {
    if($(elm).text().startsWith('Betygsskala'))
    {
      information.scale= $(elm).text().substring(13, 15)

    }
  })
  return(information);
  })
  .then ( (information) => {
  res.json(information)
  return information
  });
});




app.get('/api/years', (req, res) => {
  let years = [];
  axios.get(base_url_programs).then( (response) => {
  let $ = cheerio.load(response.data);

  $('option').each( (i, elm) => {

      years.push($(elm).text().substring(0,4));

  })

  return(years);
  })
  .then ( (years) => {
  res.json(years);
  return(years)
  });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);
