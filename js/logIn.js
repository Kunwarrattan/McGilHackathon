
function Check(){
	var email = document.loginform.Email.value,
		password = document.loginform.Password.value;
	   
	if(email== 'b@mail.com')
		window.open('Home.html')
	
	if(email== '' || password == '')
		document.getElementById("errorBox").innerHTML = "One of the fields is blank!";
	else
		document.getElementById("errorBox").innerHTML = "Username or Password do not match!";
	
}