const axios = require('axios');

export const getCurrentDateTime = async () => {
   let response;
   await axios.get('http://worldclockapi.com/api/json/utc/now')
      .then(res => {
         response = res;
      })
      .catch(error => {
         response = error;
      })

   if (
      response
      && response.status
      && response.status === 200
      && response.data
      && response.data) {
      return response.data;
   } else {
      return 'Failed to get date time data.'
   }
}