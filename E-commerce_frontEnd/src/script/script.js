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
                userRole=response.data.user.role_id;
                token=response.data.authorization.token
                localStorage.setItem("userId", JSON.stringify(userId))
                localStorage.setItem("token",JSON.stringify(token))
                if(userRole==1){
                    window.location.href = "admin-dashboard.html"  
                }
                else if(userRole==2){
                    window.location.href = "dashboard.html"
                }
                 
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
pages.page_signup =() => {
    console.log("register new user");
    const firstName = document.getElementById("first_name")
    const lastName = document.getElementById("last_name")
    const mobileNum = document.getElementById("phone")
    const address = document.getElementById("address")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
   
    const errorFirst=document.querySelector(".error-first");
    const errorLast=document.querySelector(".error-last");
    const errorPhone=document.querySelector(".error-phone");
    const errorAdd=document.querySelector(".error-add");
    const errorMail=document.querySelector(".error-mail");
    const errorPass=document.querySelector(".error-pass");

    const btnClear=document.getElementById("clear")
    const btnSignUp=document.getElementById("signup")
    btnClear.addEventListener("click",()=>{
        firstName.value=" "
        lastName.value=" "
        mobileNum.value=" "
        address.value=" "
        emailInput.value=" "
        passwordInput.value=" "
    })
    btnSignUp.addEventListener("click",async(e)=>{
        e.preventDefault();
        if (firstName.value==="")
        {
            errorFirst.style.display="block";
        }
        else{
            errorFirst.style.display="none"
        }
        if (lastName.value==="")
        {
            errorLast.style.display="block";
        }
        else{
            errorLast.style.display="none";
        }
        if (mobileNum.value==="")
        {
            errorPhone.style.display="block";
        }
        else{
            errorPhone.style.display="none";
        }
        if (address.value==="")
        {
            errorAdd.style.display="block";
        }
        else{
            errorAdd.style.display="none";
        }
        if (emailInput.value==="")
        {
            errorMail.style.display="block";
        }
        else{
            errorMail.style.display="none";
        }
        if (passwordInput .value==="")
        {
            errorPass.style.display="block";
        }
        else{
            errorPass.style.display="none";
        }

        const data = new FormData()
        data.append("first_name", firstName.value)
        data.append("last_name",lastName.value)
        data.append("phone",mobileNum.value)
        data.append("address",address.value)
        data.append("email",emailInput.value)
        data.append("password",passwordInput.value)
        data.append("role_id",2)
        const response = await axios.post(pages.base_url + "register", data);
        console.log(response.data);   
        window.location.href = "index.html"       
    })  
}
pages.page_buyer_dashboard =async() => {
    userId=localStorage.getItem("userId")
    console.log("dashboard of the buyer with id :",userId)
    const categoryList=document.querySelector(".category-list-container")
    const response = await axios("http://localhost:8000/api/get_categories");
    console.log(response.data);
    const categories = response.data.categories;
    const categoriesID=[]
    

    console.log(categories)       
    categories.forEach(category => {
        categoryList.innerHTML+=`<div id =${category.id} class="single_cat">                                   
                                    ${category.name}
                                 </div>`; 
        categoriesID.push(category.id);       
                                })

    const catDivs = Array.from(document.getElementsByClassName('single_cat'))
    for(let i=0; i<catDivs.length;i++){
        catDivs[i].addEventListener('click',showProductOfCategory)
    }
    const productsContainer=document.querySelector(".prod-container")
    const prodsID=[]
    async function showProductOfCategory(e){
        const cId=e.target.id
        categoryData=new FormData()
        categoryData.append("category_id",cId)
        console.log("clicked category of id: ",cId)
        const responseProductPerCategory = await axios.post(pages.base_url + "product_per_category", categoryData);
        console.log(responseProductPerCategory.data.products)
        console.log("done")

        prods=responseProductPerCategory.data.products;
        prods.forEach(product => {
            const imageUrl = "http://localhost:8000/storage/" + product.image_data;
            const image = document.createElement('img');
            image.src = imageUrl
            image.alt = 'product';
            const prod=document.querySelector(".prod")
            
            productsContainer.innerHTML+=`
                                    <div class="prod" id=${product.id}>
                                    <img src="${imageUrl}" alt="home">
                                        <span class="prod-name">${product.name}</span>
                                        <div class="details">
                                            <div class="content-prod">
                                                <div class="prod-details">
                                                    <div>
                                                        <img src="${imageUrl}" alt="">
                                                    </div>
                                                    <div class="details-content">                                                        
                                                        <h4>${product.name}</h4>
                                                        <span> <h3>$ ${product.price}</h3></span>
                                                        <p>${product.description}</p>
                                                    </div>
                                                </div>  
                                                <div class="action">
                                                    <button class="cart" id="${product.id}">ADD TO CART</button>
                                                    <button class="fav" id="${product.id}">
                                                        <i class="fa fa-heart fa-2x"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `; 
            prodId=product.id
            
            // btnAdd.addEventListener("click",async()=>{
            //     const data = new FormData()
            //     data.append("user_id", userId)
            //     data.append("product_id", prodId)
            //     console.log(userId,prodId)
                // const response2 = await axios.post(pages.base_url + "change_password", data2);
                // console.log(response2.data.state);
            // })
            // const btnFav=document.getElementById("btnAddFav")


            prodsID.push(product.id);       
        })
        console.log(prodsID)
        const cartBtn = Array.from(document.getElementsByClassName('cart'))
        for(let i=0; i<cartBtn.length;i++){
        cartBtn[i].addEventListener('click',addProdToCart)
        }

        async function addProdToCart(e){ 
            const pId=e.target.id              
            const data = new FormData()
            data.append("user_id", userId)
            data.append("product_id", pId)
            console.log("user of id: ",userId," added product of product_id: ",pId," to the cart")
            const response = await axios.post(pages.base_url + "add_to_cart", data);
            console.log(response.data);
        }
        const favBtn = Array.from(document.getElementsByClassName('fav'))
        for(let i=0; i<favBtn.length;i++){
            favBtn[i].addEventListener('click',addProdToFav)
            }
    
        async function addProdToFav(e){ 
            const pId=e.target.id    
            console.log(pId)          
            const data = new FormData()
            data.append("user_id", userId)
            data.append("product_id", pId)
            console.log("user of id: ",userId," favorited the product of product_id: ",pId)
            const response = await axios.post(pages.base_url + "addToFav", data);
            console.log(response.data);
        }
    }
}




