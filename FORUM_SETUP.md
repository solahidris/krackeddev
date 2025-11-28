# Forum Setup Guide

## Accessing the Forum

The forum is available at the `/forum` route in your Next.js application.

### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the forum directly:
   - Navigate to `http://localhost:3000/forum` in your browser

### Setting up `forum.localhost` Subdomain

To access the forum via `forum.localhost`, you'll need to configure local DNS and routing. Here are common approaches:

#### Option 1: Using `/etc/hosts` (macOS/Linux)

1. Edit your hosts file:
   ```bash
   sudo nano /etc/hosts
   ```

2. Add this line:
   ```
   127.0.0.1 forum.localhost
   ```

3. Access `http://forum.localhost:3000/forum` in your browser

#### Option 2: Using a Reverse Proxy (nginx)

1. Install nginx (if not already installed)

2. Create a configuration file at `/usr/local/etc/nginx/servers/forum.conf`:
   ```nginx
   server {
       listen 80;
       server_name forum.localhost;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Update your `/etc/hosts` file to include:
   ```
   127.0.0.1 forum.localhost
   ```

4. Restart nginx:
   ```bash
   sudo nginx -s reload
   ```

5. Access `http://forum.localhost/forum` in your browser

#### Option 3: Using Next.js Custom Server (Advanced)

You can create a custom server that handles host-based routing, but this requires additional setup and is not recommended for development.

## Notes

- The forum is **not linked** from the main site navigation
- All data is stored **in-memory** and will reset on server restart
- The forum uses the existing UI components and styling from the main site
- No database or API routes are required for the current implementation

