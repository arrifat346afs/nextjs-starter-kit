import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Define types
interface ModelUsageData {
  modelName: string;
  imageCount: number;
  timestamp?: number;
}

// Create a Convex client for API routes
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

// Helper function to add CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

/**
 * GET handler to retrieve model usage data
 */
export async function GET(request: NextRequest) {
  try {
    // Check if a userId is provided in the query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    let result;

    if (userId) {
      // If userId is provided, get user-specific data
      result = await convex.query(api.modelUsage.getUserModelUsageData, {
        userId: userId
      });
    } else {
      // Otherwise, get all data
      result = await convex.query(api.modelUsage.getModelUsageData);
    }

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || [],
        error: result.error,
      },
      {
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Error retrieving model usage data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve model usage data",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/**
 * POST handler to add new model usage data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.modelName || typeof body.modelName !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid model name" },
        { status: 400, headers: corsHeaders() }
      );
    }

    if (
      !body.imageCount ||
      typeof body.imageCount !== "number" ||
      body.imageCount <= 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid image count" },
        { status: 400, headers: corsHeaders() }
      );
    }

    // Add data to Convex
    const result = await convex.mutation(api.modelUsage.addModelUsageData, {
      modelName: body.modelName,
      imageCount: body.imageCount,
      userId: body.userId || undefined, // Include userId if provided
    });

    return NextResponse.json(
      {
        success: result.success,
        data: result.data,
        error: result.error,
      },
      {
        headers: corsHeaders(),
        status: result.success ? 200 : 400,
      }
    );
  } catch (error) {
    console.error("Error adding model usage data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add model usage data",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

/**
 * DELETE handler to clear all model usage data
 */
export async function DELETE() {
  try {
    // Clear data from Convex
    const result = await convex.mutation(api.modelUsage.clearModelUsageData);

    return NextResponse.json(
      {
        success: result.success,
        message: result.message || "All model usage data cleared",
        error: result.error,
      },
      {
        headers: corsHeaders(),
        status: result.success ? 200 : 400,
      }
    );
  } catch (error) {
    console.error("Error clearing model usage data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear model usage data",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}
