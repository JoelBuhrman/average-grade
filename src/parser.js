let axios = require('axios');
let cheerio = require('cheerio');

//let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';
let base_url_programs = 'https://kurser.lth.se/lot/?val=program'
let base_url_courses = [
  'https://kurser.lth.se/lot/?lasar=17_18',
  '&sort1=lp&sort2=slut_lp&sort3=namn&prog=',
  '&forenk=t&val=program&soek=t&lang=sv'
]
let base_url_selected_course= [
  'https://kurser.lth.se/kursplaner/17_18/',
]

const getPrograms = function(addPrograms){
  axios.get(base_url_programs).then( (response) => {
  let $ = cheerio.load(response.data);
  let programs = [];
  /*$('tr', '.text-right').each( (i, elm) => {
    programs.push( {
      currency: $(elm).children().first().text(),
      erate: {
        sell: $(elm).children().eq(1).first().text(),
        buy: $(elm).children().eq(2).first().text()
      },
      tt: {
        sell: $(elm).children().eq(3).first().text(),
        buy: $(elm).children().eq(4).first().text()
      },
      notes: {
        sell: $(elm).children().eq(5).first().text(),
        buy: $(elm).children().eq(6).first().text()
      }
    });
  });*/

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
  addPrograms(programs)
  return programs
  });
}

const getCourses = function(program, getCourses){
  let full_url = base_url_courses[0]+base_url_courses[1] + program + base_url_courses[2]
  axios.get(full_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let courses = [];
  /*$('tr', '.text-right').each( (i, elm) => {
    programs.push( {
      currency: $(elm).children().first().text(),
      erate: {
        sell: $(elm).children().eq(1).first().text(),
        buy: $(elm).children().eq(2).first().text()
      },
      tt: {
        sell: $(elm).children().eq(3).first().text(),
        buy: $(elm).children().eq(4).first().text()
      },
      notes: {
        sell: $(elm).children().eq(5).first().text(),
        buy: $(elm).children().eq(6).first().text()
      }
    });
  });*/

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
  getCourses(courses)
  return courses
  });
}

const getInfoOnCourse = function(course, setCourseInfo){
  let full_url = base_url_selected_course[0]+ course
  axios.get(full_url).then( (response) => {
  let $ = cheerio.load(response.data);
  let information = {};

  $('h1').each( (i, elm) => {
    information= {
      ...information,
      title: elm.children[0].data
    }
  })
  $('h2').each( (i, elm) => {
    if(i === 0){
      let points = $(elm).text().substring(8)

      points = points.substring(0, points.indexOf(' ')+1).replace(',', '.')
      information={
        ...information,
        points: parseFloat(points),
      }
    }
  })
  $('p').each( (i, elm) => {
    if($(elm).text().startsWith('Betygsskala'))
    {
      information={
        ...information,
        scale: $(elm).text().substring(13, 15)
      }
    }
  })
  return(information);
  })
  .then ( (information) => {
  setCourseInfo(information)
  return information
  });
}


export{
  getPrograms,
  getCourses,
  getInfoOnCourse,
}
