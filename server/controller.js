module.exports = {
  addUser: (req, res) => {
    const db = req.app.get("db");

    const { username, password } = req.body;
    const profileImg = `https://robohash.org/${username}`;

    db.users
      .insert({
        username,
        password,
        profileImg
      })
      .then(
        db.users
          .where("username=$1 AND password=$2", [username, password])
          .then(user => {
            req.session.userid = user[0].userid;
            res.status(200).send(user[0]);
          })
      );
  },

  getUser: (req, res) => {
    const db = req.app.get("db");

    const { username, password } = req.body;

    db.users
      .where("username=$1 AND password=$2", [username, password])
      .then(user => {
        req.session.userid = user[0].userid;
        res.status(200).send(user[0]);
      });
  },

  getPosts: (req, res) => {
    const db = req.app.get("db");

    let { userID, userposts } = req.params;
    let { search } = req.query;

    if (userposts == "true" && search) {
      console.log("1");
      db.getPostsByTitle([search]).then(posts => {
        res.status(200).send(posts);
      });
    } else if (userposts == "false" && search == "") {
      console.log("2");
      db.getOtherUsersPosts([userID]).then(posts =>
        res.status(200).send(posts)
      );
    } else if (userposts == "false" && search) {
      console.log("3");
      db.getOtherPostsByTitle([userID, search]).then(posts =>
        res.status(200).send(posts)
      );
    } else if (userposts == "true" && search == "") {
      console.log("4");
      db.getAllPosts().then(posts => res.status(200).send(posts));
    }
  },

  getSinglePost: (req, res) => {
    const db = req.app.get("db");

    const { postID } = req.params;

    db.getSinglePost([postID]).then(post => {
      res.status(200).send(post);
    });
  },

  submitPost: (req, res) => {
    const db = req.app.get("db");

    const { userID } = req.params;
    const { title, imageUrl, content } = req.body;

    db.posts
      .insert({
        title,
        userid: userID,
        image: imageUrl,
        description: content
      })
      .then(() => res.sendStatus(200));
  }
};
