const axios = require('axios');

axios.get('http://localhost:3000/api/courses/1')
.then(res => {
    console.log(`Data: ${res.data.name}`)
})