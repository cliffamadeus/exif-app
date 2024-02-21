function imginput1(input1) {
  var img1 = document.getElementById("img1");
  const reader = new FileReader();
  reader.onload = (e) => {
    img1.src = e.target.result;
  };
  reader.readAsDataURL(input1.files[0]);

  EXIF.getData(input1.files[0], function () {
    var gps1la =
      input1.files[0].exifdata.GPSLatitude[0] +
      input1.files[0].exifdata.GPSLatitude[1] / 60 +
      input1.files[0].exifdata.GPSLatitude[2] / 3600;
    var gps1lo =
      input1.files[0].exifdata.GPSLongitude[0] +
      input1.files[0].exifdata.GPSLongitude[1] / 60 +
      input1.files[0].exifdata.GPSLongitude[2] / 3600;
    document.getElementById("gps1la").innerHTML = `${gps1la}`;
    document.getElementById("gps1lo").innerHTML = `${gps1lo}`;
  });
}

function imginput2(input2) {
  var img2 = document.getElementById("img2");
  const reader = new FileReader();
  reader.onload = (e) => {
    img2.src = e.target.result;
  };
  reader.readAsDataURL(input2.files[0]);

  EXIF.getData(input2.files[0], function () {
    var gps2la =
      input2.files[0].exifdata.GPSLatitude[0] +
      input2.files[0].exifdata.GPSLatitude[1] / 60 +
      input2.files[0].exifdata.GPSLatitude[2] / 3600;
    var gps2lo =
      input2.files[0].exifdata.GPSLongitude[0] +
      input2.files[0].exifdata.GPSLongitude[1] / 60 +
      input2.files[0].exifdata.GPSLongitude[2] / 3600;
    document.getElementById("gps2la").innerHTML = `${gps2la}`;
    document.getElementById("gps2lo").innerHTML = `${gps2lo}`;
  });
}

function calgps() {
  document.getElementById("calgps").innerHTML = getDistanceFromLatLonInKm(
    gps1la.textContent,
    gps1lo.textContent,
    gps2la.textContent,
    gps2lo.textContent
  );
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var EARTH_R, Rad, radLat1, radLat2, radDist;
  var distance, ret;
  EARTH_R = 6371000.0;
  Rad = Math.PI / 180;
  radLat1 = Rad * lat1;
  radLat2 = Rad * lat2;
  radDist = Rad * (lon1 - lon2);
  distance = Math.sin(radLat1) * Math.sin(radLat2);
  distance =
    distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
  ret = EARTH_R * Math.acos(distance);
  var rtn = Math.round(Math.round(ret) / 1000);
  rtn =
    Math.round(ret)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " m";
  return rtn;
}