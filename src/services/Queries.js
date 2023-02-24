export function addUser(name) {
  return fetch("http://192.168.40.245:5000/api/users/addUser", {
    body: JSON.stringify({
      name: name,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .catch((e) => {
      throw e;
    })
    .then((res) => {
      return res.json().then((val) => {
        console.log(val);
        return val;
      });
    });
}

export function getRecommendations(title) {
  return fetch(`http://192.168.40.245:5000/api/recommendations/${title}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .catch((e) => {
      throw e;
    })
    .then((res) => {
      return res.json().then((val) => {
        console.log(val);
        return val;
      });
    });
}

export function getUserID(uuid) {
  return fetch(`http://192.168.40.245:5000/api/recommendations/user/${uuid}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .catch((e) => {
      throw e;
    })
    .then((res) => {
      console.log(res);
      return res.json().then((val) => {
        console.log(val);
        return val;
      });
    });
}

export function getDistance(destinationPoint) {
  console.log(destinationPoint);
  console.log(
    JSON.stringify({
      starting_point: {
        latitude: 27.6756,
        longitude: 85.3459,
      },
      destination_point: destinationPoint,
    })
  );
  return fetch(`http://192.168.40.245:5000/api/distance`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      starting_point: {
        latitude: 27.7223208,
        longitude: 85.2724667,
      },
      destination_point: destinationPoint,
    }),
    method: "POST",
  })
    .catch((e) => {
      throw e;
    })
    .then((res) => {
      console.log(res);
      return res.json().then((val) => {
        console.log(val);
        return val;
      });
    });
}
