-- User Table --

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- Predefined Chores Table --

CREATE TABLE predefined_chores (
    predefined_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    chore_name VARCHAR(255) NOT NULL,
    user_id uuid,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Selected Chores Table --

CREATE TABLE selected_chores (
    selected_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_id uuid NOT NULL,
    chore_value INT NOT NULL,
    predefined_id uuid NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_completed TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (predefined_id) REFERENCES predefined_chores (predefined_id)
);

-- Wishes Table --

CREATE TABLE wishes (
    wish_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    wish_name VARCHAR(255) NOT NULL,
    wish_value INT NOT NULL,
    user_id uuid,
    completed BOOLEAN DEFAULT FALSE,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Shopping Cart Table --

CREATE TABLE shopping_cart (
    item_id uuid PRIMARY KEY DEFAULT -- possible change to item_it --
    uuid_generate_v4(),
    item_quantity INT NOT NULL DEFAULT 1,
    user_id uuid NOT NULL,
    wish_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (wish_id) REFERENCES wishes (wish_id)
);

-- Wallet Table --

CREATE TABLE wallet (
  wallet_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  user_id uuid NOT NULL,
  balance INT,
  ADD CONSTRAINT wallet_user_id_key UNIQUE (user_id)
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

