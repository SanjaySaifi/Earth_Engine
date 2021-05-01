//Monthly Precipitation
//Set map centre and zoom level
Map.setCeneter(78, 27.71, 4);
//Select region of interest
var roi =ee.Geometry.Polygon(
        [[[68.77198326587677, 36.47997496572878],
          [68.77198326587677, 8.609717099778186],
          [97.07276451587677, 8.609717099778186],
          [97.07276451587677, 36.47997496572878]]], null, false);

//Select data
var image = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
                  .filterDate('2020-01-01', '2020-12-31')
                  .select('precipitation');
//clip data to roi
var clip = image.mean().clip(roi);                  
                  
//add palette colors
var band = {
  min: 0.0,
  max: 112.0,
  palette: ['#ec450c','red' ,'orange', 'yellow', 'green','darkgreen','#71bd4e', 'blue','darkblue','purple','black'],
};

//Add map to console
Map.addLayer(clip, band, 'Precipitation');

//Generate chart for monthly precipitation
var chart = ui.Chart.image.series(image, roi, ee.Reducer.mean(),1000, 'system:time_start')
              .setOptions({
              title: 'Precipitation in India from ',
              vAxis: {title: 'mm/pentad'}, });
print(chart);
