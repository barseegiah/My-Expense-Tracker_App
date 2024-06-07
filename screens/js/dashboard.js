// SIDEBAR TOGGLE
var sidebarOpen = false;
let sidebar = document.getElementById("sidebar");

function openSidebar(){
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar(){
    if(sidebarOpen){
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}


// BAR CHART
var barChartOptions = {
    series: [{
    data: [400, 430, 448, 470, 1380]
  }],
    chart: {
    type: 'bar',
    background: "transparent",
    height: 350,
    toolbar:{
        show: false,
    },
  },
  colors: [
    "#2962ff",
    "#d50000",
    "#2e7d32",
    "#ff6d00",
    "#583cb3",
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#55596e",
    yaxis:{
        lines: {
            show: true,
        },
    },
  },
  xaxis: {
    lines:{
        show: true,
    },
  },
  legend:{
    labels: {
        color: "1A2130",
    },
    show: true,
    position: "top",
  },
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: ["January", "June", "August", "July", "December"],
    title: {
        style: {
            color: "#f5f7ff",
        },
    },
    axisBorder: {
        show: true,
        color: "#55596e",
    },
    axisTicks: {
        show: true,
        color: "#55596e",
    },
    labels: {
        style: {
            color: "1A2130",
        },
    },
  },
  yaxis: {
    title: {
        text: "Count",
        style: {
            color: "1A2130",
        },
    },
    axisBorder: {
        color: "#55596e",
        show: true,
    },
    axisTicks: {
        color: "#55596e",
        show: true,
    },
    labels: {
        style: {
            color: "1A2130",
        },
    },
  }

  };

  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
//   chart.render();
     barChart.render();  


// AREA CHART
var areaChartOptions = {
  series: [{
  name: 'Expence Set',
  data: [31, 40, 28, 51, 42,],
}], 
chart:{
  type: "area",
  background: "transparent",
  height: 350,
  stacked: false,
  toobar:{ 
    show: false,
  },
},
colors:["#00ab57", "1A2130"],
labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
dataLabels:{
  enabled: false,
},
fill: {
  gradient: {
    opacityForm: 0.4,
    opacityTo: 0.1,
    shadeIntensity: 1,
    stops: [0, 100],
    type: "vertical",
  },
  type: "gradient",
},
grid: {
  borderColor: "#55596e",
  yaxis: {
      lines: {
        show: "true",
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    }
},
length: {
  labels: {
    colors: "#1A2130",
},
show: 6,
position: "top",
},
markers: {
  size: 6,
  strokeColors: "#1A2130",
  strokeWidth: 3,
},
stroke: {
  curve: "smooth",
},
xaxis: {
  axisBorder: {
    color: "#55596e",
    show: true,
  },
  axisTicks: {
    color: "#55596e",
    show: true,
  },
  labels: {
    offsetY: 5,
    style: {
      colors: "#1A2130",
    },
  },
},
yaxis: [
  {
    title: {
      text: "Purchase Orders",
      style: {
        color: ["#f5f7ff"],
      },
    },
  },
],
tooltip: {
  shared: true,
  intersect: false,
  theme: "dark",
}
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();