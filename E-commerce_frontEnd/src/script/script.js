const pages = {}

pages.base_url = "http://localhost:8000/api/";

pages.print_message = (message) => {
    console.log(message);
}
pages.getAPI = async(url) => {
    try {
        return await axios(url)
    } catch (error) {
        pages.print_message("Error from GET API: " + error)
    }
}

pages.postAPI = async(api_url, api_data) => {
    try {
        return await axios.post(api_url, api_data);
    } catch (error) {
        pages.print_message("Error from Linking (POST)" + error)
    }
}
pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}

pages.page_index = () => {
    console.log('sign in')
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const btnSignIn=document.getElementById('btnSignin')
    const errorMail=document.querySelector(".error-mail")
    const errorPass=document.querySelector(".error-pass")
    btnSignIn.addEventListener("click",async()=>{
        if (emailInput.value==="" ||passwordInput.value===""){
            console.log("empty inputs")
            errorMail.style.display="block";
            errorPass.style.display="block";
        }
        else if(emailInput!=="" ||passwordInput!==""){
            errorMail.style.display="none";
            errorPass.style.display="none";
            // console.log(emailInput.value,passwordInput.value);
        
            console.log('clicked')
            const email = emailInput.value;
            const pass = passwordInput.value;
            const data = new FormData()
            data.append("email", email)
            data.append("password", pass)
            const response = await axios.post(pages.base_url + "login", data);
            // console.log(response.data);
            if(response.data){
                userId=response.data.user.id;
                token=response.data.authorization.token
                localStorage.setItem("userId", JSON.stringify(userId))
                localStorage.setItem("token",JSON.stringify(token))
                window.location.href = "dashboard.html" 
            }    
        }
    });
    
}
pages.page_forget_pass =() => {
    console.log("forget password");
    const emailInput = document.getElementById("email")
    const errorMail=document.querySelector(".error-mail")
    const password=document.getElementById("password")
    const confirmPassword=document.getElementById("c-password")
    const btnChange=document.getElementById("change")
    const errorPwd=document.querySelector(".error-pwd")
    const errorCPwd=document.querySelector(".error-c-pwd")
    const errorConfirm=document.querySelector(".error-confirm")
    emailInput.addEventListener("mouseleave",async()=>{
        if (emailInput.value===""){
            errorMail.style.display="block";
    } else if(emailInput!==""){
        errorMail.style.display="none";
        const email = emailInput.value;
        const data = new FormData()
        data.append("email", email)
        const response = await axios.post(pages.base_url + "check_user", data);
        console.log(response.data.status);
        if(response.data.status=="success"){
            password.removeAttribute("disabled","disabled");
            confirmPassword.removeAttribute("disabled","disabled")
            btnChange.addEventListener("click",async()=>{
                if(password.value==="" ||confirmPassword.value===""){
                    errorPwd.style.display="block";
                    errorCPwd.style.display="block";
                }
                else{
                    errorPwd.style.display="none";
                    errorCPwd.style.display="none";
                }                
                if(password.value!==confirmPassword.value){
                    errorConfirm.style.display="block";
                }
                else{                    
                    errorConfirm.style.display="none";
                }
                const pwd=password.value
                const data2 = new FormData()
                data2.append("email", email)
                data2.append("password",pwd)
                const response2 = await axios.post(pages.base_url + "change_password", data2);
                console.log(response2.data.state);
                window.location.href = "index.html"
            })  
        }    
    }
})
    

    }


