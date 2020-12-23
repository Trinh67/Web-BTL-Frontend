var submitSendPostBt = document.getElementById('postSubmitBtnId');
var token ={
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsidHJ1b25nOTExMmsiLCJvd25lciJdLCJuYW1laWQiOiIzNCIsImVtYWlsIjoidGhoQGdtYWlsLmNvbSIsImp0aSI6IjIyNjM2MTkwLWVlZTktNDU0My1hMjg5LTY4NjFhOWZlMjk3ZCIsImV4cCI6MTYwODcyNDYzMywiaXNzIjoiaHV5dHJ1b25nLmNvbSIsImF1ZCI6Imh1eXRydW9uZy5jb20ifQ.X7Nn1p_Jc3sEKE-8wPRZdIEkCx_dojDT_RPmHpYU8wk"
}
submitSendPostBt.onclick = function () {
    console.log("aaa");
    SendPost('http://fcbtruong-001-site1.itempurl.com/api/Post/PostUp', token)
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
}


async function SendPost(url = '', token) {
    var infor =  {
        title: "Cho thue nha tro gan DHQG",
        address: "Ngo 10, Pham Van Dong, Cau Giay",
        lat: 30.12,
        lng: 40,
        price: 4000000,
        area: 40,
        district: 2,
        category: 1,
        phone: "0983838237",
        description: "Cho thue gia dan, tien nghi",
        utilities: [],
    }
    //console.log(JSON.stringify)
    var postForm = new FormData();
    postForm.append('postStr', JSON.stringify(infor));

    var files = document.getElementById("file-3").files;
    console.log(files[0].path);

    postForm.append('files', files[0]);
    // Display the key/value pairs
for(var pair of postForm.entries()) {
    console.log(pair[1]);
 }

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json;multipart/form-data',
            'Authorization': 'Bearer ' + token.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postForm // body data type must match "Content-Type" header
    });

    if(response.status == 200){
        console.log("Post successful");
    }
    else {
        console.log("Failed");
    };
    return response.json(); // parses JSON response into native JavaScript objects
}
