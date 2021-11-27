// Define the region of interest
var region =ee.Geometry.Polygon(
        [[[77.42840040326975, 28.710057782656666],
          [77.42840040326975, 28.667140056380816],
          [77.4889968693342, 28.667140056380816],
          [77.4889968693342, 28.710057782656666]]], null, false);

//Import and filter the data
var data=ee.ImageCollection("COPERNICUS/S2")
            .filterDate('2019-01-01','2019-12-31');
 
// Mean the dataset
var input=data.mean();

// Clip the dataset to the region of interest
var clip=input.clip(region);

//Center the map
Map.centerObject(region);

// make a taining dataset
var training=clip.sample({
  region:region,
  scale:30,
  numPixels:5
});


//Initiate the clusterer
var clusterer=ee.Clusterer.wekaKMeans(15).train(training);

// cluster the input
var output=clip.cluster(clusterer);

// Add clustered layer to map
Map.addLayer(output.randomVisualizer(),{},'Unsuspervised Clusters');




