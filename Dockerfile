# ==========================================
# Stage 1: Build React/Vite frontend
# ==========================================
FROM node:22-alpine AS frontend

WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy frontend/application source
COPY . .

# Build Vite assets
RUN npm run build


# ==========================================
# Stage 2: Laravel + Apache
# ==========================================
FROM php:8.2-apache

# Install required system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libpq-dev \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    && docker-php-ext-install \
        pdo_pgsql \
        pgsql \
        zip \
        mbstring \
        gd \
        bcmath \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


# Enable Apache rewrite for Laravel
RUN a2enmod rewrite


# ==========================================
# Install Composer
# ==========================================
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


# ==========================================
# Laravel application
# ==========================================
WORKDIR /var/www/html

COPY . .


# Install PHP dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist


# Copy compiled Vite assets
COPY --from=frontend /app/public/build ./public/build


# ==========================================
# Create Laravel writable directories
# ==========================================
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache


# Set Laravel permissions
RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache \
    && chmod -R 775 \
    storage \
    bootstrap/cache


# ==========================================
# Configure Apache DocumentRoot
# ==========================================
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri \
    -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf


# Allow Laravel .htaccess
RUN printf '%s\n' \
    '<Directory /var/www/html/public>' \
    '    Options Indexes FollowSymLinks' \
    '    AllowOverride All' \
    '    Require all granted' \
    '</Directory>' \
    >> /etc/apache2/apache2.conf


# ==========================================
# Render startup script
# ==========================================
RUN printf '%s\n' \
    '#!/bin/bash' \
    'set -e' \
    '' \
    'PORT_NUM="${PORT:-10000}"' \
    '' \
    'echo "Starting Laravel application on port ${PORT_NUM}"' \
    '' \
    '# Configure Apache to use Render PORT' \
    'sed -i "s/^Listen .*/Listen ${PORT_NUM}/" /etc/apache2/ports.conf' \
    'sed -i "s/<VirtualHost \*:[0-9][0-9]*>/<VirtualHost *:${PORT_NUM}>/" /etc/apache2/sites-available/000-default.conf' \
    '' \
    '# Clear old Laravel caches' \
    'php artisan config:clear || true' \
    'php artisan route:clear || true' \
    'php artisan view:clear || true' \
    '' \
    '# Cache Laravel configuration when APP_KEY exists' \
    'if [ -n "$APP_KEY" ]; then' \
    '    php artisan config:cache' \
    'fi' \
    '' \
    'echo "Apache starting..."' \
    'exec apache2-foreground' \
    > /usr/local/bin/start-app.sh \
    && chmod +x /usr/local/bin/start-app.sh


# ==========================================
# Render port
# ==========================================
EXPOSE 10000


# ==========================================
# Start application
# ==========================================
CMD ["/usr/local/bin/start-app.sh"]