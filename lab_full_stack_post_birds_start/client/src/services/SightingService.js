const baseURL = 'http://localhost:3000/api/sightings/'

export default {
  getSightings(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postSighting(payload){//step after create router for post.next step front end connection.on sightings form.js
    return fetch(baseURL,{
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
  },
  deleteSighting(id) {
    return fetch(baseURL + id, {
      method: "DELETE"
    })
  }
}//then go to sighting.vue to finish
