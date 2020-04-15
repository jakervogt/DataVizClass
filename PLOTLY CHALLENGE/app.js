function plot(id) {
    d3.json("samples.json").then((sampledata)=> {
  
        var wfreq = sampledata.metadata.map(d => d.wfreq)
        
        var filtered = sampledata.samples.filter(s => s.id.toString() === id)[0];
  
        var samplevalues = filtered.sample_values.slice(0, 10).reverse();
  
        var OTU_top = (filtered.otu_ids.slice(0, 10)).reverse();
        
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        var labels = filtered.otu_labels.slice(0, 10);
  
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(150,5,5)'},
            type:"bar",
            orientation: "h",
        };
  
        var sampledata = [trace];
  
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        Plotly.newPlot("bar", sampledata, layout);
  
        var trace1 = {
            x: filtered.otu_ids,
            y: filtered.sample_values,
            mode: "markers",
            marker: {
                size: filtered.sample_values,
                color: filtered.otu_ids
            },
            text: filtered.otu_labels
  
        };
  
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        var data1 = [trace1];
  
  
        Plotly.newPlot("bubble", data1, layout_b); 
  
        var data_g = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "rgb(255,151,100)" },
                    { range: [2, 4], color: "rgb(253,77,100)" },
                    { range: [4, 6], color: "rgb(228,3,100)" },
                    { range: [6, 8], color: "rgb(199,2,100)" },
                    { range: [8, 9], color: "rgb(155,5,100)" },
                  ]}
              
          }
        ];
        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data_g, layout_g);
      });
  }  
  function pullData(id) {
    d3.json("samples.json").then((data)=> {
        
        var metadata = data.metadata;

  
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
  
        var demographicInfo = d3.select("#sample-metadata");
        
        demographicInfo.html("");
  
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
  }
  
  function optionChanged(id) {
    plot(id);
    pullData(id);
  }
  
  function init() {
    var dropdown = d3.select("#selDataset");
  
    d3.json("samples.json").then((data)=> {
  
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
  
        plot(data.names[0]);
        pullData(data.names[0]);
    });
  }
  
  init();