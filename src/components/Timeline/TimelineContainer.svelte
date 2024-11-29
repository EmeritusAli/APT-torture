<script>
     import Beeswarm from './Beeswarm.svelte';
    import TimelineDetails from './TimelineDetails.svelte';
    import IndicatorSelector from '../Indicators/IndicatorSelector.svelte';
    
    export let data;
    
    let selectedIndicator = "Ratification of the UN Convention against Torture"; // default
    let selectedYear = null;
    let selectedEvents = [];

    // Process data 
    $: processedData = data.map(d => ({
        year: +d.Date,
        country: d.Country,
        region: d.Region,
        indicator: d.Indicator.trim(),
        value: d.Input,
        color: d.Input === 'Yes' ? 'var(--color-primary)' : 'var(--color-primary-light)'
    })).filter(d => d.value === 'Yes' || d.value === 'Partially');
    
    function handleIndicatorSelect(event) {
        selectedIndicator = event.detail.indicator;
        selectedYear = null;
        selectedEvents = [];
    }
    
    function handleYearSelect(event) {
        selectedYear = event.detail.year;
        selectedEvents = event.detail.events || [];
    }
   
  </script>
  
  <section class="timeline-section">
    <h2>Progress Timeline</h2>
    <p class="description">
      Explore how countries have adopted various torture prevention measures over time. 
      Each dot represents a country and highlights a milestone in implementing anti-torture mechanisms. 
      For most indicators, progress is marked as <span class="text-label full">Yes (fully implemented)</span>. However, for 'Criminalisation of torture under domestic law,' progress can be categorized as <span class="text-label full">Full</span> or <span class="text-label partial">Partial</span>. 
    </p>
  
    <IndicatorSelector on:select={handleIndicatorSelect} />
    <p class="interaction-note">
      Drag the brush below or click on any of the circle to explore details about countries that implemented the selected indicator.
    </p>
  
    {#if selectedIndicator}
      <div class="beeswarm-container">
        <Beeswarm 
          data={processedData}
          {selectedIndicator}
          on:yearSelect={handleYearSelect}
        />
      </div>
  
        {#if selectedYear}
        <div class="details-container">
            <TimelineDetails 
            events={selectedEvents}
            year={selectedYear}
            />
        </div>
        {/if}
    {/if}
  </section>
  
  <style>
    .timeline-section {
      margin: 0 auto;
      padding: 1rem 1rem;

    }
  
    h2 {
      font-size: rem;
      color: var(--color-primary-dark);
      margin-bottom: 1rem;
    }
  
    .description {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      max-width: 800px;
      line-height: 1.5;
    }
  
    .beeswarm-container {
      width: 100%;
      height: 300px;
      margin-bottom: 2rem;
    }
  
    .details-container {
      min-height: 200px;
    }

    .text-label.full {
      color: var(--color-primary);
      font-weight: bold;
    }
    .text-label.partial {
      color: var(--color-primary-light);
      font-weight: bold;
    }

    .interaction-note {
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 1rem;
      
    }
  </style>