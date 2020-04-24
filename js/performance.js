let thisChart = document.getElementById("myChart");
let StatstikEinsehen = document.getElementById("StatstikEinsehen");
thisChart.style.visibility = "hidden";
StatstikEinsehen.style.visibility = "hidden";

let myChart = document.getElementById("myChart").getContext("2d");
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "#777";

function changeLabels(question) {
  AntwortChart.data.labels[0] = question.antwort1;
  AntwortChart.data.labels[1] = question.antwort2;
  AntwortChart.data.labels[2] = question.antwort3;
  AntwortChart.data.labels[3] = question.antwort4;
  AntwortChart.update();

}

let AntwortChart = new Chart(myChart, {
  type: "horizontalBar",
  data: {
    labels: [
      "Answer Possibility-1",
      "Answer Possibility-2",
      "Answer Possibility-3",
      "Answer Possibility-4",
    ],
    datasets: [
      {
        label: "Anzahl",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderWidth: 2,
        borderColor: "#777",
        hoverBorderWidth: 3,
        hoverBorderColor: "#000",
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Live-Ergebnisse der Teilnehmer",
      fontSize: 25,
      fontColor: "white",
    },
    legend: {
      display: false,
    },
    layout: {
      padding: {
        left: 5,
        right: 0,
        bottom: 0,
        top: 0,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white",
          },

          display: true,
          gridLines: {
            display: false,
            color: "#FFFFFF",
          },
          labels: {
            fontColor: "#ffffff",
          },
          scaleLabel: {
            display: true,
            color: "#FFFFFF",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "white",
          },
          display: true,
          gridLines: {
            display: true,
            color: "#FFFFFF",
          },
          scaleLabel: {
            display: true,
            color: "#FFFFFF",
          },
        },
      ],
    },
  },
});

function showStatistics(bool) {
  if (bool) {
    thisChart.style.visibility = "visible";
    StatstikEinsehen.style.visibility = "visible";
  } else {
    thisChart.style.visibility = "hidden";
    StatstikEinsehen.style.visibility = "hidden";
  }
}

function adddata(data) {
  AntwortChart.data.datasets[0].data[0] = data.ant1;
  AntwortChart.data.datasets[0].data[1] = data.ant2;
  AntwortChart.data.datasets[0].data[2] = data.ant3;
  AntwortChart.data.datasets[0].data[3] = data.ant4;
  AntwortChart.update();
}
