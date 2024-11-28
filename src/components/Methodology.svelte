<script>
    export let methodologyTitle = "Methodology";
    export let methodologyContent = `
        The data used in this visualization was provided by the Association for the Prevention of Torture (APT). 
        It includes eight indicators identified as legal benchmarks for measuring progress in torture prevention 
        across countries. Each indicator focuses on legal frameworks rather than practical implementation, 
        as these are easier to document consistently. These indicators represent whether a country has met specific 
        legal obligations or milestones, providing a foundation for understanding progress toward eradicating torture. 
        For each country, the data records whether the indicator has been implemented ("Yes"), partially implemented 
        ("Partially"), or not implemented ("No").
    `;

    export let indicatorDefinitions = [
        {
            title: "Ratification of the UN Convention against Torture",
            description: "Indicates whether the country has formally ratified the UN Convention against Torture and Other Cruel, Inhuman, or Degrading Treatment or Punishment."
        },
        {
            title: "Adoption of the Optional Protocol (OPCAT)",
            description: "Reflects whether the country has adopted the OPCAT, a treaty that establishes a system for regular independent visits to places of detention."
        },
        {
            title: "Establishment of a National Preventive Mechanism (NPM)",
            description: "Indicates if the country has set up an independent mechanism to monitor detention facilities."
        },
        {
            title: "Criminalisation of torture under domestic law",
            description: "Indicates whether torture is explicitly criminalized in national legislation."
        },
        {
            title: "Independent investigative mechanisms for torture allegations",
            description: "Reflects whether the country has mechanisms in place to independently investigate allegations of torture."
        },
        {
            title: "Procedures for complaint and protection of victims",
            description: "Indicates whether mechanisms exist for victims to report and seek protection from torture."
        },
        {
            title: "Procedures for monitoring and visiting places of detention",
            description: "Indicates if the country has procedures for regular monitoring of detention facilities."
        },
        {
            title: "Training and capacity-building of relevant authorities",
            description: "Indicates whether training programs for law enforcement, military personnel, and other relevant authorities include torture prevention measures."
        }
    ];

    export let relevantTerms = [
        {
            term: "Full Implementation ('Yes')",
            description: "Indicates that the country has completely adopted the measure as per the indicator's definition."
        },
        {
            term: "Partial Implementation ('Partially')",
            description: "Reflects that the country has taken steps toward adopting the measure but has not fully met the criteria."
        }
    ];
</script>

<section class="methodology">
    <h2 class="methodology-title">{methodologyTitle}</h2>
    <p class="methodology-content">{methodologyContent}</p>

    <h3 class="subheading">Indicator Definitions</h3>
    <ul class="definitions">
        {#each indicatorDefinitions as { title, description }}
            <li>
                <strong>{title}:</strong> {description}
            </li>
        {/each}
    </ul>

    <h3 class="subheading">Relevant Terms</h3>
    <ul class="terms">
        {#each relevantTerms as { term, description }}
            <li>
                <strong>{term}:</strong> {description}
            </li>
        {/each}
    </ul>
</section>

<style>
    .methodology {
        margin: 2rem 0;
        padding: 2rem;
        background-color: rgba(245, 245, 245, 0.4);
        border-radius: 8px;
    }

    .methodology-title {
        font-size: 1.7rem;
        margin-bottom: 1rem;
        text-align: center;
        font-size: rem;
        color: var(--color-primary-dark);
    }

    .methodology-content {
        font-size: 1rem;
        color: #666;
        line-height: 1.5;
        margin-bottom: 2rem;
        text-align: justify;
    }

    .subheading {
        font-size: 1.2rem;
        color: var(--color-primary-dark); 
        margin-bottom: 1rem;
    }

    .definitions,
    .terms {
        list-style: none;
        padding: 0;
        color: #666;
    }

    .definitions li,
    .terms li {
        margin-bottom: 1rem;
    }

    strong {
        font-weight:600;
        font-size: 1rem;
        color: #666;
    }

    
</style>
