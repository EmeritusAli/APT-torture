<script>
    import IndicatorSelector from './IndicatorSelector.svelte';
    import CountryCircles from './CountryCircles.svelte';
    import RegionalBreakdown from './RegionalBreakdown.svelte';
    import { selectedIndicatorStore } from '../../stores';

    import * as d3 from 'd3';

    export let data;


    
    // Process data when indicator changes
    $: processedData = $selectedIndicatorStore && data? data
    .filter(d => {
            const currentIndicator = d.Indicator.trim();
            const selected = $selectedIndicatorStore.trim();
        console.log('Filtering:', {
                currentIndicator,
                selectedIndicator: selected,
                isMatch: currentIndicator === selected,
                value: d.Input  
            });
            return currentIndicator === selected && 
                   (d.Input === 'Yes' || d.Input === 'Partially');
        })
    .map(d => ({
        country: d.Country,
        region: d.Region,
        indicator: d.Indicator,
        date: d.Date,
        value: d.Input,
        iso2: d.iso2
    })) : [];


    // global BAN
    $: globalStats = {
        total: processedData.length,
        implemented: processedData.filter(d => d.value === 'Yes').length,
        partial: processedData.filter(d => d.value === 'Partially').length,
        percentage: $selectedIndicatorStore ? 
        ((processedData.length / data.filter(d => d.Indicator.trim() === $selectedIndicatorStore.trim()).length) * 100).toFixed(1) 
        : '0.0'
    };

    // Group data by region including all values for the selected indicator
    $: regionalData = d3.group(
            data.filter(d => d.Indicator.trim() === $selectedIndicatorStore), 
            d => d.Region
        );

    // Send both processed and regional data
    $: processedRegionalData = d3.group(processedData, d => d.region);

    function handleIndicatorSelect(event) {
        selectedIndicatorStore.set(event.detail.indicator);
    }
</script>

<section class="indicator-view">
    <h2>Implementation Status Overview</h2>
    <p class="description">
        Explore the global and regional progress of countries implementing key anti-torture mechanisms. 
        The visualizations below provide insights into the distribution and extent of implementation for the selected indicator, highlighting successes and areas for improvement.
    </p>
    <div class="selector-container">
        <IndicatorSelector on:select={handleIndicatorSelect}/>
    </div>

    {#if $selectedIndicatorStore}
        <div class="global-stats">
            <h4>Global Implementation</h4>
            <div class="stats-number">
                {globalStats.percentage}%
            </div>
            <p class="stats-detail">
                of countries have implemented or partially implemented this measure
            </p>
        </div>

        <div class="visualization-container">
            <div class="circles-container">
                <CountryCircles {processedData} />
            </div>

            <div class="breakdown-container">
                <RegionalBreakdown 
                {regionalData} 
                {processedRegionalData}
                />
            </div>
        </div>
    {/if}
</section>

<style>
    h2 {
      font-size: rem;
      color: var(--color-primary-dark);
      margin-bottom: 1rem;
    }
  
    .description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.5;
      max-width: 800px;
    }
    h4 {
        color: #666;
        font-size: 1rem;
        font-weight: lighter;
    }
    .indicator-view {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        padding-top: 0;
    }

    .selector-container {
        margin-bottom: 2rem;
    }

    .global-stats {
        text-align: left;
        margin: 3rem 0;
    }

    .stats-number {
        font-size: 4rem;
        font-weight: bold;
        color: var(--color-primary);
    }

    .stats-detail {
        font-size: 1.2rem;
        color: #666;
    }

    .visualization-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }

    .circles-container {
        background-color: var(--color-primary-faintest);
        border-radius: 8px;
        padding: 1rem;
    }

    .breakdown-container {
        background-color: var(--color-primary-faintest);
        border-radius: 8px;
        padding: 1rem;
    }

    @media (max-width: 768px) {
        .visualization-container {
            grid-template-columns: 1fr;
        }
    }
</style>