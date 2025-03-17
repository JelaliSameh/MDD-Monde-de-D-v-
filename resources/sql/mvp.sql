use mvp;
-- Vérifier si la table COMMENT existe, si oui, effacer tout son contenu
DROP TABLE IF EXISTS COMMENT;

-- Créer la table COMMENT
CREATE TABLE COMMENT (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(id),
    FOREIGN KEY (post_id) REFERENCES POST(id)
);
-- Vérifier si la table POST existe, si oui, effacer tout son contenu
DROP TABLE IF EXISTS POST;

-- Créer la table POST
CREATE TABLE POST (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USER(id),
    FOREIGN KEY (topic_id) REFERENCES TOPIC(id)
); 
-- Vérifier si la table SUBSCRIPTIONS existe, si oui, effacer tout son contenu
DROP TABLE IF EXISTS SUBSCRIPTIONS;

-- Créer la table SUBSCRIPTIONS
CREATE TABLE SUBSCRIPTIONS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    subscribed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USER(id),
    FOREIGN KEY (topic_id) REFERENCES TOPIC(id)
);
-- Vérifier si la table TOPIC existe, si oui, effacer tout son contenu
DROP TABLE IF EXISTS TOPIC;

CREATE TABLE TOPIC (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

-- Repeupler la table TOPIC
INSERT INTO TOPIC (name, description)
VALUES 
('Java', 'Discussion sur le langage de programmation Java et ses frameworks'),
('Full-Stack JavaScript', 'Discussion sur le développement Full-Stack JavaScript, y compris Node.js, Express, React, et Vue.js'),
('Python', 'Sujet dédié au langage de programmation Python et à son écosystème'),
('Web Development', 'Tout sur le développement web, HTML, CSS, JavaScript et plus'),
('DevOps', 'Pratiques de DevOps, CI/CD, Docker, Kubernetes et autres technologies'),
('Machine Learning', 'Discussion sur l''apprentissage automatique, les bibliothèques Python, les algorithmes et plus'),
('Open Source Databases', 'Discussion sur les bases de données open source, y compris MySQL, PostgreSQL, MongoDB et plus');
-- Vérifier si la table USER existe, si oui, effacer tout son contenu
DROP TABLE IF EXISTS USER;

-- Créer la table USER
CREATE TABLE USER (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- Vérifier si la table COMMENT existe, si oui, effacer tout son contenu

DROP TABLE IF EXISTS COMMENT;
DROP TABLE IF EXISTS POST;
DROP TABLE IF EXISTS SUBSCRIPTIONS;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS TOPIC;

