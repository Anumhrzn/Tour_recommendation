import { API_URL } from "@env";
const apiUrl = process.env.API_URL;
console.log({ apiUrl });

// fetch(API_URL + '/users')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

export async function addUser(name, password) {
  try {
    const res = await fetch(`${apiUrl}/users/addUser`, {
      body: JSON.stringify({
        name: name,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status == 200) {
      return "Success";
    }
    return null;
  } catch (e) {
    throw e;
  }
}

export async function loginUser(name, password) {
  try {
    const res = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        name: name,
        password: password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status == 200) {
      return "Success";
    }
    return null;
  } catch (e) {
    throw e;
  }
}

export function getRecommendations(title) {
  return fetch(`${apiUrl}/recommendations/${title}`, {
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
  return fetch(`${apiUrl}/recommendations/user/${uuid}`, {
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
  return fetch(`${apiUrl}/distance`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      starting_point: {
        latitude: 27.6756,
        longitude: 85.3459,
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

export function addUserRating(userRating) {
  debugger;
  console.log({ userRating });
  return fetch(`${apiUrl}/rating/addUserRating`, {
    body: JSON.stringify(userRating),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => {
      return res.json().then((val) => {
        console.log(val);
        return val;
      });
    })
    .catch((error) => {
      throw error;
    });
}

export function getRatingsByPlaceName(placeName) {
  return fetch(`${apiUrl}/rating/getPlacesRating?place=${placeName}`, {
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
