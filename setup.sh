#!/bin/bash

# --- Configuration ---
BACKEND_REPO_URL="https://github.com/fxrdhan/darryl-merch-storeback.git"
STOREFRONT_REPO_URL="https://github.com/fxrdhan/darryl-merch-storefront.git"
BACKEND_DIR="darryl-merch-storeback"
STOREFRONT_DIR="darryl-merch-storefront"

# Database - You will be prompted for the password
DB_USER="fxrdhan"          # Default user from your snapshot
DB_NAME="medusa-darryl-merch" # Default DB name from your snapshot
DB_HOST="localhost"
DB_PORT="5432"

# Ports
BACKEND_PORT="9000"
STOREFRONT_PORT="8000"

# Secrets (use strong, unique values in production)
JWT_SECRET="supersecret-$(openssl rand -hex 12)"
COOKIE_SECRET="supersecret-$(openssl rand -hex 12)"
REDIS_URL="redis://localhost:6379"

# Storefront specific
# Using the key from your storefront's .env.local snapshot.
# Assumes the seed script consistently generates or uses this key.
# If the key changes after seeding, you might need to fetch it dynamically.
STOREFRONT_PUBLISHABLE_KEY="pk_776dd93715915852bbc277b105cb6bc058b26fc83fbed288f90601ff8cc49d98"

# --- Colors ---
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- Prerequisite Definitions ---
ESSENTIAL_COMMANDS=("git" "node" "yarn" "psql" "openssl")
OPTIONAL_COMMANDS=("redis-cli") # Add more optional commands if needed

# --- Helper Functions ---
print_step() {
    echo -e "\n${BLUE}===> $1${NC}"
}

print_info() {
    echo -e "[INFO] $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

print_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Redis connection
check_redis_connection() {
    print_info "Checking Redis connection..."
    if command_exists redis-cli; then
        # Attempt to ping Redis server using the configured URL
        if redis-cli -u "$REDIS_URL" ping | grep -q PONG; then
            print_success "Redis server connection successful ($REDIS_URL)."
        else
            print_error "Failed to connect to Redis server at $REDIS_URL. Please ensure Redis is running and accessible."
            return 1 # Indicate failure
        fi
    else
        print_warning "'redis-cli' not found. Cannot verify Redis connection automatically. Please ensure Redis is running and accessible at $REDIS_URL."
    fi
    return 0 # Indicate success or inability to check
}

check_prerequisites() {
    print_step "Checking prerequisites..."
    local missing=0

    # Check essential commands
    print_info "Checking essential commands: ${ESSENTIAL_COMMANDS[*]}..."
    for cmd in "${ESSENTIAL_COMMANDS[@]}"; do
        if ! command_exists "$cmd"; then
            print_error "Essential command '$cmd' not found. Please install it."
            missing=1
        else
            print_info "Essential command '$cmd' found."
        fi
    done

    # Check optional commands
    print_info "Checking optional commands: ${OPTIONAL_COMMANDS[*]}..."
    for cmd in "${OPTIONAL_COMMANDS[@]}"; do
        if ! command_exists "$cmd"; then
            print_warning "Optional command '$cmd' not found. Some features might require manual steps (e.g., checking Redis)."
        else
            print_info "Optional command '$cmd' found."
        fi
    done

    if [ $missing -eq 1 ]; then
        print_error "Please install the missing essential prerequisites and run the script again."
        exit 1
    fi

    # Check Redis Connection
    if ! check_redis_connection; then
        exit 1 # Exit if Redis connection failed
    fi

    print_success "All essential prerequisites are met."
}

clone_repos() {
    print_step "Cloning repositories..."
    if [ -d "$BACKEND_DIR" ]; then
        print_warning "Backend directory '$BACKEND_DIR' already exists. Skipping clone."
    else
        print_info "Cloning backend repository..."
        git clone "$BACKEND_REPO_URL" "$BACKEND_DIR"
        if [ $? -ne 0 ]; then
            print_error "Failed to clone backend repository."
            exit 1
        fi
        print_success "Backend repository cloned."
    fi

    if [ -d "$STOREFRONT_DIR" ]; then
        print_warning "Storefront directory '$STOREFRONT_DIR' already exists. Skipping clone."
    else
        print_info "Cloning storefront repository..."
        git clone "$STOREFRONT_REPO_URL" "$STOREFRONT_DIR"
        if [ $? -ne 0 ]; then
            print_error "Failed to clone storefront repository."
            exit 1
        fi
        print_success "Storefront repository cloned."
    fi
}

setup_database() {
    print_step "Setting up PostgreSQL database..."
    read -s -p "Enter password for PostgreSQL superuser (e.g., 'postgres'): " PGPASSWORD
    export PGPASSWORD
    echo # newline after password input

    # Check if user exists
    print_info "Checking if database user '$DB_USER' exists..."
    user_exists=$(psql -U postgres -h "$DB_HOST" -p "$DB_PORT" -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'")

    if [ "$user_exists" != "1" ]; then
        print_info "User '$DB_USER' does not exist. Attempting to create..."
        read -s -p "Enter a password for the new database user '$DB_USER': " DB_PASSWORD
        echo # newline
        psql -U postgres -h "$DB_HOST" -p "$DB_PORT" -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
        if [ $? -ne 0 ]; then
            print_warning "Could not create user '$DB_USER'. It might already exist or require different privileges. Please ensure the user exists with login rights."
        else
            print_success "Database user '$DB_USER' created."
        fi
        export USER_DB_PASSWORD="$DB_PASSWORD" # Store user password for connection string
    else
        print_info "User '$DB_USER' already exists."
        if [ -z "$USER_DB_PASSWORD" ]; then
             read -s -p "Enter password for existing database user '$DB_USER': " DB_PASSWORD
             echo # newline
             export USER_DB_PASSWORD="$DB_PASSWORD"
        fi
    fi

    # Check if database exists
    print_info "Checking if database '$DB_NAME' exists..."
    db_exists=$(psql -U postgres -h "$DB_HOST" -p "$DB_PORT" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME")

    if ! $db_exists; then
        print_info "Database '$DB_NAME' does not exist. Attempting to create..."
        psql -U postgres -h "$DB_HOST" -p "$DB_PORT" -c "CREATE DATABASE \"$DB_NAME\" OWNER $DB_USER;"
        if [ $? -ne 0 ]; then
            print_error "Failed to create database '$DB_NAME'. Please check permissions or create it manually."
            unset PGPASSWORD
            exit 1
        else
            print_success "Database '$DB_NAME' created."
        fi
    else
        print_info "Database '$DB_NAME' already exists."
    fi

    unset PGPASSWORD # Unset the superuser password
}

setup_backend() {
    print_step "Setting up Medusa Backend ($BACKEND_DIR)..."
    cd "$BACKEND_DIR" || { print_error "Could not change directory to $BACKEND_DIR"; exit 1; }

    print_info "Installing backend dependencies with Yarn..."
    yarn install
    if [ $? -ne 0 ]; then
        print_error "Backend 'yarn install' failed."
        cd ..
        exit 1
    fi
    print_success "Backend dependencies installed."

    print_info "Creating backend .env file..."
    if [ -z "$USER_DB_PASSWORD" ]; then
         read -s -p "Re-enter password for database user '$DB_USER': " DB_PASSWORD
         echo # newline
         export USER_DB_PASSWORD="$DB_PASSWORD"
    fi
    DATABASE_URL="postgres://${DB_USER}:${USER_DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

    cat << EOF > .env
# Auto-generated by setup script
STORE_CORS=http://localhost:${STOREFRONT_PORT},http://127.0.0.1:${STOREFRONT_PORT}
ADMIN_CORS=http://localhost:7001,http://127.0.0.1:7001
AUTH_CORS=http://localhost:7001,http://127.0.0.1:7001,http://localhost:${STOREFRONT_PORT},http://127.0.0.1:${STOREFRONT_PORT}
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}
JWT_SECRET=${JWT_SECRET}
COOKIE_SECRET=${COOKIE_SECRET}
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=../${STOREFRONT_DIR}
EOF
    if [ $? -ne 0 ]; then
        print_error "Failed to create backend .env file."
        cd ..
        exit 1
    fi
    print_success "Backend .env file created."
    print_info "DATABASE_URL set to: postgres://${DB_USER}:********@${DB_HOST}:${DB_PORT}/${DB_NAME}" # Mask password

    print_info "Running database migrations..."
    yarn medusa migrations run
    if [ $? -ne 0 ]; then
        print_error "Database migrations failed. Check database connection and .env file."
        cd ..
        exit 1
    fi
    print_success "Database migrations completed."

    print_info "Seeding database (this might take a moment)..."
    yarn medusa seed -f ./data/seed.json --modules
    if [ $? -ne 0 ]; then
        print_warning "Database seeding failed or seed file not found. Store might be empty. You can try running 'yarn seed' manually later."
    else
        print_success "Database seeding completed."
    fi

    cd ..
    print_success "Backend setup finished."
}

setup_storefront() {
    print_step "Setting up Next.js Storefront ($STOREFRONT_DIR)..."
    cd "$STOREFRONT_DIR" || { print_error "Could not change directory to $STOREFRONT_DIR"; exit 1; }

    print_info "Installing storefront dependencies with Yarn..."
    yarn install
    if [ $? -ne 0 ]; then
        print_error "Storefront 'yarn install' failed."
        cd ..
        exit 1
    fi
    print_success "Storefront dependencies installed."

    print_info "Creating storefront .env.local file..."
    cat << EOF > .env.local
# Auto-generated by setup script
MEDUSA_BACKEND_URL=http://localhost:${BACKEND_PORT}
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${STOREFRONT_PUBLISHABLE_KEY}
NEXT_PUBLIC_BASE_URL=http://localhost:${STOREFRONT_PORT}
NEXT_PUBLIC_DEFAULT_REGION=gb
NEXT_PUBLIC_STRIPE_KEY=
REVALIDATE_SECRET=supersecret-revalidate
EOF
    if [ $? -ne 0 ]; then
        print_error "Failed to create storefront .env.local file."
        cd ..
        exit 1
    fi
    print_success "Storefront .env.local file created."

    cd ..
    print_success "Storefront setup finished."
}

start_servers() {
    print_step "Starting servers..."

    print_info "Starting Medusa Backend on port $BACKEND_PORT..."
    cd "$BACKEND_DIR" || { print_error "Could not change directory to $BACKEND_DIR"; exit 1; }
    yarn dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    print_info "Backend server started in background (PID: $BACKEND_PID). Logs: backend.log"
    cd ..

    print_info "Starting Next.js Storefront on port $STOREFRONT_PORT..."
    cd "$STOREFRONT_DIR" || { print_error "Could not change directory to $STOREFRONT_DIR"; exit 1; }
    yarn dev > ../storefront.log 2>&1 &
    STOREFRONT_PID=$!
    print_info "Storefront server started in background (PID: $STOREFRONT_PID). Logs: storefront.log"
    cd ..

    print_info "Waiting a few seconds for servers to initialize..."
    sleep 15
}

open_browsers() {
    print_step "Opening applications in browser..."
    local open_cmd=""

    if command_exists xdg-open; then
        open_cmd="xdg-open"
    elif command_exists open; then
        open_cmd="open"
    elif command_exists start; then
        open_cmd="start"
    elif command_exists wslview; then
        open_cmd="wslview"
    elif command_exists explorer.exe; then
        open_cmd="explorer.exe"
    else
        print_warning "Could not find a command to open URLs (xdg-open, open, start, wslview, explorer.exe). Please open them manually."
        return
    fi

    local backend_url="http://localhost:$BACKEND_PORT/app"
    local storefront_url="http://localhost:$STOREFRONT_PORT"

    print_info "Attempting to open Backend Admin: $backend_url"
    "$open_cmd" "$backend_url" &
    sleep 1

    print_info "Attempting to open Storefront: $storefront_url"
    "$open_cmd" "$storefront_url" &
}

# --- Main Execution ---
trap 'echo -e "\n${YELLOW}Script interrupted. Processes might still be running in the background.${NC}"; exit 1' INT TERM

check_prerequisites
clone_repos
setup_database
setup_backend
setup_storefront
start_servers

sleep 5
if ! ps -p $BACKEND_PID > /dev/null; then
    print_error "Backend server does not seem to be running (PID $BACKEND_PID). Check backend.log for errors."
    exit 1
fi
if ! ps -p $STOREFRONT_PID > /dev/null; then
     print_error "Storefront server does not seem to be running (PID $STOREFRONT_PID). Check storefront.log for errors."
     exit 1
fi
print_success "Servers seem to be running."

open_browsers

print_step "Setup Complete!"
echo -e "${GREEN}Your Medusa backend should be running on http://localhost:$BACKEND_PORT${NC}"
echo -e "${GREEN}Your Next.js storefront should be running on http://localhost:$STOREFRONT_PORT${NC}"
echo -e "${YELLOW}Note:${NC} Servers are running in the background. Logs are in 'backend.log' and 'storefront.log'."
echo -e "${YELLOW}To stop the servers, you can use 'kill $BACKEND_PID $STOREFRONT_PID' or find and kill the Node processes manually.${NC}"

exit 0