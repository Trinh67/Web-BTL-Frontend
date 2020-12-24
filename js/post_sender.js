var submitSendPostBt = document.getElementById('postSubmitBtnId');

// Kiểm tra dữ liệu đầy đủ chưa
function check(){
  // Kiểm tra dữ liệu đã được điền đủ chưa
  for(let i = 0; i < $('.required').length; i++) {
    if($('.required')[i].value == false) {alert('Bạn phải điền đủ thông tin bắt buộc'); return false;}
  }
  // Kiểm tra đã đủ 3 ảnh chưa
  var fileInput = document.getElementById("file-3").files;
  if(fileInput.length < 3) {alert('Bạn phải chọn ít nhất 3 ảnh phòng trọ'); return false;}; 
  return true;
}


// Thực hiện truy vấn
submitSendPostBt.onclick = function () {
  if(check() == true){
    // Lấy danh sách tiện ích
  var array = [];
  $("input:checkbox[name=utility-item]:checked").each(function() { 
      array.push($(this).val()); 
  }); 

  // Tạo mẫu dữ liệu
  var infor =  {
    title: document.querySelector('input[name=title]').value,
    address: document.querySelector('input[name=address]').value,
    lat: document.querySelector('input[name=lat]').value,
    lng: document.querySelector('input[name=lng]').value,
    price: document.querySelector('input[name=price]').value,
    area: document.querySelector('input[name=area]').value,
    district: document.querySelector('select[name=district]').value,
    category: document.querySelector('select[name=category]').value,
    phone: document.querySelector('input[name=phone]').value,
    utilities: array,
    otherUtilities: document.querySelector('textarea[name=other-utility]').value,
    description: document.querySelector('textarea[name=description]').value,
    servicePackage: document.querySelector('select[name=servicePackage]').value,
    serviceTime: document.querySelector('input[name=serviceTime]').value,
  }
  // Tạo Headers
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsidHJ1b25nOTExMmsiLCJvd25lciJdLCJuYW1laWQiOiIzNCIsImVtYWlsIjoidGhoQGdtYWlsLmNvbSIsImp0aSI6ImVlZGRmMWZlLTBjYTktNGU4Mi04ZTZmLWFiMmJiOWQxNWE4ZCIsImV4cCI6MTYwODc1MzgwNSwiaXNzIjoiaHV5dHJ1b25nLmNvbSIsImF1ZCI6Imh1eXRydW9uZy5jb20ifQ.q42LBx3q_FWf3LGD1MO2YvAGr2WkDA2ye-VIZXaWo7k");
  var fileInput = document.getElementById("file-3").files;

  var formdata = new FormData();
  formdata.append("postStr", JSON.stringify(infor));
  formdata.append("files", fileInput[0]);
  formdata.append("files", fileInput[1]);
  formdata.append("files", fileInput[2]);
  
  for(var pair of formdata.entries()) {
    console.log(pair[0] + ": " +pair[1]);
  }
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  fetch("http://fcbtruong-001-site1.itempurl.com/api/Post/PostUp", requestOptions)
    .then(response => {response.text();SuccessMessage();})
    .then(result =>
      console.log(result)
    )
    .catch(error => {console.log('error', error);WarningMessage()});
  
  }
  else {alert('Lỗi bài đăng')};
}

// Thông báo đăng bài thành công
function SuccessMessage() {
  $('#alertSuccess').show();
  $('#alertWarning').hide();
}

// Thông báo đăng bài bị lỗi
function WarningMessage() {
  $('#alertWarning').show();
  $('#alertSuccess').hide();
}

//Load lại trang khi đăng thành công
$('#successNotifition').click(function(){
  location.reload();
})


