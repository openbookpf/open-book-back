require("dotenv").config();
const request = require("request");
const axios = require("axios");

//*GET THE TOKEN TO ACCESS THE API
const getAccessToken = async () => {
  const options = {
    method: "POST",
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/oauth/token`,
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${process.env.AUTH_ZERO_API_CLIENT_ID}","client_secret":"${process.env.AUTH_ZERO_API_CLIENT_SECRET}","audience":"${process.env.AUTH_ZERO_API_CLIENT_AUDIENCE}","grant_type":"client_credentials"}`,
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body).access_token);
      }
    });
  });
};

//*GET ALL USERS REGISTERED ON AUTH0
const getAllUsersFromAuthZero = async () => {
  const accessToken = await getAccessToken();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/api/v2/users`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const allUsers = await axios
    .request(config)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  return allUsers;
};

//*CREATE AN USER ON AUTH0
const createUserInAuthZero = async (email_address, password) => {
  const accessToken = await getAccessToken();

  // const originalObject = {
  //   email: "derlisfernandeuopeople@gmail.com",
  //   user_metadata: {},
  //   blocked: false,
  //   email_verified: true,
  //   app_metadata: {},
  //   given_name: "Gus Fer",
  //   family_name: "string",
  //   name: "Gustavo Fernández",
  //   nickname: "DGFF",
  //   picture: "https://avatars.githubusercontent.com/u/129334567?v=4",
  //   user_id: "12351235136",
  //   connection: "openBookDatabase",
  //   password: "#pass0102",
  //   verify_email: true,
  // };

  let data = JSON.stringify({
    email: email_address,
    connection: "Username-Password-Authentication",
    password: password,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/api/v2/users`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  };

  const newUser = axios
    .request(config)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw new Error(error.response.data.message);
    });
  return newUser;
};

//*GET AN USER FROM AUTH0 BY ID
const getUserFromAuthZeroById = async (userId) => {
  const accessToken = await getAccessToken();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const userObtainedById = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

//*GET AN USER FROM AUTH0 BY ID
const deleteUserFromAuthZeroById = async (userId) => {
  const accessToken = await getAccessToken();

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const userDeletedById = await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

//*MODIFY USER FROM AUTH0 BY ID
const modifyUserInAuthZeroById = async (userId, updatedData) => {
  const accessToken = await getAccessToken();

  // const modelObject = {
  //   blocked: false,
  //   email_verified: false,
  //   email: "user@example.com",
  //   phone_number: "string",
  //   phone_verified: false,
  //   user_metadata: {},
  //   app_metadata: {},
  //   given_name: "string",
  //   family_name: "string",
  //   name: "string",
  //   nickname: "string",
  //   picture: "string",
  //   verify_email: false,
  //   verify_phone_number: false,
  //   password: "string",
  //   connection: "string",
  //   client_id: "string",
  //   username: "string",
  // };

  let data = JSON.stringify({ ...updatedData });

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `https://${process.env.AUTH_ZERO_API_DOMAIN}/api/v2/users/${userId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    });
};

module.exports = {
  createUserInAuthZero,
  modifyUserInAuthZeroById,
  getAllUsersFromAuthZero,
};
