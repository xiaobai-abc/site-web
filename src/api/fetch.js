 
 
const URL = process.env.API_URL;

 

function handler(resp) {
  if (resp && resp.code == 200) {
    return resp.data;
  }
  return Promise.reject(resp?.message);
}

function Myfetch(apiUrl = "/", ...props) {
  return fetch(URL + apiUrl, ...props)
    .then((res) => res.json())
    .then(handler);
}

module.exports = Myfetch;
