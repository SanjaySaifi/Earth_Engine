// Select and add dataset Sentinel-2 MSI: MultiSpectral Instrument, Level-2A
var image = ee.ImageCollection("COPERNICUS/S2_SR")
             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
             .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
             .filter(ee.Filter.bounds(region))
             .select('B.*')
// clip the data to region of interest
var clip = image.median().clip(region) 

// Display the input composite.
var band = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(clip, band, 'True Color Image');

var gcps = urban.merge(bare).merge(water).merge(vegetation)

// Overlay the point on the image to get training data.
var training = clip.sampleRegions({
  collection: gcps, 
  properties: ['landcover'], 
  scale: 10
});


// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,  
  classProperty: 'landcover', 
  inputProperties: clip.bandNames()
});
// // Classify the image.
var classified = clip.classify(classifier);
Map.addLayer(classified, {min: 0, max: 3, palette: ['red', 'yellow', 'blue', 'yellowgreen']}, 'Classified'); 








