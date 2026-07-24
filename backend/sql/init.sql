CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    project TEXT NOT NULL,
    priority TEXT NOT NULL,
    due_date DATE,
    completed NOT NULL BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


    -- description TEXT NOT NULL,
    -- estimated_minutes INTEGER,
    -- completed_at TIMESTAMP,
    -- updated_at TIMESTAMP,
    -- user_id INTEGER,
    -- project_id INTEGER

)