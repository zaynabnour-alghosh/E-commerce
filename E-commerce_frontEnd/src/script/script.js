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
                    window.location.href = "dashboard.html"           }    
        }
    });
}
