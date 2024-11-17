DROP TABLE strat;

CREATE TABLE strat (
    s_id INTEGER PRIMARY KEY AUTOINCREMENT,
    s_name STRING NOT NULL,
    map INTEGER,
    p1 STRING,
    p2 STRING,
    p3 STRING,
    p4 STRING,
    p5 STRING,
    FOREIGN KEY (map) REFERENCES map(m_id)
);

DROP TABLE map;

CREATE TABLE map (
    m_id INTEGER PRIMARY KEY AUTOINCREMENT,
    m_name
);

INSERT INTO map(m_name)
VALUES ('Anubis'),
       ('Ancient'),
       ('Dust'),
       ('Inferno'),
       ('Mirage'),
       ('Nuke'),
       ('Vertigo');

INSERT INTO strat (s_name, map, p1, p2, p3, p4, p5)
VALUES ('Strat One', 1, 'p1', 'p2', 'p3', 'p4', 'p5'),
       ('Strat Two', 2, 'p1', 'p2', 'p3', 'p4', 'p5');