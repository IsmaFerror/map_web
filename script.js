/**
 * FRX SYSTEM v1.8 - FULL GLOBAL INTEL DATABASE
 */

const width = window.innerWidth, height = window.innerHeight;
const isMobile = width < 768;
const topBarHeight = isMobile ? 55 : 75; 

const svg = d3.select("#map-container").append("svg").attr("width", width).attr("height", height);
const g = svg.append("g");
const projection = d3.geoMercator().scale(isMobile ? 100 : 150).translate([width / 2, height / 1.5]);
const path = d3.geoPath().projection(projection);

// Límites de movimiento dinámicos
const xLim = isMobile ? width * 1.5 : width * 0.1;
const zoom = d3.zoom().scaleExtent([1, 12])
    .translateExtent([[-xLim, -height * 0.5], [width + xLim, height * 1.5]])
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
        g.selectAll(".country").style("stroke-width", 0.5 / event.transform.k + "px");
    });
svg.call(zoom);

// --- BASE DE DATOS MASIVA FRX ---
const intelDB = {
    // --- AMÉRICA ---
    "Antigua and Barbuda": { cap: "Saint John's", fact: "> Nodo Marítimo: Conocida como la tierra de las 365 playas." },
    "Argentina": { cap: "Buenos Aires", fact: "> Biometría: Pioneros mundiales en el uso de huellas dactilares." },
    "Bahamas": { cap: "Nassau", fact: "> Aguas Profundas: Alberga la fosa oceánica 'Lengua del Océano'." },
    "Barbados": { cap: "Bridgetown", fact: "> Origen: Lugar de nacimiento del ron y la cantante Rihanna." },
    "Belize": { cap: "Belmopan", fact: "> Bio-Sistema: Posee la segunda barrera de coral más grande del mundo." },
    "Bolivia": { cap: "Sucre", fact: "> Energía: Mayor reserva mundial de Litio en el Salar de Uyuni." },
    "Brazil": { cap: "Brasilia", fact: "> Pulmón Global: El Amazonas produce el 20% del oxígeno terrestre." },
    "Canada": { cap: "Ottawa", fact: "> Reserva Hídrica: Tiene más lagos que todos los países juntos." },
    "Chile": { cap: "Santiago", fact: "> Astronomía: Posee los cielos más limpios para la observación espacial." },
    "Colombia": { cap: "Bogotá", fact: "> Riqueza: Único país sudamericano con costas en ambos océanos." },
    "Costa Rica": { cap: "San José", fact: "> Sostenibilidad: Funciona casi al 100% con energía renovable." },
    "Cuba": { cap: "Havana", fact: "> Salud: Pioneros en biotecnología y vacunas contra el cáncer." },
    "Dominica": { cap: "Roseau", fact: "> Geotermia: Isla con la mayor concentración de volcanes activos." },
    "Dominican Republic": { cap: "Santo Domingo", fact: "> Historia: Sede de la primera catedral y universidad de América." },
    "Ecuador": { cap: "Quito", fact: "> Biodiversidad: Primer país en dar derechos constitucionales a la naturaleza." },
    "El Salvador": { cap: "San Salvador", fact: "> Cripto-Nodo: Primer país en adoptar Bitcoin como moneda de curso legal." },
    "Grenada": { cap: "St. George's", fact: "> Producción: Conocida como la 'Isla de las Especias' (Nuez moscada)." },
    "Guatemala": { cap: "Guatemala City", fact: "> Herencia Maya: El nombre significa 'Lugar de muchos árboles'." },
    "Guyana": { cap: "Georgetown", fact: "> Recursos: Posee uno de los crecimientos económicos más rápidos por petróleo." },
    "Haiti": { cap: "Port-au-Prince", fact: "> Soberanía: Primera república negra independiente del mundo." },
    "Honduras": { cap: "Tegucigalpa", fact: "> Arqueología: Hogar de las ruinas de Copán, nodo cultural Maya." },
    "Jamaica": { cap: "Kingston", fact: "> Velocidad: País con la mayor densidad de corredores de élite por km2." },
    "Mexico": { cap: "Mexico City", fact: "> Megalópolis: Construida sobre las ruinas de la antigua Tenochtitlan." },
    "Nicaragua": { cap: "Managua", fact: "> Hidrografía: Único país con tiburones de agua dulce en su gran lago." },
    "Panama": { cap: "Panama City", fact: "> Logística: El Canal mueve el 6% del comercio marítimo mundial." },
    "Paraguay": { cap: "Asunción", fact: "> Hidroelectricidad: Mayor exportador mundial de energía eléctrica neta." },
    "Peru": { cap: "Lima", fact: "> Superalimentos: Cuna de la quinua y de 3,800 tipos de patatas." },
    "Saint Kitts and Nevis": { cap: "Basseterre", fact: "> Dimensión: El país más pequeño de las Américas en área y población." },
    "Saint Lucia": { cap: "Castries", fact: "> Nobeles: Tiene el ratio más alto de Premios Nobel por habitante." },
    "Saint Vincent and the Grenadines": { cap: "Kingstown", fact: "> Localización: Escenario principal de la saga 'Piratas del Caribe'." },
    "Suriname": { cap: "Paramaribo", fact: "> Cobertura Forestal: El país más boscoso del mundo (93%)." },
    "Trinidad and Tobago": { cap: "Port of Spain", fact: "> Energía: Posee el lago de asfalto natural más grande del mundo." },
    "United States of America": { cap: "Washington D.C.", fact: "> Nodo Central: Origen de ARPANET y el GPS global." },
    "Uruguay": { cap: "Montevideo", fact: "> Conectividad: Primer país con fibra óptica en casi todos los hogares." },
    "Venezuela": { cap: "Caracas", fact: "> Energía Fósil: Posee las mayores reservas de petróleo del globo." },
    // --- EUROPA ---
    "Albania": { cap: "Tirana", fact: "> Resiliencia: Tiene más de 170,000 búnkeres de la era de la Guerra Fría." },
    "Andorra": { cap: "Andorra la Vella", fact: "> Altitud: El único país del mundo con el catalán como idioma oficial." },
    "Austria": { cap: "Vienna", fact: "> Cultura: Cuna de Mozart y el primer zoológico del mundo." },
    "Belarus": { cap: "Minsk", fact: "> IT-Hub: Conocido como el 'Silicon Valley' de Europa del Este." },
    "Belgium": { cap: "Brussels", fact: "> Política: Nodo central de la Unión Europea y la OTAN." },
    "Bosnia and Herzegovina": { cap: "Sarajevo", fact: "> Encuentro: Donde se cruzan las culturas de Oriente y Occidente." },
    "Bulgaria": { cap: "Sofia", fact: "> Longevidad: Uno de los países más antiguos que no ha cambiado su nombre." },
    "Croatia": { cap: "Zagreb", fact: "> Invento: Cuna de la corbata y del genio Nikola Tesla." },
    "Cyprus": { cap: "Nicosia", fact: "> Estrategia: Isla dividida que sirve como puente entre tres continentes." },
    "Czech Republic": { cap: "Prague", fact: "> Ciberseguridad: Sede de gigantes como Avast y AVG." },
    "Denmark": { cap: "Copenhagen", fact: "> Diseño: Hogar de LEGO y pioneros en energía eólica marina." },
    "Estonia": { cap: "Tallinn", fact: "> E-Residency: El país más digitalizado; se puede votar online desde 2005." },
    "Finland": { cap: "Helsinki", fact: "> Educación: Sistema educativo nº1 y hogar de Nokia." },
    "France": { cap: "Paris", fact: "> Infraestructura: Nodo ferroviario de alta velocidad más denso de la UE." },
    "Germany": { cap: "Berlin", fact: "> Ingeniería: Líder en industria 4.0 y energías renovables." },
    "Greece": { cap: "Athens", fact: "> Lógica: Origen de la filosofía, los juegos olímpicos y la democracia." },
    "Hungary": { cap: "Budapest", fact: "> Invención: Cuna del cubo de Rubik y del bolígrafo." },
    "Iceland": { cap: "Reykjavik", fact: "> Geotermia: 100% de su electricidad es renovable (volcánica)." },
    "Ireland": { cap: "Dublin", fact: "> Tech-Base: Sede europea de Google, Facebook y Apple." },
    "Italy": { cap: "Rome", fact: "> Patrimonio: El país con más sitios UNESCO del planeta." },
    "Latvia": { cap: "Riga", fact: "> Conectividad: Uno de los países con internet más rápido de Europa." },
    "Liechtenstein": { cap: "Vaduz", fact: "> Finanzas: Más empresas registradas que ciudadanos." },
    "Lithuania": { cap: "Vilnius", fact: "> Historia: Fue el país más grande de Europa en el siglo XIV." },
    "Luxembourg": { cap: "Luxembourg", fact: "> Economía: El PIB per cápita más alto del mundo." },
    "Malta": { cap: "Valletta", fact: "> Cine: Conocida como el Hollywood del Mediterráneo." },
    "Moldova": { cap: "Chisinau", fact: "> Vinicultura: Posee la bodega de vino más grande del mundo." },
    "Monaco": { cap: "Monaco", fact: "> Densidad: El segundo país más pequeño y el más denso." },
    "Montenegro": { cap: "Podgorica", fact: "> Naturaleza: Tiene el cañón más profundo de Europa (Tara)." },
    "Netherlands": { cap: "Amsterdam", fact: "> Conexión: Inventores del Wi-Fi, Bluetooth y el microscopio." },
    "Norway": { cap: "Oslo", fact: "> Electrificación: Mayor ratio de coches eléctricos del mundo." },
    "Poland": { cap: "Warsaw", fact: "> Resurrección: Su capital fue reconstruida totalmente tras la guerra." },
    "Portugal": { cap: "Lisbon", fact: "> Navegación: Estableció la primera ruta comercial global." },
    "Romania": { cap: "Bucharest", fact: "> Velocidad: Nodo de internet Gigabit líder en el bloque este." },
    "Russia": { cap: "Moscow", fact: "> Espacio: Nodo del cosmódromo de Baikonur y la tecnología Soyuz." },
    "San Marino": { cap: "San Marino", fact: "> Antigüedad: La república constitucional más antigua del mundo." },
    "Serbia": { cap: "Belgrade", fact: "> Energía: Lugar de nacimiento de 17 emperadores romanos." },
    "Slovakia": { cap: "Bratislava", fact: "> Automoción: Mayor productor de coches per cápita del mundo." },
    "Slovenia": { cap: "Ljubljana", fact: "> Ecología: Nombrado el país más sostenible del mundo." },
    "Spain": { cap: "Madrid", fact: "> Táctica: Inventores del submarino, el autogiro y el traje espacial." },
    "Sweden": { cap: "Stockholm", fact: "> Audio-Tech: Cuna de Spotify y pioneros en el protocolo Bluetooth." },
    "Switzerland": { cap: "Bern", fact: "> Colisionador: Nodo del CERN donde nació la World Wide Web." },
    "Ukraine": { cap: "Kyiv", fact: "> Aviación: Diseñaron el Antonov-225, el avión más grande de la historia." },
    "United Kingdom": { cap: "London", fact: "> Computación: Nodo de Bletchley Park, origen de la IA moderna." },
    "Vatican City": { cap: "Vatican City", fact: "> Soberanía: El estado independiente más pequeño del mundo." },
    // --- ASIA Y ORIENTE MEDIO ---
    "Afghanistan": { cap: "Kabul", fact: "> Terreno: Geografía de alta montaña que dificulta la señal satelital." },
    "Armenia": { cap: "Yerevan", fact: "> Ajedrez: El primer país en el mundo en hacerlo materia obligatoria en escuelas." },
    "Azerbaijan": { cap: "Baku", fact: "> Energía: Ubicación del primer pozo petrolero mecanizado del mundo." },
    "Bahrain": { cap: "Manama", fact: "> Conectividad: Nodo financiero principal del Golfo Pérsico." },
    "Bangladesh": { cap: "Dhaka", fact: "> Manufactura: Segundo mayor exportador de textiles del sistema global." },
    "Bhutan": { cap: "Thimphu", fact: "> Estatus: Único país con huella de carbono negativa (absorbe más CO2 del que emite)." },
    "Brunei": { cap: "Bandar Seri Begawan", fact: "> Recursos: Economía basada casi totalmente en gas natural y crudo." },
    "Cambodia": { cap: "Phnom Penh", fact: "> Estructura: Alberga Angkor Wat, el monumento religioso más grande del planeta." },
    "China": { cap: "Beijing", fact: "> Firewall: Posee el sistema de censura y control de datos más avanzado (The Great Firewall)." },
    "India": { cap: "New Delhi", fact: "> Nodo IT: Principal exportador mundial de ingenieros de software y lógica algorítmica." },
    "Indonesia": { cap: "Jakarta", fact: "> Archipiélago: Nodo de 17,508 islas. Punto crítico del Cinturón de Fuego." },
    "Iran": { cap: "Tehran", fact: "> Criptografía: Cuna de Al-Juarismi, el matemático que dio nombre a los algoritmos." },
    "Iraq": { cap: "Baghdad", fact: "> Historia: Ubicación de Mesopotamia, donde se escribió el primer código de leyes (Hammurabi)." },
    "Israel": { cap: "Jerusalem", fact: "> Ciber-Defensa: Nodo de la Unidad 8200, élite mundial en inteligencia electrónica." },
    "Japan": { cap: "Tokyo", fact: "> Robótica: Posee la mayor densidad de robots por operario en la industria." },
    "Jordan": { cap: "Amman", fact: "> Refugio: Nodo de estabilidad en una zona de alta fricción geopolítica." },
    "Kazakhstan": { cap: "Astana", fact: "> Espacio: Sede del Cosmódromo de Baikonur, lanzadera de la tecnología Soyuz." },
    "Kuwait": { cap: "Kuwait City", fact: "> Divisa: Posee la moneda de mayor valor nominal del mundo (Dinar kuwaití)." },
    "Kyrgyzstan": { cap: "Bishkek", fact: "> Tradición: El poema épico más largo del mundo (Manas) se preserva aquí." },
    "Laos": { cap: "Vientiane", fact: "> Hidroelectricidad: Aspiran a ser la 'batería del sudeste asiático' mediante presas." },
    "Lebanon": { cap: "Beirut", fact: "> Comercio: Históricamente conocidos como los fenicios, maestros de la navegación comercial." },
    "Malaysia": { cap: "Kuala Lumpur", fact: "> Hardware: Nodo crítico en la cadena de montaje de semiconductores globales." },
    "Mongolia": { cap: "Ulaanbaatar", fact: "> Densidad: El país soberano con menor densidad de población del mundo." },
    "Myanmar": { cap: "Naypyidaw", fact: "> Recursos: Posee las mayores reservas de jade y rubíes del sistema." },
    "Nepal": { cap: "Kathmandu", fact: "> Altitud: Nodo del Monte Everest, el punto más alto sobre el nivel del mar." },
    "North Korea": { cap: "Pyongyang", fact: "> Intranet: Utilizan una red cerrada propia llamada 'Kwangmyong' (Estrella Brillante)." },
    "Oman": { cap: "Muscat", fact: "> Estrategia: Controla el Estrecho de Ormuz, el punto de paso petrolero más crítico." },
    "Pakistan": { cap: "Islamabad", fact: "> Nuclear: Única potencia nuclear declarada del mundo islámico." },
    "Philippines": { cap: "Manila", fact: "> Redes: Nodo con mayor volumen de envío de mensajes de texto per cápita." },
    "Qatar": { cap: "Doha", fact: "> Media: Sede de Al Jazeera, el nodo de noticias más influyente del mundo árabe." },
    "Saudi Arabia": { cap: "Riyadh", fact: "> Megaproyecto: Desarrollando 'NEOM', la primera ciudad 100% automatizada e IA." },
    "Singapore": { cap: "Singapore", fact: "> Smart City: La ciudad-estado más digitalizada y eficiente del planeta." },
    "South Korea": { cap: "Seoul", fact: "> Conexión: Nodo líder en adopción de 5G y redes de ultra-velocidad." },
    "Sri Lanka": { cap: "Colombo", fact: "> Datos: Primer país de Asia en introducir una red de datos 4G completa." },
    "Syria": { cap: "Damascus", fact: "> Antigüedad: Su capital es una de las ciudades habitadas más antiguas del mundo." },
    "Taiwan": { cap: "Taipei", fact: "> Silicio: Produce más del 60% de los microchips del mundo (TSMC)." },
    "Thailand": { cap: "Bangkok", fact: "> Soberanía: Único país del Sudeste Asiático que nunca fue colonizado por europeos." },
    "Turkey": { cap: "Ankara", fact: "> Enlace: Único país situado físicamente en dos continentes (Europa y Asia)." },
    "United Arab Emirates": { cap: "Abu Dhabi", fact: "> IA: Primer país del mundo en nombrar un Ministro de Inteligencia Artificial." },
    "Uzbekistan": { cap: "Tashkent", fact: "> Doble Aislamiento: Uno de los dos únicos países del mundo rodeados solo por países sin salida al mar." },
    "Vietnam": { cap: "Hanoi", fact: "> Crecimiento: Nodo de manufactura tecnológica que compite directamente con China." },
    // --- ÁFRICA ---
    "Algeria": { cap: "Algiers", fact: "> Dimensión: El país más grande de África tras la división de Sudán." },
    "Angola": { cap: "Luanda", fact: "> Energía: Nodo principal de exportación de crudo hacia el mercado asiático." },
    "Botswana": { cap: "Gaborone", fact: "> Minerales: Mayor productor de diamantes de alta calidad por valor." },
    "Cameroon": { cap: "Yaoundé", fact: "> Diversidad: Conocido como 'África en miniatura' por su variedad climática." },
    "Democratic Republic of the Congo": { cap: "Kinshasa", fact: "> Materia Prima: Posee el 70% del Cobalto mundial, vital para baterías." },
    "Egypt": { cap: "Cairo", fact: "> Canal: El Canal de Suez es el nodo de tráfico marítimo más vital del hemisferio norte." },
    "Ethiopia": { cap: "Addis Ababa", fact: "> Independencia: Único país africano que nunca fue colonizado (excepto breve ocupación)." },
    "Ghana": { cap: "Accra", fact: "> Estabilidad: Nodo de crecimiento democrático y tecnológico en África Occidental." },
    "Ivory Coast": { cap: "Yamoussoukro", fact: "> Cacao: Nodo suministrador del 40% del cacao mundial." },
    "Kenya": { cap: "Nairobi", fact: "> M-Pesa: Líder global en sistemas de pago y banca móvil (Fintech)." },
    "Libya": { cap: "Tripoli", fact: "> Reservas: Posee las mayores reservas probadas de petróleo de todo el continente." },
    "Madagascar": { cap: "Antananarivo", fact: "> Endemismo: El 90% de su flora y fauna no existe en ningún otro lugar." },
    "Morocco": { cap: "Rabat", fact: "> Energía Solar: Alberga la planta termosolar más grande del mundo (Noor Ouarzazate)." },
    "Nigeria": { cap: "Abuja", fact: "> Población: Nodo demográfico masivo; se estima que superará a USA en 2050." },
    "Rwanda": { cap: "Kigali", fact: "> Digital: Aspiran a ser el 'Smart Hub' de África con fibra óptica nacional." },
    "Senegal": { cap: "Dakar", fact: "> Cultura: Puerta de salida histórica y nodo cultural de África Francófona." },
    "South Africa": { cap: "Pretoria", fact: "> Infraestructura: Nodo de cables submarinos que conectan el Atlántico con el Índico." },
    "Sudan": { cap: "Khartoum", fact: "> Arqueología: Tiene más pirámides que Egipto (alrededor de 250)." },
    "Tanzania": { cap: "Dodoma", fact: "> Geología: Hogar del Kilimanjaro y el único lugar donde se extrae Tanzanita." },
    "Tunisia": { cap: "Tunis", fact: "> Digitalización: Nodo pionero en el mundo árabe en libertad de prensa digital." },
    "Uganda": { cap: "Kampala", fact: "> Juventud: Posee una de las poblaciones más jóvenes del sistema global." },
    "Zambia": { cap: "Lusaka", fact: "> Cobre: Uno de los 10 mayores productores de cobre para cableado eléctrico." },
    "Zimbabwe": { cap: "Harare", fact: "> Alfabetización: Históricamente ha tenido las tasas de alfabetización más altas de África." },
    // --- OCEANÍA ---
    "Australia": { cap: "Canberra", fact: "> Datos: Alberga el 'Square Kilometre Array', el radiotelescopio más potente del mundo." },
    "Fiji": { cap: "Suva", fact: "> Cambio Climático: Nodo central en la lucha global contra la subida del nivel del mar." },
    "New Zealand": { cap: "Wellington", fact: "> Cine: Nodo de producción de efectos visuales masivos (Weta Digital)." },
    "Papua New Guinea": { cap: "Port Moresby", fact: "> Lenguaje: Nodo de diversidad lingüística con más de 800 idiomas." },
    "Solomon Islands": { cap: "Honiara", fact: "> Historia: Escenario de batallas navales críticas en la Guerra del Pacífico." },
    "Vanuatu": { cap: "Port Vila", fact: "> Resiliencia: Clasificado a menudo como el país más vulnerable a desastres naturales." },
};

const tooltip = d3.select("#tooltip");
let activeCountry = d3.select(null), linkLine = null;

d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
    document.getElementById("loading-msg").style.display = "none";
    g.selectAll("path").data(data.features).enter().append("path")
        .attr("class", "country").attr("d", path)
        .on("click", (event, d) => {
            if (activeCountry.node() === event.currentTarget) return reset();
            activeCountry.classed("active", false); if (linkLine) linkLine.remove();
            tooltip.style("opacity", 0);
            activeCountry = d3.select(event.currentTarget).classed("active", true);

            const name = d.properties.name || "Unknown Sector";
            const pop = (d.properties.pop_est / 1000000).toFixed(1);
            
            // Búsqueda inteligente o generación de emergencia
            let intel = intelDB[name];
            if (!intel) {
    intel = { 
        cap: "LOCAL_NODE_" + (Math.random() * 999).toFixed(0), 
        fact: `> SECTOR: ${name.toUpperCase()} // STATUS: Conexión establecida. Datos de inteligencia restringidos o encriptados.` 
    };
}

            d3.select("#tt-name").text("> " + name.toUpperCase());
            d3.select("#tt-capital").text("CAPITAL: " + intel.cap);
            d3.select("#tt-pop").text(pop);
            d3.select("#tt-fact").text(intel.fact);

            const bounds = path.bounds(d), x = (bounds[0][0] + bounds[1][0]) / 2, y = (bounds[0][1] + bounds[1][1]) / 2;
            const dx = bounds[1][0] - bounds[0][0], dy = bounds[1][1] - bounds[0][1];
            const scale = Math.min(8, 0.8 / Math.max(dx / width, dy / height));
            const translate = [width/2 - scale*x, (height/2 - scale*y) + (isMobile ? 30 : 60)];

            svg.transition().duration(800).ease(d3.easeCubicInOut)
                .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
                .on("end", () => drawConnection(x, y, scale, translate));
        });
});

function drawConnection(cx, cy, scale, translate) {
    if (linkLine) linkLine.remove();
    const sx = translate[0] + cx*scale, sy = translate[1] + cy*scale;
    const tx = isMobile ? width/2 : sx + 100, ty = sy - (isMobile ? 120 : 80);

    linkLine = svg.append("line").attr("class", "connection-line")
        .attr("x1", sx).attr("y1", sy).attr("x2", sx).attr("y2", sy);

    linkLine.transition().duration(400).attr("x2", tx).attr("y2", ty)
        .on("end", () => {
            tooltip.style("left", tx + "px").style("top", (ty + topBarHeight) + "px").style("opacity", 1);
        });
}

function reset() {
    activeCountry.classed("active", false); activeCountry = d3.select(null);
    tooltip.style("opacity", 0); if (linkLine) linkLine.remove();
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
}

svg.on("click", (event) => { if (event.target.tagName !== "path") reset(); });
window.addEventListener('resize', () => {
    svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
});