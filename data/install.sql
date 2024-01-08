CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at timestamptz
);

CREATE TABLE wallpapers (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    img_description TEXT,
    img_size VARCHAR(255),
    img_url TEXT,
    llm_name VARCHAR(100),
    llm_params JSON,
    created_at timestamptz
);