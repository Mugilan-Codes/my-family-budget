DROP TABLE IF EXISTS users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(30) UNIQUE,
    created_on TIMESTAMPTZ NOT NULL,
    updated_on TIMESTAMPTZ NOT NULL
)

CREATE TABLE IF NOT EXISTS entries (
    id UUID DEFAULT gen_random_uuid(),
    user_id REFERENCES users(id) CASCADE DELETE,
    category VARCHAR(25) NOT NULL,
    description TEXT,
    type VARCHAR(10) CHECK(type IN('+', '-')) NOT NULL,
    amount money NOT NULL,
    entry_date DATE NOT NULL, 
    created_on TIMESTAMPTZ NOT NULL,
    updated_on TIMESTAMPTZ NOT NULL,
    PRIMARY KEY(id, user_id)
)