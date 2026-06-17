import re

with open('products.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_grid_in_section(section_id, new_grid_html):
    global content
    sec_start = content.find(f'<section id="{section_id}"')
    if sec_start == -1:
        print(f"Section {section_id} not found.")
        return
    
    # Try to find minimal-product-grid first
    grid_start = content.find('<div class="minimal-product-grid"', sec_start)
    if grid_start == -1:
        # Fallback to prod-grid if minimal is not found
        grid_start = content.find('<div class="prod-grid"', sec_start)
        
    if grid_start == -1:
        print(f"Grid not found in section {section_id}.")
        return
        
    # Find matching closing div for grid
    depth = 0
    grid_end = -1
    pos = grid_start
    while pos < len(content):
        if content.startswith('<div', pos):
            depth += 1
            pos += 4
        elif content.startswith('</div', pos):
            depth -= 1
            if depth == 0:
                grid_end = pos + 6
                break
            pos += 5
        else:
            pos += 1
    
    if grid_end != -1:
        content = content[:grid_start] + new_grid_html + content[grid_end:]
    else:
        print(f"Could not find matching end div for grid in section {section_id}.")

electric_new = '''<div class="minimal-product-grid">
                <!-- TK-EWH-010 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/cylinder-series-l.png" alt="Tekcon ThermoStore 10L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Compact • 10L</span>
                        <h3 class="minimal-product-name">ThermoStore 10L</h3>
                        <p class="minimal-product-desc">Ideal compact heater for single bathrooms and studio apartments.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-EWH-030 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/cylinder-series-l.png" alt="Tekcon ThermoStore 30L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Popular • 30L</span>
                        <h3 class="minimal-product-name">ThermoStore 30L</h3>
                        <p class="minimal-product-desc">The most popular choice for small families and two-person households.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-EWH-050 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/cylinder-series-l.png" alt="Tekcon ThermoStore 50L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Best Seller • 50L</span>
                        <h3 class="minimal-product-name">ThermoStore 50L</h3>
                        <p class="minimal-product-desc">Our best-selling model — perfect for families of four and multi-bathroom homes.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-EWH-080 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/commercial_water_heater_1781282932124.png" alt="Tekcon ThermoStore 80L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Commercial • 80L</span>
                        <h3 class="minimal-product-name">ThermoStore 80L</h3>
                        <p class="minimal-product-desc">Heavy-duty storage heater for apartments, guesthouses, and commercial buildings.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>'''
replace_grid_in_section('electric-storage', electric_new)

instant_new = '''<div class="minimal-product-grid" style="grid-template-columns:1fr 1fr;">
                <!-- TK-IWH-035 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/instant-solo-dsk45v.png" alt="InstantFlow 3.5kW">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Instant Heat • 3.5kW</span>
                        <h3 class="minimal-product-name">InstantFlow 3.5 kW</h3>
                        <p class="minimal-product-desc">Compact tankless heater — ideal for single showers and small apartments.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-IWH-055 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/instant-solo-dsk45v.png" alt="InstantFlow 5.5kW">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Popular • 5.5kW</span>
                        <h3 class="minimal-product-name">InstantFlow 5.5 kW</h3>
                        <p class="minimal-product-desc">High-flow instant heater suitable for shower plus basin in family use.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>'''
replace_grid_in_section('instant', instant_new)

solar_new = '''<div class="minimal-product-grid" style="grid-template-columns:1fr 1fr;">
                <!-- TK-SOL-150 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/solar_water_heater_1781282911006.png" alt="SolarWarm 150L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Solar • 150L</span>
                        <h3 class="minimal-product-name">SolarWarm 150L</h3>
                        <p class="minimal-product-desc">High-efficiency evacuated tube system for villas and family homes.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-SOL-200 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/solar_water_heater_1781282911006.png" alt="SolarWarm 200L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Solar • 200L</span>
                        <h3 class="minimal-product-name">SolarWarm 200L</h3>
                        <p class="minimal-product-desc">Larger-capacity solar system for bigger homes, schools, and small hotels.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>'''
replace_grid_in_section('solar', solar_new)

gas_new = '''<div class="minimal-product-grid" style="grid-template-columns:1fr 1fr;">
                <!-- TK-GAS-006 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/gas_boiler_1781282920543.png" alt="GasFlow 6L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Gas • 6L/min</span>
                        <h3 class="minimal-product-name">GasFlow 6L/min</h3>
                        <p class="minimal-product-desc">Reliable and affordable gas heater — perfect for homes with LPG.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <!-- TK-GAS-016 -->
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <img src="images/gas_boiler_1781282920543.png" alt="GasFlow 16L">
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">Gas • 16L/min</span>
                        <h3 class="minimal-product-name">GasFlow 16L/min</h3>
                        <p class="minimal-product-desc">High-capacity commercial gas heater for hotels, guesthouses and clinics.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>'''
replace_grid_in_section('gas', gas_new)

accessories_new = '''<div class="minimal-product-grid">
                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <i class="fas fa-shield-alt" style="font-size: 5rem; color: #88B291; margin-bottom: 2rem;"></i>
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">TK-ACC-PRV</span>
                        <h3 class="minimal-product-name">Pressure Relief Valve</h3>
                        <p class="minimal-product-desc">Universal safety valve — protects your tank from over-pressure. Fits all Tekcon storage heaters.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <i class="fas fa-magnet" style="font-size: 5rem; color: #88B291; margin-bottom: 2rem;"></i>
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">TK-ACC-ANO</span>
                        <h3 class="minimal-product-name">Magnesium Anode Rod</h3>
                        <p class="minimal-product-desc">Sacrificial anode rod that prevents inner tank rust — extends heater lifespan by 5+ years.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>

                <div class="minimal-product-item" onclick="window.location.href='contact.html'">
                    <div class="minimal-product-img-wrap">
                        <i class="fas fa-thermometer-half" style="font-size: 5rem; color: #88B291; margin-bottom: 2rem;"></i>
                    </div>
                    <div class="minimal-product-info">
                        <span class="minimal-product-series">TK-ACC-THM</span>
                        <h3 class="minimal-product-name">Replacement Thermostat</h3>
                        <p class="minimal-product-desc">OEM-grade thermostat for all Tekcon electric storage heaters.</p>
                        <span class="minimal-product-cta">Enquire Now <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>'''
replace_grid_in_section('accessories', accessories_new)

with open('products.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
