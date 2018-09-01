import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const dbUrl = "mongodb://localhost";
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});

const valiDate = (data) => {

    let errors = {};
    if (data.title === '') {
        errors.title = 'Can\'t be empty.';
    }
    if (data.url === '') {
        errors.url = 'Can\'t be empty.';
    }

    const isValid = Object.keys(errors).length === 0
    return {
        isValid,
        errors
    }
}

mongodb.MongoClient.connect(dbUrl, {
    useNewUrlParser: true
}, (err, cilent) => {
    if (err) {
        throw err;
    }
    const db = cilent.db('crud');
    app.get('/api/games', (request, response) => {
        db.collection('games').find({}).toArray((err, games) => {
            response.json({
                games
            });
        })
    })
    app.get('/api/games/:_id', (req, res) => {
        db.collection('games').findOne({
            _id: new mongodb.ObjectId(req.params._id)
        }, (err, game) => {
            //这边没有做错误处理，如果该条数据没有的话该怎么办？
            res.json({
                game
            });
        })
    })
    app.delete('/api/games/:_id', (req, res) => {
        db.collection('games').deleteOne({
            _id: new mongodb.ObjectId(req.params._id)
        }, (err, game) => {
            if (err) {
                res.status(500).json({
                    errors: {
                        global: 'Something went wrong!'
                    }
                })
                throw err;
            }
            //这边没有做错误处理，如果该条数据没有的话该怎么办？
            res.json({
                game
            });
        })
    })
    app.put('/api/games/:_id', (req, res) => {
        const {
            errors,
            isValid
        } = valiDate(req.body)

        if (isValid) {
            var {
                title,
                url
            } = req.body
            db.collection('games').findOneAndUpdate({
                _id: new mongodb.ObjectId(req.params._id)
            }, {
                $set: {
                    title,
                    url
                }
            }, {
                returnOriginal: false
            }, (err, result) => {
                if (err) {
                    res.status(500).json({
                        errors: {
                            global: 'err!'
                        }
                    })
                    throw err;
                } else {
                    res.json({
                        game: result.value
                    })
                }
            })

        } else {
            res.status(400).json({
                errors
            });
        }
    })
    app.post('/api/games', (req, res) => {
        const {
            errors,
            isValid
        } = valiDate(req.body)
        if (isValid) {
            db.collection('games').insert(req.body, (err, result) => {
                if (err) {
                    res.status(500).json({
                        errors: {
                            global: 'Something went wrong!'
                        }
                    })
                    throw err;
                } else {
                    res.json({
                        game: result.ops[0]
                    })
                }
            })

        } else {
            res.status(400).json({
                errors
            });
        }

    })
    app.use((req, res) => {
        res.status(404).json({
            errors: {
                global: 'Still working on it.places try again later than when we implement it'
            }
        })
    })
    app.listen(8080, () => console.log('server is runing on localhost:8080'))
})