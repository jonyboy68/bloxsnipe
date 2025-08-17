 // Initialize particles
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: '#9333ea'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.15,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.05,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 180,
                    color: '#9333ea',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });

        // BloxSnipe Enhanced Class
        class BloxSnipe {
            constructor() {
                this.output = document.getElementById('output');
                this.init();
            }

            init() {
                this.showLoadingSequence();
                setTimeout(() => {
                    const { placeId, serverId } = this.parseUrl();
                    this.renderInterface(placeId, serverId);
                }, 2500);
            }

            parseUrl() {
                const path = window.location.pathname.split('/').filter(Boolean);
                if (path.length >= 2) {
                    return { placeId: path[0], serverId: path[1] };
                }
                return { placeId: '', serverId: '' };
            }

            showLoadingSequence() {
                this.output.innerHTML = `
                    <div class="glass-card pulse-effect">
                        <div class="loading-container">
                            <div class="spinner"></div>
                            <div class="loading-text">Initializing connection...</div>
                        </div>
                    </div>
                `;

                const sequences = [
                    "Parsing URL parameters...",
                    "Validating server credentials...",
                    "Establishing secure connection...",
                    "Preparing launch sequence..."
                ];

                let currentStep = 0;
                const interval = setInterval(() => {
                    if (currentStep < sequences.length) {
                        const loadingText = this.output.querySelector('.loading-text');
                        if (loadingText) {
                            loadingText.innerHTML = `<i class="fas fa-sync fa-spin"></i> ${sequences[currentStep]}`;
                        }
                        currentStep++;
                    } else {
                        clearInterval(interval);
                    }
                }, 500);
            }

            renderInterface(placeId, serverId) {
                if (!placeId || !serverId) {
                    this.renderServerNotFound();
                    return;
                }

                const joinCmd = `Roblox.GameLauncher.joinGameInstance(${placeId}, "${serverId}")`;
                const robloxUrl = `roblox://placeId=${placeId}&gameInstanceId=${serverId}`;
                const gamePage = `https://www.roblox.com/games/${placeId}/--?gameId=${serverId}`;

                this.output.innerHTML = `
                    <div class="glass-card">
                        <div class="section-title">
                            <i class="fas fa-crosshairs"></i>
                            Target Acquired
                        </div>
                        <p style="text-align: center; color: rgba(229, 231, 235, 0.7); margin-bottom: 35px; font-size: 1.1rem;">
                            Server connection established and ready to join.
                        </p>
                        
                        <div class="target-info">
                            <div class="info-panel">
                                <div class="info-label">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Place Identifier
                                </div>
                                <div class="info-value">${placeId}</div>
                            </div>
                            <div class="info-panel">
                                <div class="info-label">
                                    <i class="fas fa-server"></i>
                                    Server Instance
                                </div>
                                <div class="info-value">${serverId}</div>
                            </div>
                        </div>

                        <div class="action-panel">
                            <a class="action-btn" href="${robloxUrl}" id="launchBtn">
                                <i class="fas fa-gamepad"></i>
                                Join Server
                            </a>
                            <a class="action-btn action-btn-secondary" href="${gamePage}" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                Game Hub
                            </a>
                        </div>

                        <div class="info-card">
                            <p><strong><i class="fas fa-bolt"></i> Auto-Join:</strong> Connection will start in 3 seconds. Your system may request authorization to launch Roblox or Bloxstrap.</p>
                        </div>
                    </div>

                    <div class="method-section">
                        <div class="glass-card">
                            <div class="method-title">
                                <i class="fas fa-terminal"></i>
                                Manual Override Protocol
                            </div>
                            <p style="color: rgba(229, 231, 235, 0.7); margin-bottom: 25px; font-size: 1.05rem;">
                                If automatic joining fails, execute manual override sequence:
                            </p>
                            <div class="warning-card">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; font-weight: 700;">
                                    <i class="fas fa-shield-alt" style="color: #ef4444;"></i>
                                    <span style="color: #ef4444;">SECURITY PROTOCOL</span>
                                </div>
                                <p>Never execute untrusted code in your browser console. Malicious scripts can compromise your Roblox account and personal data. Only use verified commands from trusted sources like BloxSnipe.</p>
                            </div>
                            <ol class="step-list">
                                <li>Navigate to the <a href="${gamePage}" target="_blank" class="tech-link">target game page</a></li>
                                <li>Access developer console using <strong>F12</strong> key</li>
                                <li>Select the <strong>Console</strong> tab in DevTools</li>
                                <li>Execute the following command:
                                    <div class="code-block">${joinCmd}</div>
                                </li>
                                <li>Confirm execution with <strong>Enter</strong> key</li>
                            </ol>
                        </div>
                    </div>

                    <div class="method-section">
                        <div class="glass-card">
                            <div class="method-title">
                                <i class="fas fa-mobile-alt"></i>
                                Mobile Operations
                            </div>
                            <div class="warning-card">
                                <p><strong><i class="fas fa-info-circle"></i> Prerequisites:</strong> Roblox mobile application must be active and running for successful connection.</p>
                            </div>
                        </div>
                    </div>

                    <div class="method-section">
                        <div class="glass-card">
                            <div class="method-title">
                                <i class="fas fa-cogs"></i>
                                Bloxstrap Integration
                            </div>
                            <div class="info-card">
                                <p><strong><i class="fas fa-star"></i> Enhanced Compatibility:</strong> <a href="https://github.com/pizzaboxer/bloxstrap" target="_blank" class="tech-link">Bloxstrap users</a> receive optimized launch protocols. Ensure Bloxstrap is configured as your primary Roblox launcher for maximum efficiency.</p>
                            </div>
                        </div>
                    </div>
                `;

                this.initiateLaunchSequence();
            }

            renderServerNotFound() {
                this.output.innerHTML = `
                    <div class="glass-card">
                        <div class="section-title" style="color: #ef4444;">
                            <i class="fas fa-exclamation-triangle"></i>
                            Target Not Found
                        </div>
                        <p style="text-align: center; color: rgba(229, 231, 235, 0.7); margin-bottom: 35px; font-size: 1.1rem;">
                            Unable to establish server connection. Required parameters are missing or invalid.
                        </p>
                        
                        <div class="warning-card">
                            <p><strong><i class="fas fa-link"></i> Required Format:</strong> URL must contain both Place ID and Server ID parameters.</p>
                            <div class="code-block">https://bloxsnipe.netlify.app/&lt;PLACE_ID&gt;/&lt;SERVER_ID&gt;</div>
                        </div>

                        <div style="text-align: center; margin-top: 35px;">
                            <div class="action-btn" style="cursor: not-allowed; opacity: 0.5; background: linear-gradient(135deg, #6b7280, #374151);">
                                <i class="fas fa-times-circle"></i>
                                Server Unavailable
                            </div>
                        </div>
                    </div>
                `;
            }

            initiateLaunchSequence() {
                const launchBtn = document.getElementById('launchBtn');
                if (!launchBtn) return;

                let countdown = 3;
                const originalContent = launchBtn.innerHTML;
                
                const countdownInterval = setInterval(() => {
                    launchBtn.innerHTML = `<i class="fas fa-clock"></i> Joining in ${countdown}...`;
                    countdown--;
                    
                    if (countdown < 0) {
                        clearInterval(countdownInterval);
                        launchBtn.innerHTML = '<i class="fas fa-gamepad fa-spin"></i> Connecting...';
                        launchBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        launchBtn.classList.add('pulse-effect');
                        
                        // Trigger launch
                        setTimeout(() => {
                            launchBtn.click();
                        }, 300);
                        
                        // Reset button after launch
                        setTimeout(() => {
                            launchBtn.innerHTML = originalContent;
                            launchBtn.style.background = 'linear-gradient(135deg, #9333ea, #db2777)';
                            launchBtn.classList.remove('pulse-effect');
                        }, 3000);
                    }
                }, 1000);

                // Add launch click handler with enhanced effects
                launchBtn.addEventListener('click', (e) => {
                    if (launchBtn.innerHTML.includes('Connecting')) {
                        e.preventDefault();
                        return;
                    }
                    
                    this.addLaunchEffect();
                    this.showLaunchNotification();
                });
            }

            addLaunchEffect() {
                // Enhanced launch effect overlay
                const effect = document.createElement('div');
                effect.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(219, 39, 119, 0.2) 50%, transparent 100%);
                    pointer-events: none;
                    z-index: 9999;
                    animation: launchWave 1s ease-out;
                `;
                
                document.body.appendChild(effect);
                
                // Add dynamic keyframes
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes launchWave {
                        0% { opacity: 0; transform: scale(0.5); }
                        30% { opacity: 1; transform: scale(1.1); }
                        100% { opacity: 0; transform: scale(2); }
                    }
                    @keyframes screenPulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.01); }
                    }
                `;
                document.head.appendChild(style);
                
                // Screen pulse effect
                document.body.style.animation = 'screenPulse 0.5s ease-out';
                
                // Cleanup effects
                setTimeout(() => {
                    document.body.removeChild(effect);
                    document.head.removeChild(style);
                    document.body.style.animation = '';
                }, 1000);
            }

            showLaunchNotification() {
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-rocket" style="color: #10b981;"></i>
                        <span>Launched successfully!</span>
                    </div>
                `;
                notification.style.cssText = `
                    position: fixed;
                    top: 30px;
                    right: 30px;
                    background: rgba(15, 15, 35, 0.95);
                    backdrop-filter: blur(20px);
                    color: #f3f4f6;
                    padding: 16px 24px;
                    border-radius: 12px;
                    border: 1px solid rgba(16, 185, 129, 0.5);
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideInRight 0.5s ease-out;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                `;
                
                const notificationStyle = document.createElement('style');
                notificationStyle.textContent = `
                    @keyframes slideInRight {
                        0% { opacity: 0; transform: translateX(100px); }
                        100% { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideOutRight {
                        0% { opacity: 1; transform: translateX(0); }
                        100% { opacity: 0; transform: translateX(100px); }
                    }
                `;
                document.head.appendChild(notificationStyle);
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.5s ease-out';
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                        if (document.head.contains(notificationStyle)) {
                            document.head.removeChild(notificationStyle);
                        }
                    }, 500);
                }, 3000);
            }

            // Enhanced visual feedback system
            addVisualFeedback(type = 'success') {
                const colors = {
                    success: '#10b981',
                    error: '#ef4444',
                    info: '#3b82f6'
                };
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    background: ${colors[type]};
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 9999;
                    animation: rippleEffect 0.6s ease-out;
                    box-shadow: 0 0 20px ${colors[type]};
                `;
                
                const rippleStyle = document.createElement('style');
                rippleStyle.textContent = `
                    @keyframes rippleEffect {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
                    }
                `;
                
                document.head.appendChild(rippleStyle);
                document.body.appendChild(ripple);
                
                setTimeout(() => {
                    document.body.removeChild(ripple);
                    document.head.removeChild(rippleStyle);
                }, 600);
            }
        }

        // Enhanced initialization
        document.addEventListener('DOMContentLoaded', () => {
            const bloxSnipe = new BloxSnipe();
            
            // Add interaction feedback
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('action-btn') || e.target.closest('.action-btn')) {
                    bloxSnipe.addVisualFeedback('success');
                }
                if (e.target.classList.contains('tech-link') || e.target.closest('.tech-link')) {
                    bloxSnipe.addVisualFeedback('info');
                }
            });
            
            // Enhanced Konami code easter egg
            let konamiSequence = [];
            const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
            
            document.addEventListener('keydown', (e) => {
                konamiSequence.push(e.keyCode);
                if (konamiSequence.length > konamiCode.length) {
                    konamiSequence.shift();
                }
                
                if (konamiSequence.length === konamiCode.length && 
                    konamiSequence.every((key, index) => key === konamiCode[index])) {
                    
                    // Activate enhanced targeting mode
                    document.body.style.filter = 'hue-rotate(180deg) saturate(1.8) contrast(1.2)';
                    bloxSnipe.addVisualFeedback('success');
                    
                    // Enhanced mode indicator
                    const indicator = document.createElement('div');
                    indicator.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                            <i class="fas fa-crosshairs fa-spin" style="color: #10b981;"></i>
                            <span style="font-family: 'Orbitron', monospace; font-weight: 900; font-size: 1.3rem; letter-spacing: 0.2em;">ENHANCED TARGETING ACTIVATED</span>
                            <i class="fas fa-crosshairs fa-spin" style="color: #10b981;"></i>
                        </div>
                    `;
                    indicator.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: rgba(15, 15, 35, 0.95);
                        backdrop-filter: blur(25px);
                        color: #10b981;
                        padding: 25px 45px;
                        border-radius: 16px;
                        border: 2px solid #10b981;
                        z-index: 10000;
                        animation: enhancedModeAppear 4s ease-out forwards;
                        box-shadow: 0 0 50px rgba(16, 185, 129, 0.5);
                    `;
                    
                    const enhancedStyle = document.createElement('style');
                    enhancedStyle.textContent = `
                        @keyframes enhancedModeAppear {
                            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotateY(180deg); }
                            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1) rotateY(0deg); }
                            80% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotateY(0deg); }
                            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) rotateY(-180deg); }
                        }
                    `;
                    
                    document.head.appendChild(enhancedStyle);
                    document.body.appendChild(indicator);
                    
                    // Create matrix-like effect
                    const createMatrixRain = () => {
                        for (let i = 0; i < 20; i++) {
                            const drop = document.createElement('div');
                            drop.textContent = Math.random() > 0.5 ? '1' : '0';
                            drop.style.cssText = `
                                position: fixed;
                                top: -20px;
                                left: ${Math.random() * window.innerWidth}px;
                                color: #10b981;
                                font-family: 'Orbitron', monospace;
                                font-size: ${Math.random() * 20 + 10}px;
                                z-index: 9998;
                                animation: matrixFall ${Math.random() * 3 + 2}s linear forwards;
                                opacity: 0.7;
                            `;
                            
                            const fallStyle = document.createElement('style');
                            fallStyle.textContent = `
                                @keyframes matrixFall {
                                    0% { transform: translateY(-20px); opacity: 0; }
                                    10% { opacity: 0.7; }
                                    90% { opacity: 0.7; }
                                    100% { transform: translateY(${window.innerHeight + 20}px); opacity: 0; }
                                }
                            `;
                            
                            document.head.appendChild(fallStyle);
                            document.body.appendChild(drop);
                            
                            setTimeout(() => {
                                if (document.body.contains(drop)) {
                                    document.body.removeChild(drop);
                                }
                                if (document.head.contains(fallStyle)) {
                                    document.head.removeChild(fallStyle);
                                }
                            }, 5000);
                        }
                    };
                    
                    createMatrixRain();
                    
                    setTimeout(() => {
                        if (document.body.contains(indicator)) {
                            document.body.removeChild(indicator);
                        }
                        if (document.head.contains(enhancedStyle)) {
                            document.head.removeChild(enhancedStyle);
                        }
                        document.body.style.filter = '';
                    }, 4000);
                    
                    konamiSequence = [];
                }
            });

            // Add smooth scroll behavior for internal links
            document.addEventListener('click', (e) => {
                if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(e.target.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });

            // Add hover sound effect simulation (visual feedback)
            document.addEventListener('mouseover', (e) => {
                if (e.target.classList.contains('action-btn') || 
                    e.target.classList.contains('glass-card') || 
                    e.target.classList.contains('info-panel')) {
                    
                    const hoverEffect = document.createElement('div');
                    hoverEffect.style.cssText = `
                        position: fixed;
                        top: 10px;
                        right: 10px;
                        width: 4px;
                        height: 4px;
                        background: #9333ea;
                        border-radius: 50%;
                        z-index: 9999;
                        animation: hoverPulse 0.3s ease-out;
                        box-shadow: 0 0 10px #9333ea;
                    `;
                    
                    const hoverStyle = document.createElement('style');
                    hoverStyle.textContent = `
                        @keyframes hoverPulse {
                            0% { transform: scale(1); opacity: 1; }
                            100% { transform: scale(3); opacity: 0; }
                        }
                    `;
                    
                    document.head.appendChild(hoverStyle);
                    document.body.appendChild(hoverEffect);
                    
                    setTimeout(() => {
                        if (document.body.contains(hoverEffect)) {
                            document.body.removeChild(hoverEffect);
                        }
                        if (document.head.contains(hoverStyle)) {
                            document.head.removeChild(hoverStyle);
                        }
                    }, 300);
                }
            });
        });