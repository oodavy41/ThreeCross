export function ecef2lla(x: number, y: number, z: number) {
  // WGS84 ellipsoid constants
  var a = 6378137; // semi-major axis
  var e = 8.1819190842622e-2; // first eccentricity
  var e2 = Math.pow(e, 2); // square of e

  // calculations
  var b = Math.sqrt(Math.pow(a, 2) * (1 - e2)); // semi-minor axis
  var ep = Math.sqrt((Math.pow(a, 2) - Math.pow(b, 2)) / Math.pow(b, 2)); // second eccentricity
  var p = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // distance from minor axis
  var th = Math.atan2(a * z, b * p); // angle between z-axis and normal to ellipsoid surface

  // output: geodetic latitude, longitude and altitude
  var lon = Math.atan2(y, x);
  var lat = Math.atan(
    (z + ep * ep * b * Math.pow(Math.sin(th), 3)) /
      (p - e2 * a * Math.pow(Math.cos(th), 3))
  );

  var N = a / Math.sqrt(1 - e2 * Math.sin(lat) * Math.sin(lat));
  var alt = p / Math.cos(lat) - N;

  return [(lat * 180) / Math.PI, (lon * 180) / Math.PI, alt];
}
export function lla2ecef(lat: number, lon: number, alt: number = 0) {
  // WGS84 ellipsoid constants
  var a = 6378137; // semi-major axis
  var e = 8.1819190842622e-2; // first eccentricity
  var e2 = Math.pow(e, 2); // square of e

  // calculations
  var cosLat = Math.cos((lat * Math.PI) / 180);
  var sinLat = Math.sin((lat * Math.PI) / 180);

  var N = a / Math.sqrt(1 - e2 * sinLat * sinLat);

  var x = (N + alt) * cosLat * Math.cos((lon * Math.PI) / 180);
  var y = (N + alt) * cosLat * Math.sin((lon * Math.PI) / 180);
  var z = (N * (1 - e2) + alt) * sinLat;

  return [x, y, z];
}
