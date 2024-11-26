<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    export let processedData;

    let svg;
    let width;
    let height;
    let tooltipStatus;


    $: {
        const circleRadius = 15;
        const padding = 10;
        // minimum width and height 
        const minWidth = Math.ceil(Math.sqrt(processedData?.length || 1)) * (circleRadius * 2 + padding);
        // min height of container
        height = Math.max(700, minWidth * 1); 
    }

    function updateVisualization() {
        if (!svg || !width || !height || !processedData?.length) return;

        const margin = { top: 30, right: 50, bottom: 50, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous content
        d3.select(svg).selectAll("*").remove();

        const chart = d3.select(svg)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // circle size and spacing 
        const circleRadius = Math.min(20, Math.floor(innerWidth / (Math.sqrt(processedData.length) * 3)));
        const bounds = {
            x: [circleRadius, innerWidth - circleRadius],
            y: [circleRadius, innerHeight - circleRadius]
        };

        const uniqueRegions = [...new Set(processedData.map(d => d.region))];
        console.log("Unique Regions:", uniqueRegions);

        const centers = {};
        uniqueRegions.forEach((region, i) => {
            centers[region] = {
                x: innerWidth * (0.2 + (0.7 * i / Math.max(1, uniqueRegions.length - 1))),
                y: innerHeight * 0.5
            };
        });

        console.log("Region Centers:", centers);

        let animationRunning = true;
        const simulation = d3.forceSimulation(processedData)
            .force("x", d3.forceX(innerWidth / 2).strength(0.1))
            .force("y", d3.forceY(innerHeight / 2).strength(0.1))
            .force("collide", d3.forceCollide().radius(circleRadius + 5).strength(0.5))
            .force("cluster", forceCluster())
            .force("bounds", boundingForce(bounds))
            .on("tick", () => {
                circles
                    .attr("transform", d => {
                        const jiggle = animationRunning ? (Math.random() - 0.5) * 0.5 : 0;
                        return `translate(${d.x + jiggle},${d.y + jiggle})`;
                        // return `translate(${innerWidth/2 + jiggle},${innerHeight/2 + jiggle})`; // doesn't work
                    });
            });
            

        // Run simulation
        for (let i = 0; i < 300; ++i) simulation.tick();


        //       // Add bounding boxes for regions (no longer needed)
        // chart.selectAll(".region-box")
        //     .data(Object.entries(centers))
        //     .join("rect")
        //     .attr("class", "region-box")
        //     .attr("x", ([, center]) => center.x - innerWidth * 0.1)
        //     .attr("y", 0)
        //     .attr("width", innerWidth * 0.2)
        //     .attr("height", innerHeight)
        //     .attr("fill", "none")
        //     .attr("stroke", "var(--color-primary-lightest)")
        //     .attr("stroke-dasharray", "4,2")
        //     .attr("stroke-opacity", 0.5);


        //  // Add region labels (no longer needed)
        //  chart.selectAll(".region-label")
        //         .data(Object.entries(centers))
        //         .join("text")
        //         .attr("class", "region-label")
        //         .attr("x", ([, center]) => center.x)
        //         .attr("y", margin.top / 2) // Position labels above clusters
        //         .attr("text-anchor", "middle")
        //         .text(([region]) => region)
        //         .style("font-size", "14px")
        //         .style("fill", "var(--color-primary-dark)")
        //         .style("fill-opacity", 0.3);

        
        const circles = chart.selectAll("g")
            .data(processedData)
            .join("g")
            .attr("transform", d => `translate(${innerWidth / 2},${innerHeight / 2})`);
        circles.transition()
            .duration(1000)
            .delay((d, i) => i * 50)
            .attr("transform", d => `translate(${d.x},${d.y})`);

        setTimeout(() => {
            simulation.alpha(0.1);
        }, 1000 + processedData.length * 50);

        circles.append("circle")
            .attr("r", 0)
            .attr("fill", "white")
            .attr("stroke", d => d.value === 'Yes' ? 'var(--color-primary)' : 'var(--color-primary-light)')
            .attr("stroke-width", 3)
            .transition()
            .duration(500)
            .delay((d, i) => i * 50)
            .attr("r", circleRadius);

        circles.append("image")
            .attr("x", -circleRadius * 0.7) 
            .attr("y", -circleRadius * 0.7)
            .attr("width", circleRadius * 1.4)
            .attr("height", circleRadius * 1.4)
            .attr("xlink:href", d => `${import.meta.env.BASE_URL}images/${d.iso2}.svg`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("opacity", 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 50)
            .style("opacity", 1);

        // Add tooltips
        const tooltip = d3.select("#tooltip");

        circles
        .on("mouseover", (event, d) => {
        tooltip.style("--tooltip-color", d.value === 'Yes' ? 'var(--color-primary)' : 'var(--color-primary-light)');
        tooltip.html(`
            <div class="tooltip-content">
                <div class="section">
                    <div class="title">${d.country} | ${(d.iso2).toUpperCase()}</div>
                </div>
                <div class="divider"></div>
                
                <div class="section">
                    <img src="${import.meta.env.BASE_URL}images/${d.iso2}.svg" alt="${d.country}" class="country-flag" />
                </div>
                <div class="divider"></div>
                
                <div class="section">
                    <div class="label">Region</div>
                    <div class="region-value">${d.region}</div>
                    <div class="indicator">${d.indicator}</div>
                    <div class="date-value">${Math.floor(d.date)}</div>
                </div>
            </div>
        `)
                .style("left", `${event.pageX + 10}px`) 
                .style("top", `${event.pageY - 50}px`)
                .classed("hidden", false); 

                // Highlight circle (to update)
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("transform", `translate(${d.x},${d.y}) scale(1.3)`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 50}px`);
            })
            .on("mouseout", (event, d) => {
                tooltip.classed("hidden", true);

                // Reset circle scaling
                d3.select(event.currentTarget)
                    .transition()
                    .duration(200)
                    .attr("transform", `translate(${d.x},${d.y}) scale(1)`);
            });



        // Custom force to cluster by region (to avoid regions overlapping)
        function forceCluster(strength = 0.5) {
            return function force(alpha) {
                processedData.forEach(d => {
                    const center = centers[d.region];
                    if (!center) {
                        console.warn(`Region "${d.region}" not found in centers.`);
                        return; // Skip data points with invalid regions
            }
                    d.vx += (center.x - d.x) * strength * alpha;
                    d.vy += (center.y - d.y) * strength * alpha;
                });
            };
        }
        function boundingForce(bounds) {
            return function force(alpha) {
                processedData.forEach(d => {
                    if (d.x < bounds.x[0]) d.x = bounds.x[0];
                    if (d.x > bounds.x[1]) d.x = bounds.x[1];
                    if (d.y < bounds.y[0]) d.y = bounds.y[0];
                    if (d.y > bounds.y[1]) d.y = bounds.y[1];
                });
            };
        }
    }



    $: if (processedData) {
        updateVisualization();
    }

    onMount(() => {
        if (processedData) {
            updateVisualization();
        }

        
    });

</script>

<div class="circles-viz" bind:clientWidth={width} bind:clientHeight={height}>
    <svg bind:this={svg}></svg>
</div>

<div id="tooltip" class="tooltip hidden"></div>


<style>
    .circles-viz {
        width: 100%;
        height: 700px;
        position: relative;
    }

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }

    .tooltip {
    position: absolute;
    background-color: rgb(255, 255, 255);
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    font-size: 0.9rem;
    pointer-events: none;
    z-index: 10;
    transition: opacity 0.2s ease-in-out;
    border-top: 25px solid var(--tooltip-color, var(--color-primary-lightest));
    max-width: 300px;
}



.tooltip.hidden {
    opacity: 0;
    pointer-events: none;
}

   
</style>