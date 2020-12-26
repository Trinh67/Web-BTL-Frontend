var submitSendPostBt = document.getElementById('postSubmitBtnId');

// Kiểm tra dữ liệu đầy đủ chưa
function check(){
  // Kiểm tra dữ liệu đã được điền đủ chưa
  for(let i = 0; i < $('.required').length; i++) {
    if($('.required')[i].value == false) {alert('Bạn phải điền đủ thông tin bắt buộc'); return false;}
  }
  // Kiểm tra số điện thoại
  const paragraph = document.getElementById('phoneNumber').value;
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const found = paragraph.match(regex);
  if(found === null) {alert('Số điện thoại đang trống hoặc không đúng '); return false;}; 
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
      array.push(parseInt($(this).val())); 
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
  myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
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
    .then(response => {response.text();SuccessMessage();alert('Đăng bài thàng công! Bài đăng đang chờ duyệt!')})
    .catch(error => {console.log('error', error);WarningMessage();alert('Đăng bài thất bại!');});
  
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


