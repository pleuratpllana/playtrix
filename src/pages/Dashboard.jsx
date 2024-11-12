import Section from "../components/shared/Section";
import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController,
} from "chart.js";
import {
  fetchPopularDeezerSongs,
  fetchAlbumsList,
  fetchArtistsList,
  fetchPlaylists,
  fetchGenres,
} from "../config/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PieController
);

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const categories = [
    {
      name: "Most Streamed Songs",
      type: "bar",
      fetchData: fetchPopularDeezerSongs,
    },
    {
      name: "Featured Albums",
      type: "pie",
      fetchData: fetchAlbumsList,
    },
    {
      name: "Top Artists",
      type: "line",
      fetchData: fetchArtistsList,
    },
    {
      name: "Popular Playlists",
      type: "pie",
      fetchData: fetchPlaylists,
    },
    {
      name: "Genres by Popularity",
      type: "bar",
      fetchData: fetchGenres,
    },
    {
      name: "Recent Releases",
      type: "line",
      fetchData: fetchAlbumsList,
    },
  ];

  const chartContainers = useRef([]);
  const chartInstances = useRef([]);

  useEffect(() => {
    const loadChartData = async () => {
      const dataPromises = categories.map(async (category) => {
        const data = await category.fetchData();
        const limitedData = data.slice(0, 12);

        const labels = limitedData.map(
          (item) => item.title || item.name || "Unknown"
        );
        const values = limitedData.map((item) => {
          if (category.name === "Top Artists") {
            return item.fanCount || 0; // Use fanCount for Top Artists
          } else if (category.name === "Genres by Popularity") {
            return item.id || Math.floor(Math.random() * 100); // Use id or a placeholder for genres
          } else if (category.name === "Recent Releases") {
            return new Date(item.releaseDate).getTime() / 1000000 || 0;
          } else {
            return item.trackCount || item.position || item.duration || 0;
          }
        });

        return { labels, data: values };
      });

      const resolvedData = await Promise.all(dataPromises);
      setChartData(resolvedData);
    };

    loadChartData();
  }, []);

  useEffect(() => {
    chartData.forEach((data, index) => {
      const ctx = chartContainers.current[index]?.getContext("2d");
      if (!ctx) return;

      if (chartInstances.current[index]) {
        chartInstances.current[index].destroy();
      }

      chartInstances.current[index] = new ChartJS(ctx, {
        type: categories[index].type,
        data: {
          labels: data.labels,
          datasets: [
            {
              label: categories[index].name,
              data: data.data,
              backgroundColor:
                categories[index].type === "pie"
                  ? [
                      "#2ecc71",
                      "#27ae60",
                      "#1e8449",
                      "#145a32",
                      "#7dcea0",
                      "#52be80",
                    ]
                  : "#1cb652",
              borderColor: "#1cb652",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales:
            categories[index].type !== "pie"
              ? {
                  x: { ticks: { color: "white" } },
                  y: { ticks: { color: "white" } },
                }
              : undefined,
          plugins: {
            legend: { labels: { color: "white" } },
            tooltip: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          },
        },
      });
    });

    return () => {
      chartInstances.current.forEach((chart) => chart?.destroy());
    };
  }, [chartData]);

  return (
    <Section
      title="Dashboard"
      description="This section displays your recent activity."
      showSearch={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category, index) => (
          <div key={category.name}>
            <h4 className="mb-2 text-white">{category.name}</h4>
            <div
              className="mt-relative flex flex-col rounded-lg py-5 px-4 bg-[rgba(255,255,255,0.1)] border border-white/10 shadow-md shadow-white/5 overflow-hidden"
              style={{ minHeight: "300px" }}
            >
              <canvas
                ref={(el) => (chartContainers.current[index] = el)}
                style={{ maxHeight: "250px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Dashboard;
