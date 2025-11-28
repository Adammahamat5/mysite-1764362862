class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                footer {
                    background: rgba(127, 29, 29, 0.9);
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(245, 158, 11, 0.3);
                    padding: 2rem 0;
                    margin-top: 4rem;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    text-align: center;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .footer-section h3 {
                    color: #f59e0b;
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                }
                
                .footer-links {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-links a {
                    color: white;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-links a:hover {
                    color: #f59e0b;
                }
                
                .social-links {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-links a {
                    color: white;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .social-links a:hover {
                    color: #f59e0b;
                }
                
                .copyright {
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    padding-top: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                }
            </style>
            <footer>
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Lambda Network</h3>
                            <p>The future of decentralized cryptocurrency mining. Fast, secure, and profitable.</p>
                        </div>
<div class="footer-section">
                            <h3>Quick Links</h3>
                            <ul class="footer-links">
                                <li><a href="#"><i data-feather="home"></i> Home</a></li>
                                <li><a href="#"><i data-feather="trending-up"></i> Statistics</a></li>
                                <li><a href="#"><i data-feather="help-circle"></i> Support</a></li>
                                <li><a href="#"><i data-feather="shield"></i> Security</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Connect With Us</h3>
                            <div class="social-links">
                                <a href="#"><i data-feather="twitter"></i></a>
                                <a href="#"><i data-feather="discord"></i></a>
                            </div>
</div>
                    </div>
                    
                    <div class="copyright">
                        <p>&copy; 2024 Lambda Network. All rights reserved. | Decentralized Crypto Mining</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);