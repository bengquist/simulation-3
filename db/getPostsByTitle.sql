SELECT *
FROM posts p
JOIN users u ON p.userid = u.userid
WHERE LOWER(p.title) = LOWER($1);