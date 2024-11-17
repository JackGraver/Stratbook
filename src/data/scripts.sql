DROP TABLE strat;
CREATE TABLE strat (
    s_id INTEGER PRIMARY KEY AUTOINCREMENT,
    s_name STRING NOT NULL,
    map INTEGER,
    p1 INTEGER,
    p1_role STRING,
    p2 INTEGER,
    p2_role STRING,
    p3 INTEGER,
    p3_role STRING,
    p4 INTEGER,
    p4_role STRING,
    p5 INTEGER,
    p5_role STRING,
    FOREIGN KEY (map) REFERENCES map(m_id),
    FOREIGN KEY (p1) REFERENCES player(p_id),
    FOREIGN KEY (p2) REFERENCES player(p_id),
    FOREIGN KEY (p3) REFERENCES player(p_id),
    FOREIGN KEY (p4) REFERENCES player(p_id),
    FOREIGN KEY (p5) REFERENCES player(p_id)
);

DROP TABLE map;
CREATE TABLE map (
    m_id INTEGER PRIMARY KEY AUTOINCREMENT,
    m_name
);

DROP TABLE player;
CREATE TABLE player (
    p_id INTEGER PRIMARY KEY AUTOINCREMENT,
    p_name text NOT NULL
);

INSERT INTO player (p_name) 
VALUES ('Aj'),
       ('Jack'),
       ('Johan'),
       ('Ross'),
       ('Trent');

INSERT INTO map(m_name)
VALUES ('Anubis'),
       ('Ancient'),
       ('Dust'),
       ('Inferno'),
       ('Mirage'),
       ('Nuke'),
       ('Vertigo');

INSERT INTO strat (s_name, map, p1, p1_role, p2, p2_role, p3, p3_role, p4, p4_role, p5, p5_role)
VALUES ('Strat One', 1, 1, 'p1', 2, 'p2', 3, 'p3', 4, 'p4', 5, 'p5'),
       ('Strat Two', 2, 1, 'p1', 2, 'p2', 3, 'p3', 4, 'p4', 5, 'p5');