d3.csv("data.csv", function (error, data) {

    let margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xValue = function (d) { return + d.poverty; },
        xScale = d3.scale.linear().range([0, width]),
        xMap = function (d) { return xScale(xValue(d)); },
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    let yValue = function (d) { return + d.healthcare; },
        yScale = d3.scale.linear().range([height, 0]),
        yMap = function (d) { return yScale(yValue(d)); },
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    data.forEach(function (d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.obesity = +d.obesity;
    });

    xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
    yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 0)
        .style("text-anchor", "end")
        .text("In Poverty (%)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Lacks Healthcare (%)");

    let enter1 = svg.selectAll(".dot")
        .data(data)
        .enter();
    enter1.append("circle")
        .attr("class", "dot")
        .attr("r", 15)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .attr("cx", xMap)
        .attr("cy", yMap)
        .on("mouseover", function (d) {
            tooltip.transition()
                .style("opacity", "0.9");

            tooltip.html(d["state"] + "<br/> " + "Poverty:" + " " + xValue(d) + "%"
                + "<br/>" + "Lacks Healthcare:" + " " + yValue(d) + "%")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0)
                .style("background","grey");
        });
    enter1.append("text")
        .attr("dx", x => xMap(x) - 8)
        .attr("dy", y => yMap(y) + 8)
        .text(function (d) { return d.abbr })
        .attr("fill","white")

    let svg2 = d3.select("#scatter2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xValue2 = function (d) { return + d.poverty; },
        xScale2 = d3.scale.linear().range([0, width]),
        xMap2 = function (d) { return xScale2(xValue2(d)); },
        xAxis2 = d3.svg.axis().scale(xScale2).orient("bottom");

    let yValue2 = function (d) { return + d.obesity; },
        yScale2 = d3.scale.linear().range([height, 0]),
        yMap2 = function (d) { return yScale2(yValue2(d)); },
        yAxis2 = d3.svg.axis().scale(yScale2).orient("left");

    let tooltip2 = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    xScale2.domain([d3.min(data, xValue2) - 1, d3.max(data, xValue2) + 1]);
    yScale2.domain([d3.min(data, yValue2) - 1, d3.max(data, yValue2) + 1]);

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis2)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 0)
        .style("text-anchor", "end")
        .text("In Poverty (%)");

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis2)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Obesity(%)");

    let enter2 = svg2.selectAll(".dot")
        .data(data)
        .enter();

    enter2.append("circle")
        .attr("class", "dot")
        .attr("r", 15)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .attr("cx", xMap2)
        .attr("cy", yMap2)
        .on("mouseover", function (d) {
            tooltip2.transition()
                .style("opacity", ".9");

            tooltip2.html(d["state"] + "<br/> " + "Poverty:" + " " + xValue2(d) + "%"
                + "<br/>" + "Obesity:" + " " + yValue2(d) + "%")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("background","grey");

        })
        .on("mouseout", function (d) {
            tooltip2.transition()
                .duration(500)
                .style("opacity", 0)
        });
    enter2.append("text")
        .attr("dx", x => xMap2(x) - 8)
        .attr("dy", y => yMap2(y) + 8)
        .text(function (d) { return d.abbr })
        .attr("fill","white")
})
