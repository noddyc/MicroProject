const fs = require('fs');

let i = process.argv[2]

var users_data = [];
var n = 0; 
for (n; n < i; n++) {
    var obj = {
        id: n,
        username: "username_" + n,
        name: "name_" + n,
        bio: "bio_" + n
    }
    users_data.push(obj);
}

var threads_data = [];
var n = 0; 
for (n; n < i; n++) {
    var obj = {
        id: n,
        title: "title_" + n,
        createdBy: "createdBy_" + n
    }
    threads_data.push(obj);
}

var posts_data = [];
var n = 0; 
for (n; n < i; n++) {
    var obj = {
        id: n,
        thread: "thread_" + n,
        text: "text_" + n,
        user: "user_" + n
    }
    posts_data.push(obj);
}

var comments_data = [];
var n = 0; 
for (n; n < i; n++) {
    var obj = {
        post: n,
        text: "text_" + n,
        user: "user_" + n
    }
    comments_data.push(obj);
}

let mono_data = {"users": users_data, "threads": threads_data, "posts": posts_data, "comments": comments_data}

json_data = JSON.stringify(mono_data, null, 2);
fs.writeFileSync('db.json', json_data);