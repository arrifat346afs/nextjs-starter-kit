"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/app/(pages)/dashboard/_components/chart";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useEffect, useState, useRef, useCallback } from "react";

// Define types for our data
interface ModelUsageData {
  date: Date;
  formattedDate: string;
  [modelName: string]: any;
}

interface ModelMetric {
  modelName: string;
  imageCount: number;
  timestamp: number; // Unix timestamp
  userId?: string;
}

interface ApiResponse {
  success: boolean;
  data?: ModelMetric[];
  error?: string;
}

interface UserModelUsageChartProps {
  userId: string;
}

export function UserModelUsageChart({ userId }: UserModelUsageChartProps) {
  const [chartData, setChartData] = useState<ModelUsageData[]>([]);
  const [isUsingSampleData, setIsUsingSampleData] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelNames, setModelNames] = useState<string[]>([]);
  const hasInitializedRef = useRef(false);

  // Process and organize data for the chart
  const processModelData = useCallback((modelMetrics: ModelMetric[]) => {
    try {
      // Check if we have any real data
      const hasRealData = modelMetrics.length > 0;

      // If no real data, return empty array
      if (!hasRealData) {
        return [];
      }

      // Group data by date and model
      const groupedByDate = modelMetrics.reduce(
        (acc, metric) => {
          const date = new Date(metric.timestamp);
          const dateKey = format(date, "yyyy-MM-dd");

          if (!acc[dateKey]) {
            acc[dateKey] = {
              date,
              formattedDate: format(date, "MMM d"),
            };
          }

          // Add or increment the model count
          const modelName = metric.modelName;
          acc[dateKey][modelName] =
            (acc[dateKey][modelName] || 0) + metric.imageCount;

          return acc;
        },
        {} as Record<string, ModelUsageData>
      );

      // Convert to array and sort by date
      const result = Object.values(groupedByDate).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );

      // Extract unique model names for the chart
      const uniqueModelNames = Array.from(
        new Set(modelMetrics.map((metric) => metric.modelName))
      );
      setModelNames(uniqueModelNames);

      return result;
    } catch (error) {
      console.error("Error processing model data:", error);
      return [];
    }
  }, []);

  // Generate empty data for the chart when no real data is available
  const generateEmptyData = useCallback((): ModelUsageData[] => {
    const emptyData: ModelUsageData[] = [];
    const today = new Date();

    // Generate data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      emptyData.push({
        date,
        formattedDate: format(date, "MMM d"),
      });
    }

    return emptyData;
  }, []);

  // Fetch data from the API
  const fetchModelData = useCallback(async () => {
    // Prevent multiple fetches
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      // Use the full URL with localhost for development
      const apiUrl =
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/api/model-usage?userId=${userId}`
          : `https://nextjs-starter-kit-kappa-three.vercel.app/api/model-usage?userId=${userId}`;

      console.log("Fetching user data from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Include credentials for cookies if needed
        credentials: "include",
        // Add cache control to prevent caching
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch model data");
      }

      console.log("Received user data:", result.data);

      // Process the data for the chart
      const processedData = processModelData(result.data);
      setChartData(
        processedData.length > 0 ? processedData : generateEmptyData()
      );
      setIsUsingSampleData(processedData.length === 0);
      setLastUpdated(new Date());

      return processedData;
    } catch (error) {
      console.error("Error fetching user model data:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setChartData(generateEmptyData());
      setIsUsingSampleData(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [generateEmptyData, processModelData, isLoading, userId]);

  // Get color for model line
  const getModelColor = useCallback((index: number) => {
    const colors = [
      "#2563eb", // blue-600
      "#16a34a", // green-600
      "#dc2626", // red-600
      "#9333ea", // purple-600
      "#ea580c", // orange-600
      "#0891b2", // cyan-600
      "#4f46e5", // indigo-600
      "#db2777", // pink-600
    ];
    return colors[index % colors.length];
  }, []);

  // Set up initial data fetch - only once
  useEffect(() => {
    // Only fetch data once when the component mounts or userId changes
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;

      // Initial data fetch
      fetchModelData();

      // Expose refresh function to window for manual refresh
      // @ts-ignore
      window.refreshUserModelData = fetchModelData;

      return () => {
        // Clean up
        // @ts-ignore
        delete window.refreshUserModelData;
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Your Model Usage</h3>
          {isUsingSampleData && (
            <Badge variant="outline" className="text-xs">
              No Data
            </Badge>
          )}
          {lastUpdated && !isUsingSampleData && (
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <div className="relative h-[300px] w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="text-sm text-muted-foreground">Loading data...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <div className="text-sm text-red-500">Error: {error}</div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="formattedDate"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              interval={4}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              width={30}
            />
            {modelNames.map((modelName, index) => (
              <Line
                key={modelName}
                type="monotone"
                dataKey={modelName}
                stroke={getModelColor(index)}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            ))}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const fullDate = new Date(
                    chartData.find((d) => d.formattedDate === label)?.date || ""
                  ).toLocaleDateString();

                  return (
                    <div className="bg-black/80 border border-gray-800 p-2">
                      <div className="text-sm text-white font-medium">
                        {fullDate}
                      </div>
                      {payload.map((entry, index) => (
                        <div
                          key={`item-${index}`}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-gray-300">{entry.name}:</span>
                          <span className="text-white font-medium">
                            {entry.value} images
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isUsingSampleData && (
        <div className="mt-2 text-xs text-muted-foreground text-center">
          No model usage data available for your account.
        </div>
      )}
    </div>
  );
}
