import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Query to get all model usage data
 * Filters data to only include entries from the last 30 days
 */
export const getModelUsageData = query({
  args: {},
  handler: async (ctx) => {
    try {
      // Get current timestamp
      const now = Date.now();
      // Calculate timestamp for 30 days ago
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

      // Query the database for model usage data from the last 30 days
      const modelUsageData = await ctx.db
        .query("modelUsage")
        .withIndex("by_timestamp", (q) => q.gt("timestamp", thirtyDaysAgo))
        .collect();

      return {
        success: true,
        data: modelUsageData,
      };
    } catch (error) {
      console.error("Error retrieving model usage data:", error);
      return {
        success: false,
        error: "Failed to retrieve model usage data",
      };
    }
  },
});

/**
 * Mutation to add new model usage data
 */
export const addModelUsageData = mutation({
  args: {
    modelName: v.string(),
    imageCount: v.number(),
    userId: v.optional(v.string()), // Make userId optional to maintain backward compatibility
  },
  handler: async (ctx, args) => {
    try {
      // Validate input
      if (!args.modelName) {
        return {
          success: false,
          error: "Invalid model name",
        };
      }

      if (!args.imageCount || args.imageCount <= 0) {
        return {
          success: false,
          error: "Invalid image count",
        };
      }

      // Try to get the current user if userId is not provided
      let userId = args.userId;
      if (!userId) {
        const identity = await ctx.auth.getUserIdentity();
        if (identity) {
          userId = identity.subject;
        }
      }

      // Create new model usage data entry
      const newEntry = {
        modelName: args.modelName,
        imageCount: args.imageCount,
        timestamp: Date.now(),
        userId: userId, // Include userId in the entry
      };

      // Insert into database
      const id = await ctx.db.insert("modelUsage", newEntry);

      return {
        success: true,
        data: { ...newEntry, _id: id },
      };
    } catch (error) {
      console.error("Error adding model usage data:", error);
      return {
        success: false,
        error: "Failed to add model usage data",
      };
    }
  },
});

/**
 * Mutation to clear all model usage data
 * This is primarily for testing/development purposes
 */
export const clearModelUsageData = mutation({
  args: {},
  handler: async (ctx) => {
    try {
      // Get all model usage data
      const allData = await ctx.db.query("modelUsage").collect();

      // Delete each entry
      for (const entry of allData) {
        await ctx.db.delete(entry._id);
      }

      return {
        success: true,
        message: "All model usage data cleared",
      };
    } catch (error) {
      console.error("Error clearing model usage data:", error);
      return {
        success: false,
        error: "Failed to clear model usage data",
      };
    }
  },
});

/**
 * Query to get model usage data for a specific user
 * Filters data to only include entries from the last 30 days for the specified user
 */
export const getUserModelUsageData = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get current timestamp
      const now = Date.now();
      // Calculate timestamp for 30 days ago
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

      // Query the database for model usage data from the last 30 days for the specific user
      const modelUsageData = await ctx.db
        .query("modelUsage")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .filter((q) => q.gt(q.field("timestamp"), thirtyDaysAgo))
        .collect();

      return {
        success: true,
        data: modelUsageData,
      };
    } catch (error) {
      console.error("Error retrieving user model usage data:", error);
      return {
        success: false,
        error: "Failed to retrieve user model usage data",
      };
    }
  },
});
