/**
 * Example code for the Electron app to send model usage data to the API
 * 
 * This is a simplified example showing how to track model usage in your Electron app
 * and send the data to your website's API endpoint.
 */

// Import required modules
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fetch = require('node-fetch'); // You'll need to install this: npm install node-fetch

// Store the user's credentials
let userEmail = null;
let userId = null;
let userToken = null;

// API endpoint URL - replace with your actual website URL
const API_BASE_URL = 'https://nextjs-starter-kit-kappa-three.vercel.app';
// For local development testing
const DEV_API_BASE_URL = 'http://localhost:3000';

// Track model usage data
const modelUsageTracker = {
  // Store pending model usage data that hasn't been sent to the API yet
  pendingData: [],
  
  // Add a new model usage entry
  addUsage(modelName, imageCount) {
    console.log(`Tracking usage: ${modelName}, ${imageCount} images`);
    
    // Add to pending data
    this.pendingData.push({
      modelName,
      imageCount,
      timestamp: Date.now(),
      userId: userId || userEmail
    });
    
    // If we have accumulated some data, send it to the API
    if (this.pendingData.length >= 5) {
      this.sendToAPI();
    }
  },
  
  // Send pending data to the API
  async sendToAPI() {
    if (this.pendingData.length === 0) {
      console.log('No pending data to send');
      return;
    }
    
    try {
      console.log(`Sending ${this.pendingData.length} model usage entries to API`);
      
      // Choose the appropriate API URL based on environment
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? `${DEV_API_BASE_URL}/api/model-usage` 
        : `${API_BASE_URL}/api/model-usage`;
      
      // Send the data to the API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userToken ? `Bearer ${userToken}` : undefined,
          'X-User-ID': userId || undefined,
          'X-Email': userEmail || undefined
        },
        body: JSON.stringify(this.pendingData)
      });
      
      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        
        if (result.success) {
          // Clear the pending data if the API call was successful
          this.pendingData = [];
          console.log('Model usage data sent successfully');
        } else {
          console.error('API returned error:', result.error);
        }
      } else {
        console.error(`API request failed with status ${response.status}`);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('Error sending model usage data to API:', error);
    }
  }
};

// Create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load your app's UI
  mainWindow.loadFile('index.html');
  
  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

// Initialize the app
app.whenReady().then(() => {
  createWindow();
  
  // Set up IPC handlers for communication with the renderer process
  setupIPCHandlers();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // Send any remaining pending data before quitting
  modelUsageTracker.sendToAPI();
  
  if (process.platform !== 'darwin') app.quit();
});

// Set up IPC handlers for communication with the renderer process
function setupIPCHandlers() {
  // Handle user login
  ipcMain.handle('user:login', async (event, credentials) => {
    try {
      // Store user credentials
      userEmail = credentials.email;
      userToken = credentials.token;
      userId = credentials.userId;
      
      console.log(`User logged in: ${userEmail}`);
      return { success: true };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Handle model usage tracking
  ipcMain.handle('model:track-usage', async (event, data) => {
    try {
      // Add the usage to the tracker
      modelUsageTracker.addUsage(data.modelName, data.imageCount);
      return { success: true };
    } catch (error) {
      console.error('Error tracking model usage:', error);
      return { success: false, error: error.message };
    }
  });
  
  // Handle manual sending of usage data
  ipcMain.handle('model:send-usage-data', async () => {
    try {
      await modelUsageTracker.sendToAPI();
      return { success: true };
    } catch (error) {
      console.error('Error sending usage data:', error);
      return { success: false, error: error.message };
    }
  });
}

// Example of how to use the model usage tracker in your app's main process
function exampleUsage() {
  // When a user generates an image with a specific model
  modelUsageTracker.addUsage('Stable Diffusion', 1);
  
  // When a user generates multiple images at once
  modelUsageTracker.addUsage('DALL-E', 4);
  
  // When a user uses a different model
  modelUsageTracker.addUsage('Midjourney', 2);
}

// Example preload.js content for exposing the API to the renderer process
/*
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  login: (credentials) => ipcRenderer.invoke('user:login', credentials),
  trackModelUsage: (data) => ipcRenderer.invoke('model:track-usage', data),
  sendUsageData: () => ipcRenderer.invoke('model:send-usage-data')
});
*/

// Example of how to use the API from the renderer process
/*
// Login
window.electronAPI.login({
  email: 'user@example.com',
  userId: 'user_123',
  token: 'auth_token_here'
});

// Track model usage
window.electronAPI.trackModelUsage({
  modelName: 'Stable Diffusion',
  imageCount: 1
});

// Manually send usage data
window.electronAPI.sendUsageData();
*/
