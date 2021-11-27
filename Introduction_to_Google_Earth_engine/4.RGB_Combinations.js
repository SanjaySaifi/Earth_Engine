//Add region of Interest
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
 //bands:['B4','B3','B2'],      //Natural colour: 4 3 2
 //bands:['B8','B4','B3'],      //False colour infrared: 8 4 3
 //bands:['B11','B8','B2'],      //Agriculture: 11 8 2
 //bands:['B12','B11','B8A'],      //Atmospheric penetration: 12 11 8A
 //bands:['B8','B11','B2'],      //Healthy vegetation: 8 11 2
 //bands:['B8','B11','B4'],      //Land/Water: 8 11 4
 //bands:['B12','B8','B3'],      //Natural colours with atmospheric removal: 12 8 3
 //bands:['B12','B8','B4'],      //Shortwave infrared: 12 8 4
 //bands:['B11','B8','B4'],      //Vegetation analysis: 11 8 4
 
};


//Center map to your region
Map.centerObject(region);

// Add clipped and filtered image layer to map
Map.addLayer(clip,viz,"RGB Combination");
