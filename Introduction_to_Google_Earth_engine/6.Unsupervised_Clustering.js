var geometry = ee.Geometry.Polygon(
        [[[77.43320692182444, 28.707724113129178],
          [77.43320692182444, 28.680017221313314],
          [77.47294653058908, 28.680017221313314],
          [77.47294653058908, 28.707724113129178]]], null, false);

var data=ee.ImageCollection("COPERNICUS/S2")
              .filterDate('2019-01-01','2019-12-12');
var input = data.mean();

var clip=input.clip(region);
Map.centerObject(region, 9);
Map.addLayer(clip);
//Map.addLayer(clip.paint(region, 0, 2), {}, 'region');

// Make the training dataset.
var training = clip.sample({
  region: region,
  scale: 30,
  numPixels: 5
});

// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);

// Cluster the input using the trained clusterer.
var result = clip.cluster(clusterer);

// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters');
