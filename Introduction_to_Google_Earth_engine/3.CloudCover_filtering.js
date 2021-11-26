//Import shapefile
var region = ee.FeatureCollection("users/ucanwhatsappme/Ghaziabad_shapefile");


// Add dataset
var data=ee.ImageCollection("COPERNICUS/S2");

//Filter Dataset
var filter=data.filterDate('2020-01-01','2020-12-31')
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));;

// Clip the Dataset to your region
var clip=filter.mean().clip(region);


// Apply visualization parameters
// Reflectance values for Sentinel-2 products range from 0 to 3000
// Bands 4,3,2 represent Red, Green, Blue respectively
var viz={
  min:0,
  max:3000,
  bands:['B4','B3','B2'],
};


//Center map to your region
Map.centerObject(region);

// Add clipped and filtered image layer to map
Map.addLayer(clip,viz,"True Color Image");
