//require the schema here
var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');

//create an array to store new data based on imported schema

var products = [
    
    //creating a new product
    new Product({
    imagePath: 'http://2.bp.blogspot.com/-CEuaUzSjQNc/U9aW9n5xngI/AAAAAAAACmc/mh-994sOx08/s1600/The+C+++Programming+Language+4th+Edition+By+Bjarne+Stroustrup+Pdf+Download.jpg',
    title: 'C++ Bjarne Stroustroup',
    description: 'New C++11 Standard Master Class',
    price: 10
  }) ,

new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41CFs9dkaCL.jpg',
    title: 'C++ in a Nutshell',
    description: 'This book introduces standard C++* and the key programming and design techniques supported by C++. Standard C++ is a far more powerful and polished language than the version of C++ introduced by the first edition of this book. ',
    price: 20
  }),

    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41jXKNG%2BCZL.jpg',
        title: 'C++ Primer Plus',
        description: 'You will cover the latest and most useful language enhancements, the Standard Template Library and ways to streamline object-oriented programming with C++.',
        price: 25
  }),

    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91Ln8mm52fL.jpg',
        title: 'Thinking in C++: Introduction to Standard C++, Volume One',
        description: '"This book is a tremendous achievement. You owe it to yourself to have a copy on your shelf. The chapter on iostreams is the most comprehensive and understandable treatment of that subject I\'ve seen to date." ― Al Stevens Contributing Editor, Doctor Dobbs Journal',
        price: 30
  }),
  
  new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51j4ugAKqBL.jpg',
    title: 'Effective Modern C++',
    description: 'Coming to grips with C 11 and C 14 is more than a matter of familiarizing yourself with the features they introduce e.g. auto type declarations move semantics lambda expressions and concurrency support . ',
    price: 17
}),

new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/31ENaunM9kL.jpg',
    title: 'Modern C++ Design: Generic Programming and Design Patterns Applied',
    description: 'In Modern C++ Design, Andrei Alexandrescu opens new vistas for C++ programmers. Displaying extraordinary creativity and programming virtuosity, Alexandrescu offers a cutting-edge approach to design that unites design patterns, generic programming and C++, enabling programmers to achieve expressive, flexible and highly reusable code.',
    price: 27
})

];


var done =0;
for(var i=0; i<products.length; i++ ) {
    
    //saving the documents to db via mongoose's save function
    products[i].save( (err, result) => {
        done++;
        if(done===products.length) {
            exit();
        }
    });
}

function exit() {
    //this is necessary to avoid async nature else it will be called before all the products are seeded.
    mongoose.disconnect();
}
