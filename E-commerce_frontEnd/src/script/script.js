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