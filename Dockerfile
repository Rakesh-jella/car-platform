# ===============================
# Stage 1: Build Vite frontend
# ===============================
FROM node:22-alpine AS frontend
WORKDIR /app
# Install only package.json first for caching
COPY package*.json ./
RUN npm ci
# Copy the rest of the source
COPY . .
# Build assets
RUN npm run build

# ===============================
# Stage 2: Laravel + Apache (PHP runtime)
# ===============================
FROM php:8.2-apache
# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    && docker-php-ext-install \
        pdo_mysql \
        mysqli \
        zip \
        mbstring \
        gd \
        bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite for Laravel
RUN a2enmod rewrite

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory for Laravel app
WORKDIR /var/www/html

# Copy only composer files first (for caching)
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

# Copy the rest of the application (including Laravel source)
COPY . .

# Copy compiled Vite assets from frontend stage
COPY --from=frontend /app/public/build ./public/build

# Set proper permissions for Laravel storage & cache dirs
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Configure Apache DocumentRoot to point to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Allow .htaccess overrides for Laravel routing
RUN printf '%s\n' '<Directory /var/www/html/public>'
    '    Options Indexes FollowSymLinks'
    '    AllowOverride All'
    '    Require all granted'
    '</Directory>' >> /etc/apache2/apache2.conf

# ===============================
# Render startup script (adjusted for Port env var)
# ===============================
RUN printf '%s\n' '#!/bin/bash' \
    'set -e' \
    'PORT_NUM="${PORT:-10000}"' \
    'echo "Starting Laravel on port ${PORT_NUM}"' \
    "sed -i 's/^Listen .*/Listen ${PORT_NUM}/' /etc/apache2/ports.conf" \
    "sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT_NUM}>/' /etc/apache2/sites-available/000-default.conf" \
    'php artisan config:clear || true' \
    'php artisan route:clear || true' \
    'php artisan view:clear || true' \
    'php artisan migrate --force || true' \
    'if [ -n "$APP_KEY" ]; then php artisan config:cache; fi' \
    'echo "Apache starting..."' \
    'exec apache2-foreground' \
    > /usr/local/bin/start-app.sh && chmod +x /usr/local/bin/start-app.sh

# Expose the port Render expects
EXPOSE 10000

# Default command
CMD ["/usr/local/bin/start-app.sh"]