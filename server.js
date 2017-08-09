const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeappdatabase');
const Schema = mongoose.Schema;

//new user Schema
const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

//Mongoose schema method
userSchema.methods.manify = function() {
    this.name = this.name + '-boy';

    return this.name;
};

//pre-save method
userSchema.pre('save', function(next) {
    //pobranie aktualnego czasu
    const currentDate = new Date();

    //zmiana pola na aktualny czas
    this.updated_at = currentDate;

    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

//model based on userSchema
const User = mongoose.model('User', userSchema);

//instancje klasy User
const kenny = new User({
    name: 'Kenny',
    username: 'Kenny_the_boy',
    password: 'password'
});

kenny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

kenny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + kenny.name +  ' zapisany pomyslnie');
});

const benny = new User({
    name: 'Benny',
    username: 'Benny_the_boy',
    password: 'password'
});

benny.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

benny.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + benny.name +  ' zapisany pomyslnie');
});

const mark = new User({
    name: 'Mark',
    username: 'Mark_the_boy',
    password: 'password'
});

mark.manify(function(err, name) {
    if (err) throw err;
    console.log('Twoje nowe imię to: ' + name);
});

mark.save(function(err) {
    if (err) throw err;

    console.log('Uzytkownik ' + mark.name +  ' zapisany pomyslnie');
});

//find all users
// User.find({}, function(err, res) {
//     if (err) throw err;
//     console.log('Actual database records are ' + res);
// });


// const query = User.find({});
// const promise = query.exec();
// promise.then(function(records) {
//     console.log('Actual database records are ' + records);
// });
// promise.catch(function(reason) {
//     console.log('Something went wrong: ', reason);
// });


//find specific record
// User.find({ username: 'Kenny_the_boy' }, function(err, res) {
//     if (err) throw err;
//     console.log('Record you are looking for is ' + res);
// });

// const query2 = User.find({username: 'Kenny_the_boy' });
// const promise2 = query2.exec();
// promise2.then(function(records2) {
//     //record2 instanceof User;

//     console.log(records2 instanceof Object);
//     Object.setPrototypeOf(records2, User);
//     console.log(records2 instanceof User);
//     console.log('Record you are looking for is' + records2."name");
    
// });
// promise2.catch(function(reason) {
//     console.log('Something went wrong: ', reason);
// });

User.find({ username: 'Kenny_the_boy' }, function(err, user) {
    if (err) throw err;
    console.log( user instanceof Object);
    console.log('Old password is ' + user);
    console.log('New password is ' + user.name);

    // this.save(function(err) {
    //     if (err) throw err;

    //     console.log('Uzytkownik ' + this.name + ' zostal pomyslnie zaktualizowany');
    // })
});

// User.findOneAndUpdate({ username: 'Benny_the_boy' }, { username: 'Benny_the_man' }, function(err, user) {
//     if (err) throw err;

//  //   console.log('Nazwa uzytkownika po aktualizacji to ' + user.username);
// });

// User.findOneAndRemove({ username: 'Benny_the_boy' }, function(err) {
//     if (err) throw err;

//     console.log('User deleted!');
// });

// User.findOneAndRemove({ username: 'Mark_the_boy' }, function(err) {
//     if (err) throw err;

//     console.log('User deleted!');
// });

// User.findOneAndRemove({ username: 'Kenny_the_boy' }, function(err) {
//     if (err) throw err;
// // 
//     console.log('User deleted!');
// });
