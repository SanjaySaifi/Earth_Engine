/Add region of Interest
var region = ee.FeatureCollection("users/ucanwhatsappme/Ghaziabad_shapefile");

// Add dataset
var data=ee.ImageCollection("COPERNICUS/S2");

//Filter Dataset
var image=ee.Image(data
                  .filterDate('2019-01-01','2019-12-31')
                  .filterBounds(region)
                  .sort('CLOUD_COVERAGE_ASSESSMENT')
                  .first());

// Clip the Dataset to your region
var clip=image.clip(region);

// Define visualization parameters
var viz={
  min:0,
  max:3000,
  bands:['B4','B3','B2']
};


//Center map to your region
Map.centerObject(region);

// Add image layer to map
Map.addLayer(clip,viz,"true color image");

// Define NDVI expression
var ndvi=clip.expression(
            "(NIR-RED)/(NIR+RED)",{
              NIR:clip.select('B8'),
              RED:clip.select('B4'),
            });
     

// Define visualization parameters for NDVI map
var viz2={
  min:0,
  max:1,
  palette:['red','orange','yellow','lightgreen','green'],
};

// Add NDVI image layer to map
Map.addLayer(ndvi,viz2,"NDVI image");

