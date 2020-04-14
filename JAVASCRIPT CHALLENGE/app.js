let tableData = data;

let tbody = d3.select("tbody");

tableData.forEach(function(ufos) {
    let row = tbody.append("tr");

    Object.entries(ufos).forEach(function([key,value]){
        let cell = tbody.append("td");
        cell.text(value);

    });

});

let submit = d3.select("#filter-btn");
let empty = d3.select("tbody")

submit.on("click", function() {
    empty.html("")
    d3.event.preventDefault();
    let Element = d3.select("#datetime");
    let Value = Element.property("value");

    let Databydate = tableData.filter(bydate => bydate.datetime ===Value);

    Databydate.forEach(function(filtered) {
        let row = tbody.append("tr");

        Object.entries(filtered).forEach(function([key,value]){
            let cell = tbody.append("td");
            cell.text(value);
        });
    });
});