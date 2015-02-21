
function Submit(){
	var emailRegex = /^[A-Za-z0-9._]*\@[A-Za-z]*\.[A-Za-z]{2,5}$/;
	var fname = document.form.Name.value,
		lname = document.form.LastName.value,
		email = document.form.Email.value,
		confirmemail = document.form.enterEmail.value,
		password = document.form.Password.value,
		confirmpassword = document.form.ConfirmPassword.value
		
		
	if( fname == "" )
   {
     document.form.Name.focus() ;
	 document.getElementById("errorBox").innerHTML = "enter the first name";
     return false;
   }
	if( lname == "" )
   {
     document.form.LastName.focus() ;
	  document.getElementById("errorBox").innerHTML = "enter the last name";
     return false;
   }
   
   if (email == "" )
	{
		document.form.Email.focus();
		document.getElementById("errorBox").innerHTML = "enter the email";
		return false;
	 }else if(!emailRegex.test(email)){
		document.form.Email.focus();
		document.getElementById("errorBox").innerHTML = "enter the valid email";
		return false;
	 }
	 
	  if (confirmemail == "" )
	{
		document.form.enterEmail.focus();
		document.getElementById("errorBox").innerHTML = "Re-enter the email";
		return false;
	 }else if(!emailRegex.test(confirmemail)){
		document.form.enterEmail.focus();
		document.getElementById("errorBox").innerHTML = "Re-enter the valid email";
		return false;
	 }
	 
	 if(confirmemail !=  email){
		 document.form.enterEmail.focus();
		 document.getElementById("errorBox").innerHTML = "emails are not matching, re-enter again";
		 return false;
		 }
	 if(confirmpassword != password)
	 {
		 document.form.ConfirmPassword.focus();
		 document.getElementById("errorBox").innerHTML = "Password do not match!!";
		 return false;
	 }
	 
	if(password == "")
	 {
		 document.form.Password.focus();
		 document.getElementById("errorBox").innerHTML = "enter the password";
		 return false;
	 }
	 
		
		
		if(email != '' && confirmemail != '' && password != '' && confirmpassword != '' ){
			document.getElementById("errorBox").innerHTML = "form submitted successfully";
			}
		  
}

