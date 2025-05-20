# Electron App Integration Guide

This guide explains how to integrate your Electron app with the website to track and display model usage data.

## Overview

The integration consists of two main parts:

1. **Electron App**: Tracks model usage and sends data to the API
2. **Website**: Receives data from the Electron app, stores it in the database, and displays it on the user's dashboard

## Electron App Implementation

### 1. Track Model Usage

In your Electron app, you need to track when a user uses an AI model to generate images. For each usage, record:

- Model name (e.g., "Stable Diffusion", "DALL-E", "Midjourney")
- Number of images generated
- User ID or email (to associate the usage with a specific user)
- Timestamp (when the images were generated)

### 2. Send Data to the API

Implement a function to send the tracked data to the website's API. Here's an example:

```javascript
async function sendModelUsageData(data) {
  try {
    const response = await fetch('https://your-website.com/api/model-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`, // If you have authentication
        'X-User-ID': userId,                    // Include user ID in headers
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending model usage data:', error);
    throw error;
  }
}
```

### 3. Data Format

The API accepts the following data formats:

#### Single Usage

```javascript
{
  "modelName": "Stable Diffusion", // or "model": "Stable Diffusion"
  "imageCount": 5,                 // or "count": 5
  "userId": "user_123"             // or "user_id": "user_123" or "email": "user@example.com"
}
```

#### Multiple Usages (Array)

```javascript
[
  {
    "modelName": "Stable Diffusion",
    "imageCount": 3,
    "userId": "user_123"
  },
  {
    "modelName": "DALL-E",
    "imageCount": 2,
    "userId": "user_123"
  }
]
```

### 4. When to Send Data

You can choose when to send the data:

- **Real-time**: Send data immediately after each model usage
- **Batched**: Collect multiple usages and send them in batches
- **On app close**: Send all pending data when the user closes the app
- **Periodic**: Send data at regular intervals (e.g., every hour)

## Website API Endpoint

The website provides an API endpoint to receive model usage data:

- **Endpoint**: `/api/model-usage`
- **Method**: POST
- **Authentication**: Include user token in Authorization header (if applicable)
- **User Identification**: Include user ID in request body or headers

## Testing the Integration

1. Start your website locally: `npm run dev`
2. Start your Electron app
3. Generate some images using different models
4. Check the website's console for API request logs
5. Visit the dashboard page to see if the model usage chart displays the data

## Troubleshooting

### Data Not Appearing in Chart

1. Check the browser console for errors
2. Verify that the API is receiving the data (check server logs)
3. Ensure the user ID in the Electron app matches the user ID on the website
4. Try the "Refresh Data" button on the chart

### API Errors

1. Check the data format being sent from the Electron app
2. Ensure all required fields are included
3. Verify that the user ID is valid
4. Check for CORS issues if testing locally

## Example Implementation

See the `examples/electron-app-example.js` file for a complete example of how to implement model usage tracking in your Electron app.

## Security Considerations

1. **User Authentication**: Ensure that only authenticated users can send data
2. **Data Validation**: Validate all data on the server side
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **HTTPS**: Always use HTTPS in production

## Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
