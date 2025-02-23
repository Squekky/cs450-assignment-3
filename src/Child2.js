import React, { Component } from 'react';
import * as d3 from "d3";

class Child2 extends Component {
    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate() {
        this.drawChart();
    }

    drawChart() {
        const data = this.props.data.map((d) => ({
            day: d.day,
            tip: +d.tip
        }));

        const groupedData = d3.group(data, (d) => d.day);

        const averageTipByDay = Array.from(groupedData, ([day, values]) => {
            const totalTip = d3.sum(values, (d) => d.tip);
            const count = values.length;
            return { day, averageTip: totalTip / count };
        });

        console.log(averageTipByDay);

        const margin = { top: 80, right: 60, bottom: 70, left: 70 }; 
        const width = 700;
        const height = 400;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(".barSvg").attr("width", width).attr("height", height).attr('align', 'center');
        svg.selectAll("*").remove();
        const innerChart = svg.append("g").attr("class", "inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

        const xScale = d3
            .scaleBand()
            .domain(averageTipByDay.map((d) => d.day))
            .range([0, innerWidth])
            .padding(0.25);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(averageTipByDay, (d) => d.averageTip)])
            .range([innerHeight, 0]);

        // Plotting the data
        innerChart.selectAll('rect')
            .data(averageTipByDay)
            .join('rect')
            .attr('x', (d) => xScale(d.day))
            .attr('y', (d) => yScale(d.averageTip))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => innerHeight - yScale(d.averageTip))
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
            .text("Average Tip by Day");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - margin.bottom / 2)
            .attr("text-anchor", "middle")
            .attr("class", "x-axis-title")
            .text("Day");

        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", margin.left / 2)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("class", "y-axis-title")
            .text("Average Tip");
    }

    render() {
        return (
            <svg className="barSvg">
            </svg>
        );
    }
}

export default Child2;
