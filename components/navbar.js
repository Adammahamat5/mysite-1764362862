class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                nav {
                    background: rgba(127, 29, 29, 0.8);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
                    padding: 1rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: white;
                    font-weight: bold;
                    font-size: 1.5rem;
                }
                .nav-links {
                    display: flex;
                    list-style: none;
                    gap: 2rem;
                }
.nav-links a {
                    color: white;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    font-weight: 500;
                }
                
                .nav-links a:hover {
                    color: #f59e0b;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: rgba(127, 29, 29, 0.95);
                        backdrop-filter: blur(10px);
                        flex-direction: column;
                        padding: 1rem;
                        gap: 1rem;
                    }
.nav-links.active {
                        display: flex;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>
            <nav>
                <div class="nav-container">
                    <a href="/" class="logo">
                        <i data-feather="cpu"></i>
                        <span style="margin-left: 0.5rem;">Lambda Miner</span>
                    </a>
                    
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <i data-feather="menu"></i>
                    </button>
                    
                    <ul class="nav-links" id="navLinks">
                        <li><a href="#"><i data-feather="home"></i> Home</a></li>
                        <li><a href="#"><i data-feather="trending-up"></i> Stats</a></li>
                        <li><a href="#"><i data-feather="help-circle"></i> Help</a></li>
                    </ul>
                </div>
            </nav>
        `;

        // Add mobile menu functionality
        const mobileMenuBtn = this.shadowRoot.getElementById('mobileMenuBtn');
        const navLinks = this.shadowRoot.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            feather.replace();
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);