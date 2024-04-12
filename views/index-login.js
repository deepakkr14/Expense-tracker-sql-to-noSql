let form = document.getElementById("form");
const p = document.querySelector("#message");
async function login(event) {
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3005/users/login", {
      email,
      password,
    });
    console.log('nadfndf d');
    console.log(response.data);
    if (response.status == 201) {
      localStorage.setItem("token",response.data.token)
      alert("Successfully logged in");
      window.location.href = './expense.html';
    }
  } catch (error) {
    console.log(error.response.data.message)
    alert(error.response.data.message);
  }
}
