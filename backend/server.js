const app = require("./app")
const mongoose= require("mongoose")
const dotenv = require("dotenv")


dotenv.config({ path: "./.env" })
mongoose.connect(process.env.MONGOURL)
    .then(() => { console.log("connected"); })
    .catch((error) => {
        console.log(error)
    })

app.listen(3001, () => {
    console.log('example app listening on port 3001')
})