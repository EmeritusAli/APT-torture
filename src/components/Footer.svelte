<script>
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer>
    <div class="footer-content">
        <a href="https://www.apt.ch" target="_blank" rel="noopener noreferrer" class="logo-link">
          <img src="/images/apt_logo.jpg" alt="Association for the Prevention of Torture Logo" class="logo" />
        </a>

        <div class="author">
          <p>
            Designed by: <a href="https://www.linkedin.com/in/adekola-aliu" target="_blank" rel="noopener noreferrer">Adekola Aliu</a>
          </p>
        </div>

        <a href="https://www.vizforsocialgood.com" target="_blank" rel="noopener noreferrer" class="logo-link">
          <img src="images/vfsg-logo.png" alt="Viz for Social Good Logo" class="logo"/>
        </a>
      </div>
      
     
  </footer>
  
  <style>
    footer {
      width: 100%;
      padding: 2rem;
   
    }
  
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
    }
  
    .logo-link {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }

    .logo {
    height: 3.5rem;
    width: auto;
    object-fit: contain;
  }


  .author {
    flex: 0 0 auto;
    text-align: center;
    font-size: 1.1rem;
    color: #666;
  }

  .author a {
  color: #222323;
  font-size: large;
  text-decoration: none;
  box-shadow: inset 0 -5px 0 0 var(--color-primary);
  transition: box-shadow 0.2s ease-out;
}
a:hover, a:focus {
  box-shadow: inset 0 -18px 0 0 rgba(74, 99, 221, 0.7);
  transition-timing-function: ease-in;
}
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 1.5rem;
    }

    .logo {
      height: 30px;
    }
  }
  </style>