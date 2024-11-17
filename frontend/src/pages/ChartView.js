import EChartsReact from "echarts-for-react";
import { useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../actions/taskActions";

export default function ChartView() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { userData } = useAuth();

  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchTasks(userData._id));
    }
  }, [dispatch, userData]);

  // Compute the status counts dynamically
  const statusCounts = useMemo(() => {
    const counts = {};
    tasks?.forEach((task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  }, [tasks]);
  console.log("statusCounts", statusCounts);
  const chartOptions = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "90%",
        left: "center",
        orient: "horizontal",
      },
      series: [
        {
          name: "Tasks",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: statusCounts.map((item) => ({
            ...item,
            itemStyle: {
              color:
                item.name === "To Do"
                  ? "#5470C6"
                  : item.name === "In Progress"
                  ? "#91CC75"
                  : item.name === "Completed"
                  ? "#FAC858"
                  : "inherit",
            },
          })),
        },
      ],
    }),
    [statusCounts]
  );

  return (
    <Box>
      {/* Chart Container */}

      {/* Status Counts Boxes */}
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {statusCounts.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.name}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontWeight: "bold",
                  fontSize: "38px",
                  color:
                    item.name === "To Do"
                      ? "#5470C6"
                      : item.name === "In Progress"
                      ? "#91CC75"
                      : item.name === "Completed"
                      ? "#FAC858"
                      : "inherit",
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
          },
          padding: "20px",
        }}
      >
        {statusCounts.length > 0 ? (
          <EChartsReact option={chartOptions} />
        ) : (
          <Typography
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            Please Add Tasks to View the Graph
          </Typography>
        )}
      </Box>
    </Box>
  );
}
