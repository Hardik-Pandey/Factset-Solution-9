const headers = ['SL', 'Date', 'Diagnosis', 'Weight', 'Doctor'];

function showDetails(e) {
    if(e.value != -1) {
        document.getElementById("loader-view").style.display = "block";
        const url = 'https://jsonmock.hackerrank.com/api/medical_records?userId=' + e.value;
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            document.getElementById("loader-view").style.display = "none";
            let records = data;
            // console.log(records);

            document.getElementById("patient-name").innerHTML = records.data[e.value].userName;
            document.getElementById("patient-dob").innerHTML = "DOB: " + records.data[e.value].userDob;
            document.getElementById("patient-height").innerHTML = "Height: " + records.data[e.value].meta.height;
            
            document.getElementById("table-head-row").innerHTML = "";
            for(var i = 0; i < headers.length; i++) {
                document.getElementById("table-head-row").innerHTML += "<th>" + headers[i] + "</th>";
            }

            document.getElementById("table-body").innerHTML = "";            
            var arr = records.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            for(var i = 0; i < arr.length; i++) {
                var d = new Date(arr[i].timestamp);
                document.getElementById("table-body").innerHTML += 
                "<tr><td>" + arr[i].id + "</td>" + 
                "<td>" + d.getDate() +'/' + (d.getMonth() + 1) + '/' + d.getFullYear() + "</td>" +
                "<td>" + arr[i].diagnosis.name + "</td>" +
                "<td>" + arr[i].meta.weight + "</td>" +
                "<td>" + arr[i].doctor.name + "</td></tr>";
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
}
