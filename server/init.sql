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

DROP TABLE IF EXISTS entries
CREATE TABLE IF NOT EXISTS entries (
    id UUID,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(25) NOT NULL,
    description TEXT,
    is_income BOOLEAN NOT NULL DEFAULT FALSE,
    amount money NOT NULL,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE, 
    created_on TIMESTAMPTZ NOT NULL,
    updated_on TIMESTAMPTZ NOT NULL,
    PRIMARY KEY(id, user_id)
)