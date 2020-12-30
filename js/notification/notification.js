loginToken = window.localStorage.getItem("token");
const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://fcbtruong-001-site1.itempurl.com/api/pushNotification",
    {accessTokenFactory: () => loginToken}) //http://fcbtruong-001-site1.itempurl.com/api/pushNotification
    .build();


connection.qs = { 'access_token': loginToken}
async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        console.log(connection.connectionId);
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.on("publicMessageMethodName", (message) =>
{
   console.log(message );
});

connection.on("privateAdminNotify", (message) => 
{
    alert(message);
    console.log(message);
});

connection.onclose(start);

// Start the connection.
start();

/*
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/3.1.7/signalr.min.js"></script>
    <script src="notification.js" ></script>
    */