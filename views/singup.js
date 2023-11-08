let form = document.getElementById("form");

const p = document.querySelector("#message");
async function singup(event) {
  event.preventDefault();
console.log('ima din fdfkdsafj')
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3005/users/singup", {
      name,
      email,
      password,
    });
    console.log(response.data);
    if (response.data.length > 0) {
      p.innerText = "Email already exists";
    } else {
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

