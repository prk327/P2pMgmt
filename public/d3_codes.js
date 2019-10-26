//Inverting Axis

const svg = d3.select('.canvas')
                .append('svg')
                    .attr('width', 600)
                    .attr('height', 600);

//create margins and dimentions
const margin = {top: 20, right: 20, bottom: 100, left: 100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

//now we will create a group inside the svg
const graph = svg.append('g')
                    .attr('width', graphWidth)
                    .attr('height', graphHeight)
                    .attr('transform', `translate(${margin.left}, ${margin.top})`); //translate function accept x and y from where it need to place the element

//creating a group for x and y axis inside the graph
const xAxisGroup = graph.append('g') //this will append the axis on top
                        .attr('transform', `translate(0,${graphHeight})`); //this will append the axis at the bottom of the graph

const yAxisGroup = graph.append('g');

//var invoice = #{invoice};
//
//var myVar = <%= JSON.stringify(invoice) %>;



var inv = ejs.render('<%= invoice %>');

console.log(inv);



