import fetch from "node-fetch";
import { API_URL } from "./db_access.js";

let user = {
  email: "admin@admin.com",
  password: "Admin1",
  fullName: "Иван Иванов",
  dateOfBirth: "1998-12-11",
  gender: "male",
  country: "US",
  receiveMail: true,
  role: "admin",
};
// console.log(user);
async function testFetch() {
  // let newUserResponse = await fetch(`${API_URL}/users`, {
  //   method: "POST",
  //   body: JSON.stringify(user),
  //   headers: { "Content-type": "application/json" },
  // });

  let response = await fetch(`${API_URL}/products`, {
    method: "GET",
  });
  let responseBody = await response.json();
  console.log(responseBody);

  response = await fetch(
    `${API_URL}/orders?isPaymentCompleted=true&productId=2`,
    {
      method: "GET",
    }
  );
  responseBody = await response.json();
  console.log(responseBody);
}

testFetch();
