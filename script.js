/**
 * FRX SYSTEM v2.0 - GLOBAL TACTICAL INTERFACE
 * Base de datos masiva y motor de búsqueda inteligente.
 */

const width = window.innerWidth, height = window.innerHeight;
const isMobile = width < 768;
const topBarHeight = isMobile ? 55 : 75; 

// 1. Configuración del lienzo SVG
const svg = d3.select("#map-container").append("svg").attr("width", width).attr("height", height);
const g = svg.append("g");
const projection = d3.geoMercator().scale(isMobile ? 100 : 150).translate([width / 2, height / 1.5]);
const path = d3.geoPath().projection(projection);

// 2. Sistema de Zoom y Límites
const xLim = isMobile ? width * 1.5 : width * 0.1;
const zoom = d3.zoom().scaleExtent([1, 12])
    .translateExtent([[-xLim, -height * 0.5], [width + xLim, height * 1.5]])
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
        g.selectAll(".country").style("stroke-width", 0.5 / event.transform.k + "px");
    });
svg.call(zoom);

// 3. BASE DE DATOS MAESTRA (intelDB) - Ampliada y corregida
const intelDB = {
    // --- EUROPA ---
    "Albania": { cap: "Tirana", pop: "2.8", fact: "> Resiliencia: Tiene más de 170,000 búnkeres de la Guerra Fría." },
    "Andorra": { cap: "Andorra la Vella", pop: "0.08", fact: "> Altitud: Único país con el catalán como idioma oficial." },
    "Austria": { cap: "Viena", pop: "9.1", fact: "> Cultura: Cuna de la física moderna y el primer zoológico del mundo." },
    "Belarus": { cap: "Minsk", pop: "9.2", fact: "> IT-Hub: Conocido como el 'Silicon Valley' de Europa del Este." },
    "Belgium": { cap: "Bruselas", pop: "11.7", fact: "> Política: Nodo central de la Unión Europea y la OTAN." },
    "Bulgaria": { cap: "Sofía", pop: "6.4", fact: "> Longevidad: País más antiguo que conserva su nombre original." },
    "Croatia": { cap: "Zagreb", pop: "3.8", fact: "> Invento: Cuna de la corbata y lugar de nacimiento de Tesla." },
    "Czech Republic": { cap: "Praga", pop: "10.7", fact: "> Ciberseguridad: Sede de gigantes como Avast y AVG." },
    "Denmark": { cap: "Copenhague", pop: "5.9", fact: "> Energía: Pioneros mundiales en tecnología eólica marina." },
    "Estonia": { cap: "Tallinn", pop: "1.3", fact: "> Digital: El país más digitalizado; se vota online desde 2005." },
    "Finland": { cap: "Helsinki", pop: "5.5", fact: "> Educación: Sistema educativo nº1 del bloque europeo." },
    "France": { cap: "Paris", pop: "67.8", fact: "> Alcance Global: País con más husos horarios del sistema." },
    "Germany": { cap: "Berlin", pop: "83.2", fact: "> Ingeniería: Líder en industria 4.0 y energías renovables." },
    "Greece": { cap: "Atenas", pop: "10.3", fact: "> Algoritmos: Origen de la lógica occidental y la democracia." },
    "Hungary": { cap: "Budapest", pop: "9.7", fact: "> Innovación: Cuna del Cubo de Rubik y el bolígrafo." },
    "Iceland": { cap: "Reykjavik", pop: "0.4", fact: "> Geotermia: 100% de su electricidad es volcánica/renovable." },
    "Ireland": { cap: "Dublín", pop: "5.1", fact: "> Tech-Base: Sede europea de Google, Facebook y Apple." },
    "Italy": { cap: "Roma", pop: "58.9", fact: "> Patrimonio: El país con más sitios UNESCO del planeta." },
    "Netherlands": { cap: "Amsterdam", pop: "17.7", fact: "> Conexión: Inventores del Wi-Fi, Bluetooth y el microscopio." },
    "Norway": { cap: "Oslo", pop: "5.4", fact: "> Electrificación: Mayor ratio de coches eléctricos del mundo." },
    "Poland": { cap: "Varsovia", pop: "37.7", fact: "> Resiliencia: Capital reconstruida totalmente tras la guerra." },
    "Portugal": { cap: "Lisboa", pop: "10.3", fact: "> Navegación: Estableció la primera ruta comercial global." },
    "Romania": { cap: "Bucarest", pop: "19.0", fact: "> Velocidad: Nodo de internet Gigabit líder en el bloque este." },
    "Russia": { cap: "Moscú", pop: "143.4", fact: "> Espacio: Nodo del cosmódromo de Baikonur y tecnología Soyuz." },
    "Spain": { cap: "Madrid", pop: "47.5", fact: "> Táctica: Inventores del submarino, el autogiro y el traje espacial." },
    "Sweden": { cap: "Estocolmo", pop: "10.5", fact: "> Audio-Tech: Cuna de Spotify y pioneros en el Bluetooth." },
    "Switzerland": { cap: "Berna", pop: "8.8", fact: "> Física: Nodo del CERN donde nació la World Wide Web." },
    "Ukraine": { cap: "Kiev", pop: "38.0", fact: "> Ingeniería: Fabricantes del avión más grande del mundo." },
    "United Kingdom": { cap: "London", pop: "67.0", fact: "> Computación: Nodo de Bletchley Park, origen de la IA moderna." },
    "UK": { cap: "London", pop: "67.0", fact: "> Computación: Nodo de Bletchley Park, origen de la IA moderna." },
    "England": { cap: "London", pop: "67.0", fact: "> Computación: Nodo de Bletchley Park, origen de la IA moderna." },
    "Great Britain": { cap: "London", pop: "67.0", fact: "> Computación: Nodo de Bletchley Park, origen de la IA moderna." },
    "Cyprus": { cap: "Nicosia", pop: "1.2", fact: "> Estrategia: Isla dividida que sirve como puente entre tres continentes." },
    "Latvia": { cap: "Riga", pop: "1.8", fact: "> Conectividad: Uno de los países con internet más rápido de Europa." },
    "Lithuania": { cap: "Vilnius", pop: "2.8", fact: "> Historia: Fue el país más grande de Europa en el siglo XIV." },
    "Luxembourg": { cap: "Luxemburgo", pop: "0.6", fact: "> Economía: El PIB per cápita más alto del sistema global." },
    "Malta": { cap: "Valletta", pop: "0.5", fact: "> Cine: Conocida como el 'Hollywood del Mediterráneo' por sus rodajes." },
    "Moldova": { cap: "Chisinau", pop: "2.6", fact: "> Vinicultura: Posee la bodega de vino más grande del mundo." },
    "Serbia": { cap: "Belgrado", pop: "6.7", fact: "> Historia: Lugar de nacimiento de 17 emperadores romanos." },
    "Slovakia": { cap: "Bratislava", pop: "5.4", fact: "> Automoción: Mayor productor de coches per cápita del mundo." },
    

    // --- ASIA Y OCEANÍA ---
    "Afghanistan": { cap: "Kabul", pop: "41.1", fact: "> Terreno: Geografía de alta montaña que dificulta señales." },
    "Australia": { cap: "Canberra", pop: "26.0", fact: "> Datos: Alberga el radiotelescopio más potente del mundo." },
    "China": { cap: "Beijing", pop: "1412.0", fact: "> Firewall: Sistema de control de datos más avanzado del mundo." },
    "India": { cap: "Nueva Delhi", pop: "1408.0", fact: "> Nodo IT: Principal exportador mundial de ingenieros." },
    "Indonesia": { cap: "Jakarta", pop: "275.5", fact: "> Archipiélago: Nodo de 17,508 islas en el Cinturón de Fuego." },
    "Iran": { cap: "Teherán", pop: "88.5", fact: "> Criptografía: Cuna de Al-Juarismi, padre de los algoritmos." },
    "Iraq": { cap: "Bagdad", pop: "44.5", fact: "> Historia: Mesopotamia; ubicación del primer código de leyes." },
    "Israel": { cap: "Jerusalén", pop: "9.5", fact: "> Ciberseguridad: Mayor densidad de startups tecnológicas." },
    "Japan": { cap: "Tokio", pop: "125.7", fact: "> Robótica: Posee la mayor densidad de robots industriales." },
    "Kazakhstan": { cap: "Astana", pop: "19.4", fact: "> Espacio: Sede del Cosmódromo de Baikonur (Soyuz)." },
    "Malaysia": { cap: "Kuala Lumpur", pop: "33.9", fact: "> Hardware: Nodo crítico en la cadena de semiconductores." },
    "Mongolia": { cap: "Ulaanbaatar", pop: "3.4", fact: "> Densidad: El país soberano con menor densidad de población." },
    "New Zealand": { cap: "Wellington", pop: "5.1", fact: "> Cine: Nodo masivo de producción de efectos visuales." },
    "North Korea": { cap: "Pyongyang", pop: "26.0", fact: "> Red: Utilizan una red cerrada propia llamada 'Kwangmyong'." },
    "Pakistan": { cap: "Islamabad", pop: "235.8", fact: "> Nuclear: Única potencia nuclear del mundo islámico." },
    "Philippines": { cap: "Manila", pop: "115.5", fact: "> Redes: Nodo con mayor volumen de SMS per cápita." },
    "Saudi Arabia": { cap: "Riad", pop: "36.4", fact: "> Megaproyecto: Desarrollando 'NEOM', ciudad automatizada por IA." },
    "Singapore": { cap: "Singapur", pop: "5.6", fact: "> Smart City: La ciudad-estado más digitalizada del planeta." },
    "South Korea": { cap: "Seúl", pop: "51.8", fact: "> Conexión: Nodo líder en adopción de redes 5G ultra-veloces." },
    "Taiwan": { cap: "Taipei", pop: "23.9", fact: "> Silicio: Produce más del 60% de los microchips mundiales." },
    "Thailand": { cap: "Bangkok", pop: "71.6", fact: "> Soberanía: Único país del Sudeste Asiático nunca colonizado." },
    "Vietnam": { cap: "Hanoi", pop: "98.2", fact: "> Manufactura: Nodo de hardware emergente del bloque asiático." },
    "Bangladesh": { cap: "Dhaka", pop: "171.2", fact: "> Manufactura: Segundo mayor exportador de textiles del mundo." },
    "Cambodia": { cap: "Phnom Penh", pop: "16.7", fact: "> Estructura: Alberga Angkor Wat, el monumento religioso más grande." },
    "Jordan": { cap: "Amman", pop: "11.2", fact: "> Refugio: Nodo de estabilidad en una zona de alta fricción geopolítica." },
    "Kuwait": { cap: "Kuwait City", pop: "4.3", fact: "> Divisa: Posee la moneda de mayor valor nominal (Dinar kuwaití)." },
    "Lebanon": { cap: "Beirut", pop: "5.5", fact: "> Comercio: Históricamente conocidos como maestros de la navegación." },
    "Nepal": { cap: "Kathmandu", pop: "30.5", fact: "> Altitud: Nodo del Monte Everest, el punto más alto del globo." },
    "Oman": { cap: "Muscat", pop: "4.5", fact: "> Estrategia: Controla el Estrecho de Ormuz, paso petrolero crítico." },
    "Qatar": { cap: "Doha", pop: "2.7", fact: "> Media: Sede de Al Jazeera, el nodo de noticias influyente del mundo árabe." },
    "Sri Lanka": { cap: "Colombo", pop: "22.2", fact: "> Datos: Primer país de Asia en introducir una red de datos 4G completa." },
    "Greenland": { cap: "Nuuk", pop: "0.05", fact: "> Mundo helado: La isla no continental más grande del sistema." },
    "Yemen": { cap: "Sanaa", pop: "33.7", fact: "> Arqueología: Hogar de los primeros rascacielos de barro en Shibam." },
    "Papua New Guinea": { cap: "Port Moresby", pop: "10.1", fact: "> Diversidad: Nodo lingüístico con más de 800 idiomas activos." },
    "Bosnia and Herz.": { cap: "Sarajevo", pop: "3.2", fact: "> Encuentro: Punto de unión histórico entre las culturas de Oriente y Occidente." },
    "Monaco": { cap: "Monaco", pop: "0.03", fact: "> Densidad: El país más densamente poblado y el segundo más pequeño." },
    "Montenegro": { cap: "Podgorica", pop: "0.6", fact: "> Naturaleza: Tiene el cañón más profundo de Europa (Río Tara)." },
    "North Macedonia": { cap: "Skopje", pop: "2.1", fact: "> Antigüedad: Lugar de nacimiento de Alejandro Magno." },
    "San Marino": { cap: "San Marino", pop: "0.03", fact: "> Historia: La república constitucional más antigua del mundo." },
    "Slovenia": { cap: "Ljubljana", pop: "2.1", fact: "> Ecología: Nombrado el país más sostenible del planeta." },
    "Vatican City": { cap: "Vatican City", pop: "0.001", fact: "> Soberanía: El estado independiente más pequeño del mundo." },
    "Czechia": { cap: "Prague", pop: "10.7", fact: "> Ciberseguridad: Sede de gigantes de la protección digital como Avast." },
    "Armenia": { cap: "Yerevan", pop: "2.8", fact: "> Ajedrez: El primer país en hacerlo materia obligatoria en las escuelas." },
    "Azerbaijan": { cap: "Baku", pop: "10.1", fact: "> Energía: Ubicación del primer pozo petrolero mecanizado del mundo." },
    "Georgia": { cap: "Tbilisi", pop: "3.7", fact: "> Origen: Considerada la cuna de la viticultura hace más de 8,000 años." },
    "Kyrgyzstan": { cap: "Bishkek", pop: "6.7", fact: "> Tradición: El poema épico más largo del mundo (Manas) se preserva aquí." },
    "Tajikistan": { cap: "Dushanbe", pop: "9.9", fact: "> Hidroeléctrica: El 90% de su energía proviene de fuentes fluviales de montaña." },
    "Turkmenistan": { cap: "Ashgabat", pop: "6.4", fact: "> Fenómeno: Ubicación del cráter 'Puertas del Infierno', ardiendo desde 1971." },
    "Uzbekistan": { cap: "Tashkent", pop: "34.9", fact: "> Ruta de la Seda: Nodo histórico de intercambio de datos y bienes." },
    "Timor-Leste": { cap: "Dili", pop: "1.3", fact: "> Reciente: Uno de los países más jóvenes del sistema (independiente en 2002)." },
    "Kiribati": { cap: "Tarawa", pop: "0.1", fact: "> Tiempo: El único país situado en los cuatro hemisferios simultáneamente." },
    "Marshall Is.": { cap: "Majuro", pop: "0.04", fact: "> Historia: Nodo de pruebas atómicas durante la Guerra Fría." },
    "Micronesia": { cap: "Palikir", pop: "0.1", fact: "> Archipiélago: Compuesto por 607 islas distribuidas en el Pacífico." },
    "Nauru": { cap: "Yaren", pop: "0.01", fact: "> Dimensión: La república más pequeña del mundo y país sin capital oficial." },
    "Palau": { cap: "Ngerulmud", pop: "0.02", fact: "> Santuario: Primer país en crear un santuario de tiburones en 2009." },
    "Samoa": { cap: "Apia", pop: "0.2", fact: "> Tiempo: El primer país en ver el amanecer por su posición geográfica." },
    "Solomon Is.": { cap: "Honiara", pop: "0.7", fact: "> Historia: Escenario de batallas navales críticas en la Guerra del Pacífico." },
    "Tonga": { cap: "Nuku'alofa", pop: "0.1", fact: "> Monarquía: El único reino soberano de la Polinesia." },
    "Tuvalu": { cap: "Funafuti", pop: "0.01", fact: "> Dominio: Su principal ingreso nacional proviene del dominio de internet '.tv'." },
    "Vanuatu": { cap: "Port Vila", pop: "0.3", fact: "> Lingüística: País con la mayor densidad de lenguas por habitante." },

    // --- AMÉRICA ---
    "Argentina": { cap: "Buenos Aires", pop: "46.2", fact: "> Biometría: Pioneros mundiales en identificación por huellas." },
    "Bolivia": { cap: "Sucre", pop: "12.3", fact: "> Recursos: Posee la mayor reserva de litio del mundo." },
    "Brazil": { cap: "Brasilia", pop: "215.3", fact: "> Pulmón Global: El Amazonas produce el 20% del oxígeno." },
    "Canada": { cap: "Ottawa", pop: "38.9", fact: "> Reserva Hídrica: Tiene más lagos que todos los países juntos." },
    "Chile": { cap: "Santiago", pop: "19.6", fact: "> Astronomía: Posee los cielos más limpios para observación." },
    "Colombia": { cap: "Bogotá", pop: "51.8", fact: "> Riqueza: Único país sudamericano con costas en ambos océanos." },
    "Costa Rica": { cap: "San José", pop: "5.2", fact: "> Sostenibilidad: Funciona casi al 100% con energía renovable." },
    "Cuba": { cap: "La Habana", pop: "11.0", fact: "> Bio-Medicina: Pioneros en vacunas avanzadas contra el cáncer." },
    "Dominican Republic": { cap: "Santo Domingo", pop: "11.3", fact: "> Histórico: Sede de la primera catedral de América." },
    "Ecuador": { cap: "Quito", pop: "18.1", fact: "> Punto Zero: Lugar donde la gravedad es ligeramente menor." },
    "El Salvador": { cap: "San Salvador", pop: "6.3", fact: "> Cripto-Nodo: Primero en adoptar Bitcoin como moneda legal." },
    "Guatemala": { cap: "Guatemala City", pop: "17.6", fact: "> Herencia: Corazón de la civilización y astronomía Maya." },
    "Honduras": { cap: "Tegucigalpa", pop: "10.4", fact: "> Arqueología: Nodo cultural Maya con las ruinas de Copán." },
    "Mexico": { cap: "Mexico City", pop: "128.9", fact: "> Megalópolis: Construida sobre las ruinas de Tenochtitlan." },
    "Nicaragua": { cap: "Managua", pop: "7.0", fact: "> Hidrografía: Único lago con tiburones de agua dulce." },
    "Panama": { cap: "Panamá City", pop: "4.4", fact: "> Logística: El Canal mueve el 6% del comercio mundial." },
    "Paraguay": { cap: "Asunción", pop: "6.8", fact: "> Energía: Nodo de la represa de Itaipú, líder hidroeléctrico." },
    "Peru": { cap: "Lima", pop: "34.3", fact: "> Genética: Cuna de más de 3,000 variedades de patatas." },
    "Uruguay": { cap: "Montevideo", pop: "3.4", fact: "> Conectividad: Primero con fibra óptica en casi todo el hogar." },
    "USA": { cap: "Washington D.C.", pop: "333.2", fact: "> Nodo Central: Origen de ARPANET y el GPS global." },
    "United States of America": { cap: "Washington D.C.", pop: "333.2", fact: "> Nodo Central: Origen de ARPANET y el GPS global." },
    "Venezuela": { cap: "Caracas", pop: "28.3", fact: "> Energía Fósil: Mayores reservas de petróleo del globo." },
    "Antigua and Barbuda": { cap: "Saint John's", pop: "0.1", fact: "> Nodo Marítimo: Conocida como la tierra de las 365 playas." },
    "Bahamas": { cap: "Nassau", pop: "0.4", fact: "> Aguas Profundas: Alberga la fosa oceánica 'Lengua del Océano'." },
    "Barbados": { cap: "Bridgetown", pop: "0.3", fact: "> Origen: Lugar de nacimiento del ron y la cantante Rihanna." },
    "Belize": { cap: "Belmopan", pop: "0.4", fact: "> Bio-Sistema: Posee la segunda barrera de coral más grande del mundo." },
    "Dominica": { cap: "Roseau", pop: "0.1", fact: "> Geotermia: Isla con la mayor concentración de volcanes activos." },
    "Grenada": { cap: "St. George's", pop: "0.1", fact: "> Producción: Conocida como la 'Isla de las Especias' (Nuez moscada)." },
    "Guyana": { cap: "Georgetown", pop: "0.8", fact: "> Recursos: Posee uno de los crecimientos económicos más rápidos por petróleo." },
    "Haiti": { cap: "Port-au-Prince", pop: "11.7", fact: "> Soberanía: Primera república negra independiente del mundo." },
    "Jamaica": { cap: "Kingston", pop: "2.8", fact: "> Velocidad: País con la mayor densidad de corredores de élite por km2." },
    "Saint Kitts and Nevis": { cap: "Basseterre", pop: "0.1", fact: "> Dimensión: El país más pequeño de las Américas en área." },
    "Saint Lucia": { cap: "Castries", pop: "0.2", fact: "> Nobeles: Tiene el ratio más alto de Premios Nobel por habitante." },
    "St. Vin. and Gren.": { cap: "Kingstown", pop: "0.1", fact: "> Localización: Escenario principal de la saga 'Piratas del Caribe'." },
    "Suriname": { cap: "Paramaribo", pop: "0.6", fact: "> Cobertura Forestal: El país más boscoso del mundo (93%)." },
    "Trinidad and Tobago": { cap: "Port of Spain", pop: "1.5", fact: "> Energía: Posee el lago de asfalto natural más grande del mundo." },
    "Falkland Is.": { cap: "Stanley", pop: "0.003", fact: "> Archipiélago: Nodo de biodiversidad subantártica y pingüinos." },
    

    // --- ÁFRICA ---
    "Algeria": { cap: "Argel", pop: "44.9", fact: "> Dimensión: El país más grande de África. Nodo de gas natural." },
    "Angola": { cap: "Luanda", pop: "35.6", fact: "> Energía: Nodo principal de exportación de crudo hacia Asia." },
    "Cameroon": { cap: "Yaundé", pop: "27.9", fact: "> Diversidad: Conocido como 'África en miniatura' por su clima variado." },
    "Egypt": { cap: "El Cairo", pop: "110.9", fact: "> Canal: El Canal de Suez es el nodo de tráfico más vital del norte." },
    "Ethiopia": { cap: "Addis Abeba", pop: "123.3", fact: "> Independencia: Único país africano que nunca fue colonizado efectivamente." },
    "Ghana": { cap: "Accra", pop: "33.4", fact: "> Estabilidad: Nodo de crecimiento tecnológico en África Occidental." },
    "Ivory Coast": { cap: "Yamoussoukro", pop: "28.1", fact: "> Cacao: Nodo suministrador del 40% del cacao mundial." },
    "Kenya": { cap: "Nairobi", pop: "54.0", fact: "> M-Pesa: Líder global en sistemas de pago y banca móvil (Fintech)." },
    "Libya": { cap: "Trípoli", pop: "6.8", fact: "> Reservas: Posee las mayores reservas probadas de petróleo del continente." },
    "Madagascar": { cap: "Antananarivo", pop: "29.6", fact: "> Endemismo: El 90% de su flora y fauna es única en el mundo." },
    "Morocco": { cap: "Rabat", pop: "37.4", fact: "> Energía Solar: Alberga la planta termosolar más grande del mundo (Noor)." },
    "Nigeria": { cap: "Abuja", pop: "218.5", fact: "> Nodo Demográfico: Se estima que superará a USA en población para 2050." },
    "Senegal": { cap: "Dakar", pop: "17.3", fact: "> Cultura: Puerta de salida histórica y nodo cultural francófono." },
    "South Africa": { cap: "Pretoria", pop: "59.8", fact: "> Infraestructura: Nodo de cables submarinos entre océanos." },
    "Sudan": { cap: "Khartoum", pop: "46.8", fact: "> Arqueología: Tiene más pirámides que Egipto (alrededor de 250)." },
    "Tanzania": { cap: "Dodoma", pop: "65.4", fact: "> Geología: Único lugar del mundo con depósitos de Tanzanita." },
    "Tunisia": { cap: "Túnez", pop: "12.3", fact: "> Digitalización: Nodo pionero en el mundo árabe en libertad de prensa." },
    "Uganda": { cap: "Kampala", pop: "47.2", fact: "> Juventud: Posee una de las poblaciones más jóvenes del sistema global." },
    "Benin": { cap: "Porto-Novo", pop: "13.3", fact: "> Tradición: Cuna histórica de la cultura y el sistema de creencias Vudú." },
    "Burkina Faso": { cap: "Ouagadougou", pop: "22.6", fact: "> Resiliencia: Su nombre significa 'Tierra de la gente íntegra'." },
    "Burundi": { cap: "Gitega", pop: "12.8", fact: "> Recursos: Posee importantes reservas de níquel y tierras raras." },
    "Central African Rep.": { cap: "Bangui", pop: "5.5", fact: "> Geología: Ubicación de la Anomalía de Bangui, un misterio magnético terrestre." },
    "Chad": { cap: "N'Djamena", pop: "17.7", fact: "> Hidrología: El Lago Chad es vital para la supervivencia de 30 millones de personas." },
    "Congo": { cap: "Brazzaville", pop: "5.9", fact: "> Ecosistema: Nodo de la segunda selva tropical más grande del globo." },
    "Dem. Rep. Congo": { cap: "Kinshasa", pop: "99.0", fact: "> Materia Prima: Posee el 70% del Cobalto mundial, vital para baterías." },
    "Djibouti": { cap: "Djibouti City", pop: "1.1", fact: "> Estrategia: Nodo de cables submarinos y bases militares internacionales." },
    "Eq. Guinea": { cap: "Malabo", pop: "1.6", fact: "> Idioma: Único país de África donde el español es lengua oficial." },
    "Eritrea": { cap: "Asmara", pop: "3.6", fact: "> Arquitectura: Su capital es Patrimonio UNESCO por su diseño futurista italiano." },
    "Gabon": { cap: "Libreville", pop: "2.3", fact: "> Bio-Reserva: El 11% de su territorio es zona protegida de parques nacionales." },
    "Gambia": { cap: "Banjul", pop: "2.7", fact: "> Geografía: El país más pequeño de África continental, rodeado por Senegal." },
    "Guinea": { cap: "Conakry", pop: "13.8", fact: "> Recursos: Posee las mayores reservas de bauxita (aluminio) del mundo." },
    "Guinea-Bissau": { cap: "Bissau", pop: "2.1", fact: "> Ecosistema: Nodo de exportación de anacardos y archipiélagos vírgenes." },
    "Lesotho": { cap: "Maseru", pop: "2.3", fact: "> Altitud: El único país del mundo situado enteramente por encima de los 1,400m." },
    "Liberia": { cap: "Monrovia", pop: "5.3", fact: "> Soberanía: Fundada por ciudadanos estadounidenses liberados en 1847." },
    "Malawi": { cap: "Lilongwe", pop: "20.4", fact: "> Limnología: El Lago Malawi tiene más especies de peces que cualquier otro." },
    "Mauritania": { cap: "Nouakchott", pop: "4.7", fact: "> Desierto: Hogar de la 'Estructura de Richat', el Ojo de África visto desde el espacio." },
    "Mauritius": { cap: "Port Louis", pop: "1.3", fact: "> Nodo Índico: El país con el índice de desarrollo humano más alto de África." },
    "Namibia": { cap: "Windhoek", pop: "2.5", fact: "> Geología: Hogar del desierto más antiguo del mundo, el Namib." },
    "Niger": { cap: "Niamey", pop: "26.2", fact: "> Energía Nuclear: Uno de los mayores exportadores de uranio del sistema." },
    "Rwanda": { cap: "Kigali", pop: "13.7", fact: "> Digital: Aspiran a ser el 'Smart Hub' de África con fibra óptica nacional." },
    "Sierra Leone": { cap: "Freetown", pop: "8.6", fact: "> Gemología: Nodo histórico de extracción de diamantes de alta pureza." },
    "Somalia": { cap: "Mogadishu", pop: "17.5", fact: "> Costa: Posee la línea costera más larga de África continental." },
    "South Sudan": { cap: "Juba", pop: "10.9", fact: "> Reciente: El país más joven del mundo (independiente desde 2011)." },
    "eSwatini": { cap: "Mbabane", pop: "1.2", fact: "> Cultura: Una de las últimas monarquías absolutas del sistema." },
    "Togo": { cap: "Lomé", pop: "8.8", fact: "> Mercados: Famoso por sus centros de comercio de medicina tradicional." },
    "Zambia": { cap: "Lusaka", pop: "20.0", fact: "> Cobre: Uno de los 10 mayores productores de cobre para cableado eléctrico." },
    "Zimbabwe": { cap: "Harare", pop: "16.3", fact: "> Alfabetización: Históricamente con las tasas más altas de educación de África." },

    
};

const tooltip = d3.select("#tooltip");
let activeCountry = d3.select(null), linkLine = null;

// 4. Carga del Mapa e Interacción
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
    d3.select("#loading-msg").style("display", "none");

    g.selectAll("path").data(data.features).enter().append("path")
        .attr("class", "country").attr("d", path)
        .on("click", (event, d) => {
            if (activeCountry.node() === event.currentTarget) return reset();
            
            activeCountry.classed("active", false);
            if (linkLine) linkLine.remove();
            tooltip.style("opacity", 0);
            activeCountry = d3.select(event.currentTarget).classed("active", true);

            // Búsqueda Inteligente Reforzada
            let geoName = (d.properties.name || "Unknown").trim();
            let searchName = geoName.toLowerCase();
            let intel = null;

            // Buscamos en intelDB ignorando mayúsculas/minúsculas
            const foundKey = Object.keys(intelDB).find(key => 
                key.toLowerCase() === searchName || 
                searchName.includes(key.toLowerCase()) || 
                key.toLowerCase().includes(searchName)
            );

            if (foundKey) intel = intelDB[foundKey];

            // Si no está en intelDB, intentamos usar datos del GeoJSON para no mostrar NaN
            if (!intel) {
                console.warn("FRX-DEBUG: Usando datos de respaldo para", geoName);
                const rawPop = d.properties.pop_est || 0;
                intel = { 
                    cap: "COORD_RESTR", 
                    pop: (rawPop / 1000000).toFixed(1),
                    fact: `> SECTOR: ${geoName.toUpperCase()} // STATUS: Intel restringida en base local.` 
                };
            }

            // Inyectar datos en la Interfaz (index.html)
            d3.select("#tt-name").html(`> ${geoName.toUpperCase()}<span class="blinking-cursor">_</span>`);
            d3.select("#tt-capital").text("CAPITAL: " + intel.cap);
            d3.select("#tt-pop").text(intel.pop);
            d3.select("#tt-fact").text(intel.fact);

            // Zoom y Posicionamiento
            const bounds = path.bounds(d);
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = (bounds[0][1] + bounds[1][1]) / 2;
            const dx = bounds[1][0] - bounds[0][0], dy = bounds[1][1] - bounds[0][1];
            const scale = Math.min(8, 0.8 / Math.max(dx / width, dy / height));
            const translate = [width/2 - scale*x, (height/2 - scale*y) + (isMobile ? 30 : 60)];

            svg.transition().duration(800).ease(d3.easeCubicInOut)
                .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
                .on("end", () => {
                    drawConnection(x, y, scale, translate);
                });
        });
});

// 5. Funciones de Soporte
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