<script>
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Methodology from './components/Methodology.svelte';
    import TimelineContainer from './components/Timeline/TimelineContainer.svelte';
    import IndicatorView from './components/Indicators/IndicatorView.svelte';
    
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];
    let dataLoaded = false;
    const basePath = '/APT-torture';
    const dataUrl = `${import.meta.env.BASE_URL}data/apt-data_updated.csv`;


    // Data loading
    
    onMount(async () => {
        try {
            // Load and process your data here
            data = await d3.csv(dataUrl);
            dataLoaded = true;
            console.log('Data loaded:', data);
            
        } catch (error) {
            console.error('Failed to load data:', error);
            dataLoaded = false;
            data = [];
        }
    });

    </script>

    <Header />
    <main>
    <div class="container">
        <section class="timeline">
        {#if dataLoaded && data.length > 0}
            <TimelineContainer {data} />
        {:else}
            <div class="loading">
                Loading data...
            </div>
        {/if}
        </section>

        <section class="indicators">
        {#if data}
            <IndicatorView {data} />
        {/if}
        </section>

        <section>
            <Methodology />
        </section>
    </div>
    </main>

    <Footer />

    <style>
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem 0;
    }

    section {
        margin-bottom: 4rem;
    }

    .loading {
        text-align: center;
        padding: 1rem;
        color: var(--color-primary-dark);
        font-size: 1.2rem;
    }

    
    </style>