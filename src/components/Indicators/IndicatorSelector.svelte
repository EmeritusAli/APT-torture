<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { selectedIndicatorStore } from '../../stores';
    const dispatch = createEventDispatcher();
  
    export let indicators = [
        "Ratification of the UN Convention against Torture",
        "Ratification of Optional Protocol (OPCAT)",
        "Submission of initial report to CAT",
        "Prohibition of torture in the constitution",
        "Criminalisation of torture under domestic law",
        "Designation of the National Preventive Mechanism (in law)",
        "Operationality of the National Preventive Mechanism",
        "Existence of National Human Rights Institution that fully complies with Paris Principles"
    ].map(i => i.trim());
  
    $: if ($selectedIndicatorStore) {
        // When store value changes, dispatch the event
        dispatch('select', { indicator: $selectedIndicatorStore });
    }
    
    onMount(() => {
      if (!$selectedIndicatorStore) {
            selectedIndicatorStore.set(indicators[0]);
        }
    });
  
    function handleSelect(event) {
        selectedIndicatorStore.set(event.target.value);
    }
</script>

<div class="selector">
    <label for="indicator">Select Indicator:</label>
    <select id="indicator" value={$selectedIndicatorStore} on:change={handleSelect}>
        {#each indicators as indicator}
            <option value={indicator}>{indicator}</option>
        {/each}
    </select>
</div>
  
  <style>
    .selector {
      margin-bottom: 2rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-primary-dark);
      font-weight: 500;
    }
  
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--color-primary-light);
      border-radius: 4px;
      font-size: 1rem;
    }
  </style>