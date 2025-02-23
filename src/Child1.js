import React, { Component } from 'react';
import * as d3 from "d3";

class Child1 extends Component {
    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.data.map((d) => ({
            total_bill: +d.total_bill,
            tip: +d.tip
        }));

        const margin = { top: 80, right: 60, bottom: 70, left: 70 };
        const width = 700;
        const height = 400;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(".scatterSvg").attr("width", width).attr("height", height).attr('align', 'center');
        svg.selectAll("*").remove();
        const innerChart = svg.append("g").attr("class", "inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.total_bill)])
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.tip)])
            .range([innerHeight, 0]);

        // Plotting the data
        innerChart.selectAll('circle')
            .data(data)
            .join('circle')
            .attr('cx', (d) => xScale(d.total_bill))
            .attr('cy', (d) => yScale(d.tip))
            .attr('r', 4)
            .attr('fill', '#68b3a3');


        // Axes
        var xAxisGenerator = d3.axisBottom(xScale);
        var yAxisGenerator = d3.axisLeft(yScale);

        innerChart.append("g")
            .attr('class', 'x-axis')
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxisGenerator);

        innerChart.append("g")
            .attr('class', 'y-axis')
            .call(yAxisGenerator)

        // Titles
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2)
            .attr("text-anchor", "middle")
            .attr("class", "graph-title")
            .text("Total Bill vs. Tips");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - margin.bottom / 2)
            .attr("text-anchor", "middle")
            .attr("class", "x-axis-title")
            .text("Total Bill");

        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", margin.left / 2)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("class", "y-axis-title")
            .text("Tips");
    }

    render() {
        return (
            <svg className="scatterSvg">
                <g className="inner_chart" />
            </svg>
        );
    }
}

export default Child1;