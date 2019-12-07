totalMovieBoxData = [{"date":"1950-02-15","value":10000000,"movie":"Cinderella"},{"date":"1951-07-26","value":0,"movie":"Alice in Wonderland"},{"date":"1953-02-05","value":40759520,"movie":"Peter Pan"},{"date":"1955-06-16","value":36359037,"movie":"Lady and the Tramp"},{"date":"1959-01-29","value":36479805,"movie":"Sleeping Beauty"},{"date":"1961-01-25","value":85000000,"movie":"One Hundred and One Dalmatians"},{"date":"1963-12-25","value":12000000,"movie":"The Sword in the Stone"},{"date":"1967-10-18","value":137741048,"movie":"The Jungle Book"},{"date":"1970-12-11","value":18000000,"movie":"The AristoCats"},{"date":"1977-03-11","value":0,"movie":"The Many Adventures of Winnie the Pooh"},{"date":"1977-03-11","value":29000000,"movie":"The Rescuers"},{"date":"1977-06-19","value":0,"movie":"The Many Adventures of Winnie the Pooh"},{"date":"1981-07-10","value":39900000,"movie":"The Fox and the Hound"},{"date":"1985-07-24","value":21288692,"movie":"The Black Cauldron"},{"date":"1986-06-23","value":25336794,"movie":"The Great Mouse Detective"},{"date":"1988-11-13","value":53279055,"movie":"Oliver & Company"},{"date":"1989-11-13","value":184155863,"movie":"The Little Mermaid"},{"date":"1990-11-16","value":27931461,"movie":"The Rescuers Down Under"},{"date":"1991-09-29","value":331907151,"movie":"Beauty and the Beast"},{"date":"1992-11-08","value":504050219,"movie":"Aladdin"},{"date":"1994-12-08","value":968511805,"movie":"The Lion King"},{"date":"1995-06-15","value":346079773,"movie":"Pocahontas"},{"date":"1996-06-19","value":325338851,"movie":"The Hunchback of Notre Dame"},{"date":"1997-06-13","value":252712101,"movie":"Hercules"},{"date":"1998-06-05","value":304320254,"movie":"Mulan"},{"date":"1999-06-12","value":448191819,"movie":"Tarzan"},{"date":"1999-12-17","value":90874570,"movie":"Fantasia 2000"},{"date":"2000-05-13","value":169327687,"movie":"The Emperor's New Groove"},{"date":"2000-12-10","value":349822765,"movie":"Dinosaur"},{"date":"2001-06-02","value":186053725,"movie":"Atlantis: The Lost Empire"},{"date":"2002-06-16","value":273144151,"movie":"Lilo & Stitch"},{"date":"2002-11-05","value":109578115,"movie":"Treasure Planet"},{"date":"2003-10-20","value":250397798,"movie":"Brother Bear"},{"date":"2004-03-21","value":103951461,"movie":"Home on the Range"},{"date":"2005-10-30","value":314432837,"movie":"Chicken Little"},{"date":"2007-03-23","value":169333034,"movie":"Meet the Robinsons"},{"date":"2008-11-17","value":309979994,"movie":"Bolt"},{"date":"2009-11-25","value":267045765,"movie":"The Princess and the Frog"},{"date":"2010-11-24","value":591794936,"movie":"Tangled"},{"date":"2012-11-01","value":471222889,"movie":"Wreck-It Ralph"},{"date":"2013-11-10","value":1274219009,"movie":"Frozen"},{"date":"2014-10-23","value":657827828,"movie":"Big Hero 6"},{"date":"2016-02-11","value":1023784195,"movie":"Zootopia"},{"date":"2016-11-14","value":643331111,"movie":"Moana"},{"date":"2018-11-05","value":529323962,"movie":"Ralph Breaks the Internet"},{"date":"2019-11-07","value":756140237,"movie":"Frozen II"}];

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
};
// document.addEventListener('')

// var lineChartContent = 'sda'
function showFocus() {
    var button = document.getElementById('focuser');
    if (button.innerText == 'Focus') {
        dateAxis.start = 0.64;
        dateAxis.end = 0.93;
        button.innerText = 'Show';
    } else {
        dateAxis.start = 0;
        dateAxis.end = 1;
        button.innerText = 'Focus';
    }

    // button.
}


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
    chart.numberFormatter.numberFormat = "#.00 a($)";
    
    // Create axes
    dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{movie}"
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
    console.log(bullet.circle);
    
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
    
    dateAxis.start = 0;
    dateAxis.end = 1;
    dateAxis.keepSelection = true;
    
    
    }); // end am4core.ready()
});