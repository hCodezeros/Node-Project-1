// ******without using pug******

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// const PORT = 3030;
// const HOST = 'localhost';

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use('/login', express.static(__dirname + '/public'));

// app.get('/', function (req, res) {
//   res.send('Hitesh Node tutorial')
// })

// app.post('/login', (req, res) => {
//   console.log(req.body);
//   res.redirect('/');
// })

// app.listen(PORT, () => {
//   console.log(`Server is running at http://${HOST}:${PORT}`);
// });











// ******with using pug******//

// const express = require('express');
// const app = express();
// const path = require('path');

// const PORT = 3030;
// const HOST = 'localhost';

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.get('/', function (req, res) {
//   res.render("index")
// })

// app.post('/login', (req, res) => {
//   console.log(req.body);
//   res.redirect('/');
// })

// app.listen(PORT, () => {
//   console.log(`Server is running at http://${HOST}:${PORT}`);
// });






//********with using ejs ************/
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');

const PORT = 3030;
const HOST = 'localhost';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/publicMulter/myUpload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
}).single('myimage')

//set up for ejs
app.set('view engine', 'ejs');
//static folder
app.use(express.static('./publicMulter'))

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/', function (req, res) {
    res.send('Hitesh Node tutorial')
})

//Desc 
app.post('/upload', (req, res) => {
    upload(req, res, error => {
        console.log(req.file);
        if (error) {
            res.render('index', {
                message: error
            })
        } else {
            res.render("index",{
                message: 'successfully uploaded....',
                filename:`myUpload/${req.file.filename}`
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});

