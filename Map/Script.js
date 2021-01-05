const schools = [
  {
    "Name": "School №3",
    "Longitude": 30.4154724,
    "Latitude": 50.5092442
  },
  {
    "Name": "Спеціалізована школа №7 імені М.Т.Рильського з поглибленим вивченням англійської мови",
    "Longitude": 30.4841614,
    "Latitude": 50.4364206
  },
  {
    "Name": "School 8",
    "Longitude": 30.4550997,
    "Latitude": 50.4991041
  },
  {
    "Name": "School №9",
    "Longitude": 30.4583288,
    "Latitude": 50.5234971
  },
  {
    "Name": "School #11",
    "Longitude": 30.683271,
    "Latitude": 50.453644
  },
  {
    "Name": "Secondary school number 13",
    "Longitude": 30.3899747,
    "Latitude": 50.4257749
  },
  {
    "Name": "Gymnasium №19 «Mezhyhirska»",
    "Longitude": 30.515865,
    "Latitude": 50.467255
  },
  {
    "Name": "Oleksandr Bilash Specialized School #24",
    "Longitude": 30.445291,
    "Latitude": 50.472142
  },
  {
    "Name": "Secondary school №29",
    "Longitude": 30.463296,
    "Latitude": 50.521087
  },
  {
    "Name": "Спеціалізована школа І-ІІІ ступенів №44 з поглибленим вивченням англійської мови",
    "Longitude": 30.5078909,
    "Latitude": 50.4346742
  },
  {
    "Name": "#61 СПЕЦІАЛІЗОВАНА (З ПОГЛИБЛЕНИМ ВИВЧЕННЯМ ІНФОРМАЦІЙНИХ ТЕХНОЛОГІЙ) ШКОЛА",
    "Longitude": 30.4767902,
    "Latitude": 50.4644945
  },
  {
    "Name": "Спеціалізована школа №64",
    "Longitude": 30.44323,
    "Latitude": 50.426914
  },
  {
    "Name": "Specialized school №71",
    "Longitude": 30.449087,
    "Latitude": 50.4529134
  },
  {
    "Name": "School 80",
    "Longitude": 30.5359577,
    "Latitude": 50.4128556
  },
  {
    "Name": "Secondary School №93",
    "Longitude": 30.4298997,
    "Latitude": 50.5162114
  },
  {
    "Name": "School 104",
    "Longitude": 30.3581297,
    "Latitude": 50.541116
  },
  {
    "Name": "Спеціалізована школа І-ІІІ ступенів №110 імені К.Гапоненка з поглибленим вивченням французької мови",
    "Longitude": 30.5122867,
    "Latitude": 50.4054828
  },
  {
    "Name": "Secondary school №119",
    "Longitude": 30.5993478,
    "Latitude": 50.4999444
  },
  {
    "Name": "Спеціалізована школа І-ІІІ ступенів №120",
    "Longitude": 30.5878305,
    "Latitude": 50.4872981
  },
  {
    "Name": "Secondary school 140",
    "Longitude": 30.3559839,
    "Latitude": 50.4527087
  },
  {
    "Name": "Ліцей №144 ім. Григорія Ващенка",
    "Longitude": 30.4661904,
    "Latitude": 50.4220206
  },
  {
    "Name": "Kyiv Gymnasium №154",
    "Longitude": 30.4135728,
    "Latitude": 50.4584763
  },
  {
    "Name": "Спеціалізована школа №159 з поглибленим вивченням англійської мови",
    "Longitude": 30.4392676,
    "Latitude": 50.4412386
  },
  {
    "Name": "Середня загальноосвітня школа №166 м. Києва",
    "Longitude": 30.461767,
    "Latitude": 50.4368637
  },
  {
    "Name": "Gymnasium №172 \"Nivki\"",
    "Longitude": 30.4162287,
    "Latitude": 50.4693706
  },
  {
    "Name": "Specialized school №173",
    "Longitude": 30.4278472,
    "Latitude": 50.4261069
  },
  {
    "Name": "Secondary School #184",
    "Longitude": 30.6050018,
    "Latitude": 50.4890664
  },
  {
    "Name": "Specialized school №194 \"Perspective\"",
    "Longitude": 30.493239,
    "Latitude": 50.5176629
  },
  {
    "Name": "Secondary school № 201",
    "Longitude": 30.5998665,
    "Latitude": 50.4748465
  },
  {
    "Name": "Dominanta Educational Complex",
    "Longitude": 30.6152268,
    "Latitude": 50.4636819
  },
  {
    "Name": "Школа І-ІІІ ступенів №206 імені Леся Курбаса",
    "Longitude": 30.3799484,
    "Latitude": 50.4262968
  },
  {
    "Name": "33B",
    "Longitude": 30.6359981,
    "Latitude": 50.4870508
  },
  {
    "Name": "Specialized school #214",
    "Longitude": 30.4949908,
    "Latitude": 50.5082128
  },
  {
    "Name": "school №215",
    "Longitude": 30.3746226,
    "Latitude": 50.4368619
  },
  {
    "Name": "Specialized school №216",
    "Longitude": 30.5152766,
    "Latitude": 50.4941141
  },
  {
    "Name": "Specialized school №220",
    "Longitude": 30.4521342,
    "Latitude": 50.3793077
  },
  {
    "Name": "Школа №224",
    "Longitude": 30.5962606,
    "Latitude": 50.4908756
  },
  {
    "Name": "Secondary school №225",
    "Longitude": 30.4953183,
    "Latitude": 50.5060171
  },
  {
    "Name": "Secondary School #231",
    "Longitude": 30.487935,
    "Latitude": 50.513144
  },
  {
    "Name": "# 234 Specialized School",
    "Longitude": 30.5802377,
    "Latitude": 50.4911393
  },
  {
    "Name": "School #240",
    "Longitude": 30.5043916,
    "Latitude": 50.5173066
  },
  {
    "Name": "Secondary school №243",
    "Longitude": 30.434712,
    "Latitude": 50.499986
  },
  {
    "Name": "Specialized School #246",
    "Longitude": 30.5978461,
    "Latitude": 50.4910863
  },
  {
    "Name": "Secondary school number 249",
    "Longitude": 30.6029654,
    "Latitude": 50.5101572
  },
  {
    "Name": "Specialized school №252",
    "Longitude": 30.4938075,
    "Latitude": 50.5184375
  },
  {
    "Name": "Secondary school №256",
    "Longitude": 30.4882059,
    "Latitude": 50.5231831
  },
  {
    "Name": "Secondary school №264",
    "Longitude": 30.582205,
    "Latitude": 50.500514
  },
  {
    "Name": "Sukhomlynsky College",
    "Longitude": 30.5860251,
    "Latitude": 50.4569344
  },
  {
    "Name": "НВК Дошкільний навчальний заклад - школа І-ІІ ступенів №278",
    "Longitude": 30.5818213,
    "Latitude": 50.5115673
  },
  {
    "Name": "#282 СООШ",
    "Longitude": 30.623531,
    "Latitude": 50.515688
  },
  {
    "Name": "Secondary school №285",
    "Longitude": 30.4633043,
    "Latitude": 50.5159425
  },
  {
    "Name": "Спеціалізована школа І-ІІ ступенів з поглибленим вивченням природничих наук - ліцей №293",
    "Longitude": 30.623267,
    "Latitude": 50.527999
  },
  {
    "Name": "Спеціалізована школа І ступеня №312",
    "Longitude": 30.5864347,
    "Latitude": 50.5040368
  },
  {
    "Name": "High school \"Millennium\" №318",
    "Longitude": 30.4683951,
    "Latitude": 50.4161094
  },
  {
    "Name": "School 322",
    "Longitude": 30.6177954,
    "Latitude": 50.5141294
  },
  {
    "Name": "Спеціалізована школа I ступеня №324",
    "Longitude": 30.4383127,
    "Latitude": 50.440809
  },
  {
    "Name": "Happy Home School - приватна початкова школа",
    "Longitude": 30.5873444,
    "Latitude": 50.4609268
  },
  {
    "Name": "Альтернативна школа UNIC School",
    "Longitude": 30.7832595,
    "Latitude": 50.5175488
  },
  {
    "Name": "Midgard School",
    "Longitude": 30.4840152,
    "Latitude": 50.3785066
  },
  {
    "Name": "Академия Современного Образования А+",
    "Longitude": 30.6231206,
    "Latitude": 50.4347423
  },
  {
    "Name": "Himnaziya Prem'yer",
    "Longitude": 30.395125,
    "Latitude": 50.476326
  },
  {
    "Name": "Himnaziya \"Stolytsya\"",
    "Longitude": 30.5784218,
    "Latitude": 50.4907567
  },
  {
    "Name": "Specialized educational complex \"Lily\"",
    "Longitude": 30.3534829,
    "Latitude": 50.45737
  },
  {
    "Name": "Nvk Shkola-Dytyachyy Sadok \"Persha Lastivka\"",
    "Longitude": 30.5076073,
    "Latitude": 50.5017406
  },
  {
    "Name": "Gymnasium \"Potentsial\"",
    "Longitude": 30.5109181,
    "Latitude": 50.5181265
  },
  {
    "Name": "King's Kids",
    "Longitude": 30.5238142,
    "Latitude": 50.4012798
  },
  {
    "Name": "Pryvatna Shkola \"Yevropeysʹkyy Kolehium\"",
    "Longitude": 30.4881455,
    "Latitude": 50.3884052
  },
  {
    "Name": "Harmony, Lyceum",
    "Longitude": 30.6099027,
    "Latitude": 50.4620209
  },
  {
    "Name": "Початкова школа «Смартіка»",
    "Longitude": 30.4669773,
    "Latitude": 50.5504449
  },
  {
    "Name": "Private Elementary School and Kindergarten Clever Kids",
    "Longitude": 30.5127592,
    "Latitude": 50.5056689
  },
  {
    "Name": "Navchalʹno-Vykhovnyy Kompleks \"Yamb\"",
    "Longitude": 30.393304,
    "Latitude": 50.480363
  },
  {
    "Name": "Liko-School",
    "Longitude": 30.4615134,
    "Latitude": 50.3860868
  },
  {
    "Name": "Навчально-виховний комплекс \"Всезнайко\"",
    "Longitude": 30.4975315,
    "Latitude": 50.5198626
  },
  {
    "Name": "Lyceum “Intellect”",
    "Longitude": 30.6494266,
    "Latitude": 50.3971247
  }
];

const METERS_PER_MINUTE = 50;
const SCHOOL_CIRCLE_COLOR = '#FF0000';
const SUBWAY_CIRCLE_COLOR = '#0000FF';

const schoolPoints = [];
const schoolCircles = [];
const subwayPoints = [];
const subwayCircles = [];

let map;
let lines = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng(50.46828023527538, 30.50510629776751),
    mapTypeId: "terrain",
    mapTypeControl: false
  });

  let schoolCounter = 0;
  for (const school of schools) {
    schoolCounter++;
    const schoolPoint = new google.maps.LatLng(school.Latitude, school.Longitude);
    schoolPoints.push(schoolPoint);
    new google.maps.Marker({
      position: schoolPoint,
      map,
      title: school.Name,
      label: String(schoolCounter),
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    const circle = new google.maps.Circle({
      strokeColor: SCHOOL_CIRCLE_COLOR,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: SCHOOL_CIRCLE_COLOR,
      fillOpacity: 0.35,
      map,
      center: schoolPoint
    });
    schoolCircles.push(circle);
  }

  var request = {
    query: 'станция метро Киев',
    fields: ['name', 'geometry'],
  };
  
  var service = new google.maps.places.PlacesService(map);
  
  service.textSearch(request, function(places, status, pagination) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (const place of places) {
        const subwayPoint = place.geometry.location;
        new google.maps.Marker({
          position: subwayPoint,
          map,
          title: place.Name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        const circle = new google.maps.Circle({
          strokeColor: SUBWAY_CIRCLE_COLOR,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: SUBWAY_CIRCLE_COLOR,
          fillOpacity: 0.35,
          map,
          center: subwayPoint
        });
        subwayPoints.push(subwayPoint);
        subwayCircles.push(circle);
      }

      if (pagination.hasNextPage) {
        pagination.nextPage();
      } else {
        refresh();
      }
    }
  });

  map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('controls'));

  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let searchPlaceMarkers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    searchPlaceMarkers.forEach((marker) => {
      marker.setMap(null);
    });
    searchPlaceMarkers = [];

    for (const line of lines) {
      line.setMap(null);
    }
    lines = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((searchPlace) => {
      if (!searchPlace.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      const searchPlacePoint = searchPlace.geometry.location;
      const searchPlaceMarker = new google.maps.Marker({
        map,
        title: searchPlace.name,
        position: searchPlacePoint,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });
      searchPlaceMarkers.push(searchPlaceMarker);

      if (searchPlace.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(searchPlace.geometry.viewport);
      } else {
        bounds.extend(searchPlacePoint);
      }

      const closestSchool = drawLineToClosest(searchPlacePoint, schoolPoints, SCHOOL_CIRCLE_COLOR);
      const closestSubway = drawLineToClosest(searchPlacePoint, subwayPoints, SUBWAY_CIRCLE_COLOR);

      const infowindow = new google.maps.InfoWindow({
        content: `
<div>The closest <span class="school-title">school</span> is in <strong>${closestSchool.distanceInMinutes}</strong> minutes walking</div>
<div>The closest <span class="subway-title">subway</span> is in <strong>${closestSubway.distanceInMinutes}</strong> minutes walking</div>`,
      });

      infowindow.open(map, searchPlaceMarker);

      bounds.extend(closestSchool.point);
      bounds.extend(closestSubway.point);
    });
    map.fitBounds(bounds);
  });
}

const drawLineToClosest = (searchPlacePoint, points, color) => {
  let closestDistanceInMeters = Number.MAX_VALUE;
  let closestPoint;
  for (const point of points) {
    const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(searchPlacePoint, point);
    if (distanceInMeters < closestDistanceInMeters) {
      closestDistanceInMeters = distanceInMeters;
      closestPoint = point;
    }
  }

  const line = new google.maps.Polyline({
    path: [searchPlacePoint, closestPoint],
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  line.setMap(map);
  lines.push(line);

  return {
    point: closestPoint,
    distanceInMinutes: Math.ceil(closestDistanceInMeters / METERS_PER_MINUTE)
  };
};

function refresh() {
  const distanceToSchoolInMinutes = document.getElementById('distance-to-school-input').valueAsNumber
  for (const circle of schoolCircles) {
    circle.setRadius(distanceToSchoolInMinutes * METERS_PER_MINUTE);
  }

  const distanceToSubwayInMinutes = document.getElementById('distance-to-subway-input').valueAsNumber
  for (const circle of subwayCircles) {
    circle.setRadius(distanceToSubwayInMinutes * METERS_PER_MINUTE);
  }
}