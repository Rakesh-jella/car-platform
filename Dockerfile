# ==========================================
# Stage 1: Build React/Vite frontend
# ==========================================
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ==========================================
# Stage 2: Laravel application
# ==========================================
FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install \
        pdo_pgsql \
        pgsql \
        zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


# Laravel working directory
WORKDIR /var/www


# Copy Composer files first
COPY composer.json composer.lock ./


# Install PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist


# Copy Laravel application
COPY . .


# Copy compiled React/Vite assets
COPY --from=frontend /app/public/build ./public/build


# Create Laravel writable directories
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache


# Set permissions
RUN chmod -R 775 storage bootstrap/cache


# Render will provide PORT automatically
EXPOSE 10000


# Start Laravel
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]