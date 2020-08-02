const request = require('request');

request.get('https://pokeapi.co/api/v2/pokemon/ditto', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  const { abilities } = JSON.parse(body);
  console.log(abilities[0].ability);
});

// request.get('https://pokeapi.co/api/v2/pokemon/ditto')
//         .on('response', (res) => {
//           console.log(res);
//         })

