SELECT p.title, p.image, p.description, u.username, u.profile_img
FROM posts p
JOIN users u ON p.userid = u.userid
WHERE p.postid = $1;