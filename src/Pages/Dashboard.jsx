import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../Utils/Auth";
import Chart from 'chart.js/auto';


import { venueUtilization, bookStatusCounts } from '../Components/Fetch.jsx';
export default function Dashboard() {
  useAuth();

  const [username, setUserName] = useState('')
  let venueUtilizationChartInstance = useRef(null);
  let bookingStatusCountsChartInstance = useRef(null);

  

  async function fetchAndPlotVenueUtilization() {
    const utilizationData = await venueUtilization();
    if (!Array.isArray(utilizationData)) {
      console.error('Expected utilizationData to be an array, got:', utilizationData);
      return; // Exit the function if utilizationData is not an array
    }
    const ctx = document.getElementById('venueUtilization').getContext('2d');
    if (venueUtilizationChartInstance.current) {
      venueUtilizationChartInstance.current.destroy();
    }
    venueUtilizationChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: utilizationData.map(data => data.venueName),
        datasets: [{
          label: 'Utilization Rate',
          data: utilizationData.map(data => data.utilizationRate),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  async function fetchAndPlotBookingStatusCounts() {
    const bookingData = await bookStatusCounts();
    if (!Array.isArray(bookingData)) {
      console.error('Expected bookingData to be an array, got:', bookingData);
      return; // Exit the function if bookingData is not an array
    }
    const ctx = document.getElementById('bookingStatusCounts').getContext('2d');
  
    // Destroy the existing chart instance if it exists
    if (bookingStatusCountsChartInstance.current) {
      bookingStatusCountsChartInstance.current.destroy();
    }
  
    const statusLabels = [...new Set(bookingData.map(data => data.status))];
    const datasets = statusLabels.map(status => ({
      label: status,
      data: bookingData.filter(data => data.status === status).map(data => data.count),
      backgroundColor: status === 'confirmed' ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 99, 132, 0.2)',
      borderColor: status === 'confirmed' ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }));
  
    // Update the chart instance reference with the new chart
    bookingStatusCountsChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bookingData.map(data => data.venueName),
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  useEffect(() => {
    fetchAndPlotVenueUtilization();
    fetchAndPlotBookingStatusCounts();

    // Fetch username from session storage
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData && userData.value && userData.value.username) {
      setUserName(userData.value.username);
    }
    
  
  }, []);

  return (
    <>
      <h1 className='mt-2'>Welcome back <span className='font-bold'> {username}</span>! </h1>

      <div className="chart-container container">
        <div className="canva-container rounded shadow border-gray-700">
          <canvas id="venueUtilization"></canvas> 
        </div>
        <div className="canva-container">
          <canvas id="bookingStatusCounts"></canvas>
        </div>

      </div>
    </>
  );
}