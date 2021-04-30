//Navigate to area of interest
Map.setCenter(78,28, 8);

//Select region of interest( Can be selected in map console )
var veg =ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[77.99648100267223, 28.00077195234383],
                  [77.99648100267223, 27.998981553301306],
                  [77.99828344713023, 27.998981553301306],
                  [77.99828344713023, 28.00077195234383]]], null, false),
            {
              "label": "vegetation ",
              "system:index": "0"
            })]);
           
//Add MODIS image collection
var index = ee.ImageCollection('MODIS/006/MOD13A1')
                     .filter(ee.Filter.date('2017-01-01', '2017-12-31'))
                     .filterBounds(veg)
                     .select(['NDVI']);
// Generate NDVI chart
var chart = ui.Chart.image
                .doySeriesByRegion({
                  imageCollection: index,
                  bandName: 'NDVI',
                  regions: veg,
                  regionReducer: ee.Reducer.mean(),
                  scale: 500,
                  yearReducer: ee.Reducer.mean(),
                  seriesProperty: 'label',
                  startDay: 1,
                  endDay: 365
                })
                .setOptions({
                  title: 'Average NDVI Value by Day of Year',
                  hAxis: {
                    title: 'Day of year',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  vAxis: {
                    title: 'NDVI (x1e4)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  lineWidth: 5,
                  colors: ['#01fa0e'],
                });
print(chart);
