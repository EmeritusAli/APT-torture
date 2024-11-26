<script>
    export let title = "Global Torture Prevention Progress";
    export let subtitle = "A Global Overview of Anti-Torture Measures";
  </script>
  
  <header>
    <div class="header-content">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p class="intro">
        This visualization explores the global progress in torture prevention measures,
        highlighting the positive steps taken by countries worldwide in ratifying conventions,
        implementing preventive mechanisms, and establishing human rights institutions.
      </p>
    </div>
  </header>
  
  <style>
    header {
      width: 100%;
      padding: 1rem 1rem;
      /* background-color: var(--color-primary-faintest); */
    }
  
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      color: var(--color-primary-dark);
      margin-bottom: 1rem;
      line-height: 1.2;
    }
  
    h2 {
      font-size: 1.2rem;
      font-weight: 500;
      color: #666;
      /* color: var(--color-primary); */
      margin-bottom: 2rem;
    }
  
    .intro {
      font-size: 1.2rem;
      line-height: 1.5;
      max-width: 800px;
      color: #666;
    }
  </style>