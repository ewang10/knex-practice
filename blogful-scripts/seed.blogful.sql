INSERT INTO blogful_articles 
    (title, content, date_published)
VALUES 
    ('title1', 'content1', '2016-01-16 12:00:00'),
    ('title2', 'content2', '2016-05-01 15:00:00'),
    ('title3', 'content3', '2017-02-22 12:00:00'),
    ('title4', 'content4', '2017-04-04 08:00:00'),
    ('title5', 'content5', '2017-04-23 15:00:00'),
    ('title6', 'content6', '2017-08-11 13:00:00'),
    ('title7', 'content7', '2017-12-09 17:00:00'),
    ('title8', 'content8', '2018-01-24 19:00:00'),
    ('title9', 'content9', '2018-01-29 11:00:00'),
    ('title10', 'content10', '2018-02-13 05:00:00'),
    ('title11', 'content11', now() - '29 days'::INTERVAL),
    ('title12', 'content12', now() - '29 days'::INTERVAL),
    ('title13', 'content13', now() - '28 days'::INTERVAL),
    ('title14', 'content14', now() - '28 days'::INTERVAL),
    ('title15', 'content15', now() - '27 days'::INTERVAL),
    ('title16', 'content16', now() - '27 days'::INTERVAL),
    ('title17', 'content17', now() - '26 days'::INTERVAL),
    ('title18', 'content18', now() - '26 days'::INTERVAL),
    ('title19', 'content19', now() - '25 days'::INTERVAL),
    ('title20', 'content20', now() - '25 days'::INTERVAL);