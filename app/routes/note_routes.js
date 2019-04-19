var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // @ GET note with ID
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.db().collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(item);
            }
        })

    })

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.db().collection('notes').findOne(details, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        })
    })

    // @ PUT
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        const note = { body: req.body.body, title: req.body.title };

        db.db().collection('notes').update(details, note, (err, item) => {
            if(err){
                res.send({ 'error': 'An error has occured' });
                console.log(err);
            } else {
                res.send(item);
            }
        })

    })

    // @POST note with ID
    app.post('/notes', (req, res) => {
        // Create note here
        const note = { body: req.body.body, title: req.body.title };
        db.db().collection('notes').insert(note, (err, result) => {
            if(err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
                console.log(result);
            }
        })

    })
}