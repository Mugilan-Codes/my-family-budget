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

-- One Super Admin is enough
-- Insert one Super Admin while creating table admins
-- Give option to create new admins, but not necessary
DROP TABLE IF EXISTS admins
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(30) UNIQUE,
    created_on TIMESTAMPTZ NOT NULL,
    updated_on TIMESTAMPTZ NOT NULL
)