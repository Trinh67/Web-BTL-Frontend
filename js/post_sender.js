var submitSendPostBt = document.getElementById('postSubmitBtnId');
var token = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsidHJ1b25nOTExMmsiLCJvd25lciJdLCJuYW1laWQiOiIzNCIsImVtYWlsIjoidGhoQGdtYWlsLmNvbSIsImp0aSI6ImUzZmEzM2NkLWJjZTUtNDY0NC04MWQyLTFhNzM4ZmNiMzEyMyIsImV4cCI6MTYwODcxODIwMSwiaXNzIjoiaHV5dHJ1b25nLmNvbSIsImF1ZCI6Imh1eXRydW9uZy5jb20ifQ.KTZiQPn-BUojrG4wQM-mAFDaAxCax1ok1-9wvzc49LM"
}
submitSendPostBt.onclick = function () {
    console.log("aaa");
    SendPost('http://fcbtruong-001-site1.itempurl.com/api/Post/PostUp', token)
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
}


async function SendPost(url = '', token) {
    var postForm = new FormData();
    postForm.append('postStr', {
        "title": "Cho thue nha tro gan DHQG",
        "address": "Ngo 10, Pham Van Dong, Cau Giay",
        "lat": 30.12,
        "lng": 40,
        "price": 4000000,
        "area": 40,
        "district": 2,
        "category": 1,
        "phone": "0983838237",
        "description": "Cho thue gia dan, tien nghi"
    });


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
