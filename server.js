'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose=require("mongoose");
const PORT =  3001;

mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true, useUnifiedTopology: true});


const bookSchema=new mongoose.Schema({
title:String,
description:String,
status:String
})

const bookModel=mongoose.model('Book',bookSchema);

async function seedData(){

  const firstBook= new bookModel({
    title:"two hearts",
    description:"about 2 birds feeling in love with each other",
    status:"In progress"


  })
  const secondBook=new bookModel({
    title:"Good To Great",
    description:"After a five-year research project, Jim Collins concludes that good to great can and does happen. In this book, he uncovers the underlying variables that enable any type of organisation to make the leap from good to great while other organisations remain only good. Rigorously supported by evidence, his findings are surprising - at times even shocking - to the modern mind.",
    status:"avalible"

    
  })
  const thirdBook=new bookModel({
    title:"Zero to One",
    description:"doing what we already know how to do takes the world from 1 to n, adding more of something familiar. Every new creation goes from 0 to 1. This book is about how to get there.",
    status:"avalible"

    
  })

await firstBook.save();
await secondBook.save();
await thirdBook.save();

}

 seedData();






// http://localhost:3001/books
app.get('/books',booksHandler);
app.get('/test', (request, response) => {

  response.send('test request received')

})

function booksHandler(req,res){
  bookModel.find({},(err,result)=>{
      if(err)
      {
          console.log(err);

      }
      else
     {
      console.log(result);
      res.send(result);
     }
  })
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
