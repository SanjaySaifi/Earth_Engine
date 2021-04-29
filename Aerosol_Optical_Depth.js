var water = ee.Geometry.Polygon(
  [[[70.1456, 24.0454],
    [70.1458, 24.0454],
    [70.1458, 24.0456],
    [70.1456, 24.0456]]],
  null, false
);

var collection = ee.ImageCollection("COPERNICUS/S3/OLCI")
                  .select('Oa02_radiance')
                  .filterBounds(water)
                  .filterDate('2019-10-01', '2019-12-31');

var band_viz = {
  min: 0,
  max: 500,
  palette: ['black', 'cyan', 'blue', 'yellow','red']
};

Map.addLayer(collection.mean(), band_viz, 'Oa02_radiance');
Map.setCenter(70.1456, 24.0454, 8);
