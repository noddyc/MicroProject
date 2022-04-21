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

let json_data = JSON.stringify({"users":users_data}, null, 2);
fs.writeFileSync('services/users/db.json', json_data);

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

json_data = JSON.stringify({"threads":threads_data}, null, 2);
fs.writeFileSync('services/threads/db.json', json_data);

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

json_data = JSON.stringify({"posts":posts_data}, null, 2);
fs.writeFileSync('services/posts/db.json', json_data);

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

json_data = JSON.stringify({"comments":comments_data}, null, 2);
fs.writeFileSync('services/comments/db.json', json_data); 