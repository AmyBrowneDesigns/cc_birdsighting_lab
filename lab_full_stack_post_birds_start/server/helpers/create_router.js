const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();
//read
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
//show
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //create route for create and step 2 : front end and connect via sightingsserve.
  router.post('/', (req, res)=>{
    const newData = req.body;
    collection
    .insertOne(newData)
    .then((result) =>{
      res.json(result.ops[0])
    })
    .catch(err =>{
      res.status(500);
      res.json({ status: 500, error: err});
    });
  });
//delete
  router.delete('/:id', (req, res)=>{
    collection
    .deleteOne({_id:ObjectID(req.params.id)})
    .then(result => {
      res.json(result)
    })
    .catch(err =>{
      res.status(500);
      res.json({ status: 500, error: err})
    })
  });
//to delete create route - create router, write method for it-sightingservice, sightings.vue, amend
  return router;
};

module.exports = createRouter;
