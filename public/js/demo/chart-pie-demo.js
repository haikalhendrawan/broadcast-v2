// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var countBroadcast = document.getElementById("count-broadcast").value;
var countBroadcastDone = document.getElementById("count-broadcast-done").value;
var countBroadcastNotDone = document.getElementById("count-broadcast-not-done").value;

var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Sudah', 'Belum'],
    datasets: [{
      data: [countBroadcastDone, countBroadcastNotDone],
      backgroundColor: ['#1cc88a', '#e74a3b'],
      hoverBackgroundColor: ['#1cc88a', '#e74a3b'],
      hoverBorderColor: "rgba(234, 236, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});