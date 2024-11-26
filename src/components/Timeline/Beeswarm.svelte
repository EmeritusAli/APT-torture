<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import * as d3 from 'd3';
    
    export let data;
    export let selectedIndicator;

    const dispatch = createEventDispatcher();
    let svg;
    let width;
    let height;
    let currentBrush = null; // Keep track of brush instance


    $: filteredData = data
      .filter(d => {
            console.log('Checking indicator match:', {
                dataIndicator: d.indicator,
                selectedIndicator: selectedIndicator,
                matches: d.indicator === selectedIndicator
            });
            return d.indicator === selectedIndicator;
        })
        .map(d => ({
            ...d,
            year: (+d.year) < 1984 ? 1984 : +d.year
        }))
        .filter(d => !isNaN(d.year));

    function updateVisualization() {
        if (!svg || !width || !height || !filteredData?.length) return;

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        // Clear existing content
        d3.select(svg).selectAll("*").remove();
        
        const chart = d3.select(svg)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const minYear = +d3.min(filteredData, d => d.year);
        const maxYear = +d3.max(filteredData, d => d.year);
        
        const xScale = d3.scaleTime()
            .domain([
                new Date(1984 - 1, 0),
                new Date(2024 + 1, 0)
            ])
            .range([0, innerWidth]);

        // Process data for simulation
        const timelineData = filteredData.map(d => ({
            id: Math.random(),
            fx: xScale(new Date(d.year, 0)),
            y: innerHeight / 2,
            year: d.year,
            country: d.country,
            region: d.region,
            indicator: d.indicator,
            value: d.value,
            color: d.color
        }));

        // Force simulation
        const simulation = d3.forceSimulation(timelineData)
            .force("y", d3.forceY(innerHeight / 2).strength(0.1))
            .force("collide", d3.forceCollide().radius(6).strength(1))
            .force("x", d3.forceX(d => d.fx).strength(1))
            .stop();
        
        for (let i = 0; i < 300; ++i) simulation.tick();
        
        // Draw points
        const points = chart.append("g")
            .attr("class", "points");

        points.selectAll("circle")
            .data(timelineData)
            .join("circle")
            .attr("cx", d => d.fx)
            .attr("cy", innerHeight)
            .attr("r", 0)
            .attr("fill", d => d.color)
            .attr("stroke", "none")
            .transition()
            .duration(1500)
            .ease(d3.easeBounceOut )
            .attr("cy", d => d.y)
            .attr("r", 5);  

     // x-axis
     const startYear =  1984;
     const tickYears = d3.range(startYear, maxYear + 1, 5).map(year => new Date(year, 0));

     chart.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
        .tickValues(tickYears) 
        .tickFormat(d3.timeFormat("%Y")));

        const yearWidth = xScale(new Date(1985, 0)) - xScale(new Date(1984, 0));

        // Handle brush event
        function handleBrush(event) {
    if (!event.selection) return;

    const [x0, x1] = event.selection;

    // Find the year(s) based on the brush rectangle
    const selectedYears = filteredData.filter(d => {
        const circleX = xScale(new Date(d.year, 0));
        return circleX >= x0 && circleX <= x1; // Overlap check
    });

    const year = selectedYears[0]?.year || null; // Get the first year if available
    const events = selectedYears || [];

    console.log('Dispatching yearSelect:', { year, events });

    points.selectAll("circle")
        .data(timelineData)
        .attr("stroke", d => selectedYears.find(s => s.year === d.year) ? "#000" : "none") // Highlight selected circles
        .attr("stroke-width",  d => selectedYears.find(s => s.year === d.year) ? 2 : 0);


    dispatch('yearSelect', { year, events });
}

    const minYearX = xScale(new Date(minYear, 0)); // X position of the minimum year

    // Add brush
    const brushGroup = chart.append("g")
        .attr("class", "brush");

    currentBrush = d3.brushX()
        .extent([[0, 0], [innerWidth, innerHeight]])
        .on("brush", handleBrush);

    brushGroup.call(currentBrush);

    // Set initial brush position to the minimum year 
    if (minYearX) {
        currentBrush.move(brushGroup, [minYearX - yearWidth / 2, minYearX + yearWidth / 2]);
    }
}
    $: {
        if (filteredData?.length > 0) {
            updateVisualization();
        }
    }

    onMount(() => {
        if (filteredData?.length > 0) {
            updateVisualization();
        }
    });
</script>

<div class="beeswarm" bind:clientWidth={width} bind:clientHeight={height}>
    <svg bind:this={svg}></svg>
</div>

<style>
    .beeswarm {
        width: 100%;
        height: 300px;
        position: relative;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    :global(.brush .selection) {
        fill: var(--color-primary-lightest);
        stroke: var(--color-primary);
        stroke-width: 1px;
    }

    :global(.brush .handle) {
        display: none;
    }

    :global(.brush .overlay) {
        pointer-events: none;
    }
</style>