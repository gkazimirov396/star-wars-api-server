# A Server Side Application That Fetches And Renders A List Of Characters From Star Wars

This project serves a Node.js application with NGINX as a reverse proxy. The application fetches data from the Star Wars API and integrates with the Giphy API to display animated GIFs.

---

## **Environment Variables**

You need to create a `.env` file in the project root directory to store the required environment variables:

### **Required Variables**
| Variable         | Description                   | Example                      |
|-------------------|-------------------------------|------------------------------|
| `PORT`           | Port for the Node.js server  | `5000`                       |
| `GIPHY_API_KEY`  | API key for the Giphy API    | `your-giphy-api-key-here`    |

### **Creating `.env` File**
1. Create a `.env` file in the root of your project:
   ```bash
   touch .env
   ```
   (You can also create it manually in the root directory)
2. Add the following content to your `.env` file:
   ```env
   PORT=5000
   GIPHY_API_KEY=your-giphy-api-key-here
   ```

---

## **Development Mode**

### **Steps to Run in Development Mode**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   - This uses the `--watch` flag for hot-reloading when files are changed.
3. Open your browser and navigate to:
   `http://localhost:5000/api/people`

---

## **Production Mode**

### **Steps to Run in Production Using Docker**
1. **Build and Run Containers**:
   Use `docker-compose` to build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**:
   - NGINX (Frontend & API Proxy): `http://localhost`
   - NGINX proxies API requests to `http://localhost/api/`.

3. **Stop the Containers**:
   When you're done, stop the containers:
   ```bash
   docker-compose down
   ```
