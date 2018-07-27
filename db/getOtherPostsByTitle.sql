SELECT *
FROM posts p
JOIN users u ON p.userID = u.userID
WHERE u.userid != $1
AND LOWER(p.title) = LOWER($2);