totalMovieBoxData = [{"date":"1950-02-15","value":10000000},{"date":"1951-07-26","value":0},{"date":"1953-02-05","value":40759520},{"date":"1955-06-16","value":36359037},{"date":"1959-01-29","value":36479805},{"date":"1961-01-25","value":85000000},{"date":"1963-12-25","value":12000000},{"date":"1967-10-18","value":137741048},{"date":"1970-12-11","value":18000000},{"date":"1977-03-11","value":0},{"date":"1977-06-19","value":29000000},{"date":"1977-03-11","value":0},{"date":"1981-07-10","value":39900000},{"date":"1985-07-24","value":21288692},{"date":"1986-06-23","value":25336794},{"date":"1988-11-13","value":53279055},{"date":"1989-11-13","value":184155863},{"date":"1990-11-16","value":27931461},{"date":"1991-09-29","value":331907151},{"date":"1992-11-08","value":504050219},{"date":"1994-12-08","value":968511805},{"date":"1995-06-15","value":346079773},{"date":"1996-06-19","value":325338851},{"date":"1997-06-13","value":252712101},{"date":"1998-06-05","value":304320254},{"date":"1999-06-12","value":448191819},{"date":"1999-12-17","value":90874570},{"date":"2000-12-10","value":169327687},{"date":"2000-05-13","value":349822765},{"date":"2001-06-02","value":186053725},{"date":"2002-06-16","value":273144151},{"date":"2002-11-05","value":109578115},{"date":"2003-10-20","value":250397798},{"date":"2004-03-21","value":103951461},{"date":"2005-10-30","value":314432837},{"date":"2007-03-23","value":169333034},{"date":"2008-11-17","value":309979994},{"date":"2009-11-25","value":267045765},{"date":"2010-11-24","value":591794936},{"date":"2012-11-01","value":471222889},{"date":"2013-11-10","value":1274219009},{"date":"2014-10-23","value":657827828},{"date":"2016-02-11","value":1023784195},{"date":"2016-11-14","value":643331111},{"date":"2018-11-05","value":529323962},{"date":"2019-11-07","value":756140237}];

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};
// document.addEventListener('')




$(".timeline-wrapper .timeline-content-item > span").on("mouseenter mouseleave", function (e) {
    $(".timeline-wrapper .timeline-content-item.active").removeClass("active");
    $(this).parent().addClass("active");
});
    

document.addEventListener('DOMContentLoaded', function () {
    // const lineChartDataPath =  'assets/total_movie_box.json';
    // fetchJSONFile(lineChartDataPath);

    am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("lineChartDiv", am4charts.XYChart);
    
    // Add data
    chart.data = totalMovieBoxData;
    
    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;
    
    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    
    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");
    
    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;
    
    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    
    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();
    
    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    
    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
    
    
    }); // end am4core.ready()
});