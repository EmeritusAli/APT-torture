<script>
    import * as d3 from 'd3';
    export let events = [];
    export let year = null;
    
    $: groupedEvents = d3.group(events, d => d.region);
  </script>
  
  {#if year && events.length > 0}
    <div class="timeline-details">
      <h3>{year} Milestones</h3>
      <div class="events-grid">
        {#each [...groupedEvents] as [region, regionEvents]}
          <div class="region-group">
            <h4>{region}</h4>
            <ul class="country-grid">
              {#each regionEvents as event}
                <li>
                  <span class="country">{event.country}</span>
                  <span class="indicator">{event.indicator}</span>
                  <span class="status" class:partial={event.value === 'Partially'}>
                    {event.value === 'Yes' ? 'Full Implementation' : 'Partial Implementation'}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="placeholder">
      <p>Hover over the points above to see details</p>
    </div>
  {/if}
  
  <style>

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: var(--color-primary-dark);
      font-weight: bold;
    }
    h4 {
      margin: 0;
      font-size: 1rem;
      color: var(--color-primary);
    }

    .country-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Adjust column width as needed */
      gap: 1rem; /* Space between items */
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .country-grid li {
      background-color: white;
      border-radius: 4px;
      padding: 0.8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .status {
      display: inline-block;
      max-width: 200px;
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      background-color: var(--color-primary);
      opacity: 0.8;
      color: white;
      display: inline-block;
      margin-top: 0.3rem;
    }
  
    .status.partial {
      background-color: var(--color-primary-light);
    }
  
    li {
      margin-bottom: 0.5rem;
      padding: 0.8rem;
      background-color: white;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
    }
  
    .country {
      font-size: 1rem;
      color: var(--color-primary-dark);
      
    }
  
    .indicator {
      font-size: 0.8rem;
      color: #666;
      margin: 0.2rem 0;
    }
  </style>