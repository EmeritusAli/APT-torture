<script>
    export let regionalData;
    export let processedRegionalData;  // Only Yes/Partially data

    $: regions = [...regionalData].map(([region, allData]) => {
        const inplementedData = processedRegionalData.get(region) || [];

        return {
            region,
            total: allData.length,
            implemented: inplementedData.filter(d => d.value === 'Yes').length,
            partial: inplementedData.filter(d => d.value === 'Partially').length,
            percentage: ((inplementedData.length / allData.length) * 100).toFixed(1)
        };
    }).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
</script>

<div class="regional-breakdown">
    <h2>Regional Progress</h2>
    
    <div class="regions-list">
        {#each regions as region}
            <div class="region-card">
                <h3>{region.region}</h3>
                <div class="percentage">{region.percentage}%</div>
                <div class="details">
                    <span class="implemented">Full: {region.implemented}</span>
                    <span class="partial">Partial: {region.partial}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .regional-breakdown {
        height: 100%;
    }

    h2 {
        color: var(--color-primary-dark);
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }

    .regions-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        max-height: calc(100% - 3rem);
    }

    .region-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--color-primary);
    }

    .region-card h3 {
        color: var(--color-primary-dark);
        margin: 0;
        font-size: 1.1rem;
    }

    .percentage {
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-primary);
        margin: 0.5rem 0;
    }

    .details {
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
        color: #666;
    }

    .implemented {
        color: var(--color-primary);
    }

    .partial {
        color: var(--color-primary-light);
    }
</style>