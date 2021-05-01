//Add map centre
Map.setCenter(76.2711, 10.8505, 5.9);
// Add image colloection
var collection = ee.ImageCollection("JAXA/GCOM-C/L3/OCEAN/CHLA/V1")
                  .select('CHLA_AVE')
                  .filterDate('2019-03-01', '2019-05-30');
// Add palette color
var BAND = {
  min: 0,
  max: 500,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'orange','red']
};

//Add map to console
Map.addLayer(collection.mean(), BAND, 'CHLOROPHYLL_A');
var image = collection.first()
print(image)
Map.addLayer(image, BAND, 'CHLOROPHYLL_A');
