module.exports = app => {
    const users = app.models.users;
    app.route('/xper/users')
        .get((req, res) => {
            console.log('getUsers');
            users.getUsers((jsonRes) => {
                res.json(jsonRes)
            })
        })
        .post((req, res) => {
            console.log("postUsers");
            users.postUsers(req, (jsonRes) => {
                res.json(jsonRes)
            })
        });

    app.route("/xper/users/:userName")
        .get((req, res) => {
            console.log("getUser: "+req.params.userName);
            users.getUser(req.params.userName, (jsonRes) => {
                res.json(jsonRes)
            })
        })
        .put((req, res) => {
            console.log("putUser: "+req.params.userName + " -> "+req.body.userName);
            users.putUser(req, (jsonRes) => {
                res.json(jsonRes)
            })
        }) 
        .delete((req, res) => {
            console.log("deleteUser: "+req.params.userName);
            users.deleteUser(req, (jsonRes) => {
                res.json(jsonRes)
            })
        });   
}
