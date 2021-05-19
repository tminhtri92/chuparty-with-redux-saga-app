import netlifyIdentity from "netlify-identity-widget";

export async function getData(mypath = "") {
  let user = netlifyIdentity.currentUser();
  let token = user.token.access_token;
  var url = "/.netlify/git/github/contents/" + mypath;
  var bearer = "Bearer " + token;

  return fetch(url, {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      if (data.code == 400) {
        netlifyIdentity.refresh().then(function (token) {
          getData(mypath);
        });
      } else {
        // base64 decode content
        data.content = atob(data.content);
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
}

export async function saveData(mypath, data) {
  return getData(mypath).then(function (curfile) {
    let user = netlifyIdentity.currentUser();
    let token = user.token.access_token;
    let opts = {
      path: mypath,
      message: "initial commit",
      content: btoa(data),
      branch: "master",
      committer: { name: "Dashpilot", email: "support@dashpilot.com" },
    };
    if (typeof curfile !== "undefined") {
      opts.sha = curfile.sha;
    }

    const url = "/.netlify/git/github/contents/" + mypath;
    const bearer = "Bearer " + token;
    return fetch(url, {
      body: JSON.stringify(opts),
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.code == 400) {
          netlifyIdentity.refresh().then(function (token) {
            saveData(mypath);
          });
        } else {
          return data;
        }
      })
      .catch((error) =>
        console.log({
          message: "Error: " + error,
        })
      );
  });
}

export async function saveDataImage(mypath, data) {
  return getData(mypath).then(function (curfile) {
    let user = netlifyIdentity.currentUser();
    let token = user.token.access_token;
    let opts = {
      path: mypath,
      message: "initial commit",
      content: data,
      branch: "master",
      committer: { name: "Dashpilot", email: "support@dashpilot.com" },
    };
    if (typeof curfile !== "undefined") {
      opts.sha = curfile.sha;
    }

    const url = "/.netlify/git/github/contents/" + mypath;
    const bearer = "Bearer " + token;
    return fetch(url, {
      body: JSON.stringify(opts),
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.code == 400) {
          netlifyIdentity.refresh().then(function (token) {
            saveDataImage(mypath);
          });
        } else {
          return data;
        }
      })
      .catch((error) =>
        console.log({
          message: "Error: " + error,
        })
      );
  });
}

export async function saveDataJSON(mypath, data) {
  return getData(mypath).then(function (curfile) {
    let user = netlifyIdentity.currentUser();
    let token = user.token.access_token;
    let opts = {
      path: mypath,
      message: "initial commit",
      content: btoa(JSON.stringify(data)),
      branch: "master",
      committer: { name: "Dashpilot", email: "support@dashpilot.com" },
    };
    if (typeof curfile !== "undefined") {
      opts.sha = curfile.sha;
    }

    const url = "/.netlify/git/github/contents/" + mypath;
    const bearer = "Bearer " + token;
    return fetch(url, {
      body: JSON.stringify(opts),
      method: "PUT",
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.code == 400) {
          netlifyIdentity.refresh().then(function (token) {
            saveDataJSON(mypath);
          });
        } else {
          return data;
        }
      })
      .catch((error) =>
        console.log({
          message: "Error: " + error,
        })
      );
  });
}
