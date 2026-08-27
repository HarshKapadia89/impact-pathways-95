// Authored profession detail for the Engineering and Technology stream.
// Written in-house from public regulator and institute information (AICTE, NBA,
// DGCA, UGC, ISRO/DRDO/CSIR recruitment notices and official institute sites).
// Entrance exams and institute lists are NOT duplicated here — they come from
// src/lib/handbook/engineering-and-technology.json so every page on the site
// shows the same records.

import type { ProfessionOverlay } from "../professionData";

const OVERLAYS: Record<string, ProfessionOverlay> = {
  "aerospace-engineer": {
    summary: "An Aerospace Engineer designs, tests and maintains aircraft, launch vehicles and satellites — working on aerodynamics, propulsion, structures and flight control. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["ISRO, DRDO and HAL", "Private space and drone start-ups", "Commercial airlines and MRO firms", "Defence PSUs and research labs"],
    skills: ["Aerodynamics and propulsion", "CAD and CFD simulation", "Materials and structural analysis", "Precision and safety discipline"],
  },
  "aerospace-materials-specialist": {
    summary: "An Aerospace Materials Specialist selects and tests the alloys, composites and coatings that survive extreme heat, vibration and altitude in aircraft and spacecraft. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Space and defence research labs", "Aerospace component manufacturers", "Metallurgical testing laboratories", "Composite and coating industries"],
    skills: ["Materials science and metallurgy", "Failure and fatigue testing", "Lab instrumentation", "Standards and certification knowledge"],
  },
  "agricultural-food-engineer": {
    summary: "An Agricultural & Food Engineer applies engineering to farming and food — machinery, irrigation, post-harvest storage and food-processing plants. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Food processing companies", "Agri-machinery manufacturers", "ICAR institutes and state agriculture departments", "Cold-chain and warehousing firms"],
    skills: ["Machine design for farm use", "Food process engineering", "Irrigation and soil-water knowledge", "Field problem solving"],
  },
  "aircraft-maintenance-technician": {
    summary: "An Aircraft Maintenance Technician inspects, services and certifies aircraft systems so every flight leaves the ground airworthy, working to DGCA-approved procedures. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Airlines and MRO organisations", "Defence air wings", "Aircraft manufacturers", "Charter and business aviation"],
    skills: ["AME licensing knowledge", "Systems fault diagnosis", "Strict safety compliance", "Precise documentation"],
  },
  "aircraft-structures-technician": {
    summary: "An Aircraft Structures Technician repairs and reinforces airframes, panels and composite structures, restoring aircraft to certified strength. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["MRO and overhaul facilities", "Airlines' engineering departments", "Defence workshops", "Composite repair specialists"],
    skills: ["Sheet metal and composite work", "Reading structural drawings", "Non-destructive testing", "Attention to tolerances"],
  },
  "audio-and-video-technologist": {
    summary: "An Audio and Video Technologist engineers sound and picture systems — studio recording chains, broadcast setups, live sound and post-production. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Broadcast and OTT studios", "Live events and concert production", "Film post-production houses", "AV systems integrators"],
    skills: ["Acoustics and signal processing", "Mixing and mastering tools", "Equipment setup and troubleshooting", "Working to tight production schedules"],
  },
  "automobile-engineer": {
    summary: "An Automobile Engineer designs, develops and tests vehicles and their systems — engines, EV powertrains, chassis, safety and emissions. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Automobile OEMs and EV manufacturers", "Auto-component suppliers", "Testing agencies such as ARAI", "Motorsport and fleet engineering"],
    skills: ["Vehicle dynamics and IC/EV powertrains", "CAD and prototyping", "Emission and safety standards", "Root-cause analysis"],
  },
  "avionics-and-electronic-technician": {
    summary: "An Avionics and Electronic Technician installs, calibrates and repairs the electronic systems that navigate, communicate and control an aircraft. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Airlines and MRO units", "Defence and space organisations", "Avionics equipment manufacturers", "Air navigation service providers"],
    skills: ["Digital and RF electronics", "Instrument calibration", "Wiring and fault isolation", "Regulatory compliance"],
  },
  "biochemical-engineer": {
    summary: "A Biochemical Engineer scales biological processes into industry — fermentation, enzymes, vaccines and bio-based chemicals. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Pharmaceutical and vaccine plants", "Biotech and enzyme companies", "Food and beverage fermentation units", "Environmental biotechnology firms"],
    skills: ["Bioprocess and reactor design", "Microbiology and biochemistry", "Process control", "Sterile and GMP practice"],
  },
  "biotechnological-engineer": {
    summary: "A Biotechnological Engineer engineers cells, proteins and genetic material into products — therapeutics, diagnostics, seeds and bio-materials. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Biotech and pharma R&D", "Agri-biotech companies", "Diagnostic laboratories", "Government biotech institutes"],
    skills: ["Molecular biology techniques", "Bioinformatics tools", "Experimental design", "Regulatory and ethics awareness"],
  },
  "ceramic-engineer": {
    summary: "A Ceramic Engineer develops ceramics, glass and refractories used in furnaces, electronics, tiles, sanitaryware and biomedical implants. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Tile, sanitaryware and glass industry", "Refractory manufacturers", "Electronics component makers", "Materials research labs"],
    skills: ["Materials and kiln processes", "Quality testing", "Process troubleshooting", "Plant operations"],
  },
  "chemical-engineer": {
    summary: "A Chemical Engineer designs and runs the processes that convert raw materials into fuels, chemicals, medicines, plastics and food products at plant scale. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Refineries and petrochemical complexes", "Pharmaceutical and speciality chemical plants", "Fertiliser and cement industries", "Environmental and process consultancies"],
    skills: ["Mass and energy balances", "Process simulation and control", "Plant safety and HAZOP", "Cost and yield optimisation"],
  },
  "civil-engineer": {
    summary: "A Civil Engineer plans, designs and supervises the built environment — buildings, roads, bridges, dams, water systems and urban infrastructure. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Government works and municipal bodies", "Construction and infrastructure companies", "Design and structural consultancies", "Real estate developers"],
    skills: ["Structural analysis and design codes", "AutoCAD, STAAD and survey tools", "Site supervision and costing", "Contract and safety management"],
  },
  "computer-scientist": {
    summary: "A Computer Scientist studies and builds the foundations of computing — algorithms, systems, artificial intelligence, security and data at scale. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Technology product companies", "Research labs and universities", "Fintech, healthtech and deep-tech start-ups", "Government computing organisations"],
    skills: ["Algorithms and data structures", "Programming and system design", "Mathematics, probability and statistics", "Research and communication"],
  },
  "electrical-engineer": {
    summary: "An Electrical Engineer designs and maintains power generation, transmission, distribution and the electrical systems inside plants and buildings. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Power utilities and transmission corporations", "Renewable energy developers", "Manufacturing plants", "Electrical equipment manufacturers"],
    skills: ["Power systems and machines", "Protection and switchgear", "Electrical codes and safety", "Load and energy analysis"],
  },
  "electronic-communication-engineer": {
    summary: "An Electronic & Communication Engineer designs the circuits, chips and networks that move information — mobile, satellite, optical and embedded systems. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Telecom operators and equipment makers", "Semiconductor and VLSI companies", "Defence electronics and ISRO", "Embedded and IoT product firms"],
    skills: ["Analog and digital circuit design", "Signal processing and communication theory", "VLSI and embedded tools", "PCB and testing skills"],
  },
  "electronics-electrical-engineer": {
    summary: "An Electronics & Electrical Engineer works across both power and electronics — drives, controls, automation panels and energy systems. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Industrial automation companies", "Power and renewable energy sector", "Consumer electronics manufacturing", "EPC and project firms"],
    skills: ["Power electronics and drives", "Control systems", "Panel design and commissioning", "Field troubleshooting"],
  },
  "electronics-instrumentation-engineer": {
    summary: "An Electronics & Instrumentation Engineer builds the sensing and control layer of a plant — instruments, transmitters, PLC/DCS loops and safety interlocks. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Refineries and chemical plants", "Pharma and food process industries", "Automation vendors", "Power stations"],
    skills: ["Sensors and measurement", "PLC, SCADA and DCS", "Control loop tuning", "Calibration discipline"],
  },
  "electronics-engineer": {
    summary: "An Electronics Engineer designs and tests electronic hardware — from consumer devices and medical equipment to industrial controllers. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Electronics manufacturing (EMS) firms", "Medical device companies", "Defence and aerospace electronics", "Hardware start-ups"],
    skills: ["Circuit design and simulation", "Microcontrollers and firmware", "Test instrumentation", "Design for manufacturing"],
  },
  "environmental-engineer": {
    summary: "An Environmental Engineer designs systems that keep air, water and land safe — treatment plants, emission control, waste management and impact assessment. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Pollution control boards", "Water and wastewater treatment companies", "Environmental consultancies", "Industry EHS departments"],
    skills: ["Water and air quality science", "Treatment process design", "Environmental law and standards", "Monitoring and reporting"],
  },
  "food-technologists": {
    summary: "A Food Technologists develops and safeguards food products — recipes, processing, packaging, shelf life and food-safety compliance. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Packaged food and dairy companies", "FSSAI and food testing laboratories", "Beverage and confectionery plants", "Retail and export quality teams"],
    skills: ["Food chemistry and microbiology", "Process and packaging technology", "HACCP and FSSAI standards", "Sensory evaluation"],
  },
  "industrial-engineer": {
    summary: "An Industrial Engineer makes systems more productive — improving layouts, work methods, supply chains, quality and cost across an operation. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Manufacturing and automotive plants", "Logistics and e-commerce operations", "Consulting firms", "Service industry operations teams"],
    skills: ["Operations research and statistics", "Lean and Six Sigma methods", "Data analysis", "Process mapping and change management"],
  },
  "instrumentation-engineer": {
    summary: "An Instrumentation Engineer specifies, installs and maintains measuring and control instruments that keep industrial processes accurate and safe. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Process industries", "Instrumentation manufacturers", "Automation service providers", "Research and testing labs"],
    skills: ["Measurement principles", "Control and automation systems", "Calibration and validation", "Loop documentation"],
  },
  "leather-technologists": {
    summary: "A Leather Technologists manages tanning, finishing and product development in the leather and footwear industry, including cleaner-production methods. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Tanneries and leather exporters", "Footwear and accessories brands", "CLRI and testing laboratories", "Effluent treatment specialists"],
    skills: ["Tanning chemistry", "Quality and defect analysis", "Product development", "Environmental compliance"],
  },
  "manufacturing-technologists": {
    summary: "A Manufacturing Technologists plans and improves how things are made — tooling, machining, assembly lines, automation and quality systems. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Engineering and auto-component plants", "Machine tool manufacturers", "Contract manufacturing firms", "Industrial automation integrators"],
    skills: ["Machining and tooling knowledge", "CAM and CNC programming", "Production planning", "Quality control tools"],
  },
  "marine-engineer": {
    summary: "A Marine Engineer runs and maintains the engine room and machinery of ships, or designs marine propulsion systems ashore. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Shipping companies and merchant navy", "Shipyards and dockyards", "Offshore oil and gas operators", "Marine classification societies"],
    skills: ["Marine propulsion and auxiliaries", "Maintenance under sea conditions", "STCW safety training", "Calm handling of emergencies"],
  },
  "materials-science-engineer": {
    summary: "A Materials Science Engineer investigates and engineers materials — metals, polymers, ceramics, composites and nano-materials — for specific performance. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Metals and alloys industry", "Electronics and semiconductor firms", "National research laboratories", "Aerospace and automotive R&D"],
    skills: ["Characterisation techniques", "Thermodynamics of materials", "Testing and failure analysis", "Scientific reporting"],
  },
  "mechanical-engineer": {
    summary: "A Mechanical Engineer designs, builds and maintains machines and thermal systems — engines, turbines, HVAC, robotics and production equipment. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Manufacturing and heavy engineering", "Energy and power plants", "Automotive and aerospace firms", "Maintenance and project services"],
    skills: ["Mechanics, thermodynamics and design", "CAD/CAM and FEA", "Manufacturing processes", "Maintenance planning"],
  },
  "metallurgical-engineer": {
    summary: "A Metallurgical Engineer extracts, refines and treats metals, and controls their properties through alloying, casting and heat treatment. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Steel and aluminium plants", "Foundries and forging units", "Mining and mineral processing", "Quality and testing laboratories"],
    skills: ["Extractive and physical metallurgy", "Heat treatment and casting", "Microstructure analysis", "Plant process control"],
  },
  "mineral-engineer": {
    summary: "A Mineral Engineer processes ore into usable mineral concentrates — crushing, separation, beneficiation and tailings management. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Mineral processing plants", "Mining corporations", "Cement and refractory industries", "Geological survey organisations"],
    skills: ["Mineral processing techniques", "Plant instrumentation", "Sampling and assay methods", "Environment and safety norms"],
  },
  "mining-engineer": {
    summary: "A Mining Engineer plans and supervises safe extraction of coal, metal and mineral deposits, above ground and underground. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Coal India and mining PSUs", "Private mining companies", "Mine planning consultancies", "Directorate General of Mines Safety"],
    skills: ["Mine planning and ventilation", "Blasting and excavation methods", "Mine safety regulations", "Survey and geology basics"],
  },
  "naval-architecture-engineer": {
    summary: "A Naval Architecture Engineer designs ships, submarines and offshore structures — hull form, stability, strength and propulsion integration. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Shipyards and defence shipbuilders", "Offshore engineering firms", "Classification societies", "Design consultancies"],
    skills: ["Hydrostatics and stability", "Structural design of hulls", "CAD for marine design", "Regulatory class rules"],
  },
  "nuclear-engineer": {
    summary: "A Nuclear Engineer works on reactor systems, radiation safety, fuel cycles and the medical or power applications of nuclear technology. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Nuclear Power Corporation of India", "BARC and atomic energy institutions", "Radiation safety and regulatory bodies", "Nuclear medicine departments"],
    skills: ["Reactor physics", "Radiation protection", "Instrumentation and control", "Uncompromising safety culture"],
  },
  "optical-engineer": {
    summary: "An Optical Engineer designs lenses, lasers, fibre optics and imaging systems used in cameras, medical devices, communication and defence. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Optics and photonics manufacturers", "Telecom fibre networks", "Defence and space optics labs", "Medical imaging companies"],
    skills: ["Geometrical and physical optics", "Optical design software", "Precision measurement", "Photonics component knowledge"],
  },
  "paint-technologists": {
    summary: "A Paint Technologists formulates coatings that protect and decorate — paints, varnishes, industrial and automotive finishes. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Paint and coatings manufacturers", "Automotive coating divisions", "Construction chemicals companies", "Testing and R&D laboratories"],
    skills: ["Polymer and pigment chemistry", "Formulation and trials", "Weathering and durability testing", "Quality standards"],
  },
  "petroleum-engineer": {
    summary: "A Petroleum Engineer finds, drills and produces oil and gas — reservoir evaluation, drilling operations and production optimisation. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["ONGC, OIL and refineries", "Private E&P operators", "Oilfield service companies", "Energy consultancies"],
    skills: ["Reservoir and drilling engineering", "Well log interpretation", "Production optimisation", "Offshore safety practice"],
  },
  "plastic-engineer": {
    summary: "A Plastic Engineer designs plastic products and the moulds and processes that make them, balancing cost, strength and recyclability. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Plastic product manufacturers", "Packaging industry", "Automotive and appliance suppliers", "CIPET and testing labs"],
    skills: ["Polymer processing", "Mould and tool design", "Injection moulding and extrusion", "Material selection"],
  },
  "plastic-technologists": {
    summary: "A Plastic Technologists controls plastics processing on the shop floor — machine settings, material selection, testing and defect elimination. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Processing and moulding units", "Packaging converters", "Recycling and compounding firms", "Quality laboratories"],
    skills: ["Process parameter control", "Testing and defect analysis", "Machine maintenance basics", "Cost and scrap reduction"],
  },
  "polymer-engineer": {
    summary: "A Polymer Engineer develops polymers and composites — rubbers, fibres, resins and speciality materials — from lab formulation to plant scale. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Polymer and rubber industry", "Fibre and textile chemical firms", "Composite manufacturers", "Research institutes"],
    skills: ["Polymer chemistry and rheology", "Compounding and processing", "Characterisation techniques", "Scale-up experience"],
  },
  "production-engineer": {
    summary: "A Production Engineer owns output on the factory floor — planning, line balancing, productivity, quality and cost per unit. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Manufacturing plants of every kind", "Auto and engineering component makers", "FMCG production units", "Contract manufacturers"],
    skills: ["Production planning and control", "Lean manufacturing", "Quality systems", "Team supervision"],
  },
  "pulp-and-paper-technologist": {
    summary: "A Pulp and Paper Technologist runs pulping, bleaching and paper-making processes, and improves quality, chemical recovery and effluent performance. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Paper and packaging mills", "Pulp processing units", "Chemical suppliers to the industry", "Environmental compliance teams"],
    skills: ["Pulping and bleaching chemistry", "Process instrumentation", "Water and effluent management", "Quality testing"],
  },
  "robotics-engineer": {
    summary: "A Robotics Engineer builds robots and automated systems — mechanics, sensors, control software and machine vision working together. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Industrial automation companies", "Robotics and drone start-ups", "Manufacturing automation cells", "Research and academic labs"],
    skills: ["Mechatronics and kinematics", "Control systems and ROS", "Programming and machine vision", "Systems integration"],
  },
  "sales-engineer": {
    summary: "A Sales Engineer sells technical products by understanding the customer's engineering problem and matching the right specification and solution. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Industrial equipment manufacturers", "Automation and instrumentation vendors", "Software and technology firms", "Distribution and dealer networks"],
    skills: ["Technical product knowledge", "Consultative selling", "Costing and proposal writing", "Relationship management"],
  },
  "structural-engineer": {
    summary: "A Structural Engineer makes sure buildings, bridges and towers stand safely — analysing loads, designing members and checking construction. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Structural design consultancies", "Infrastructure and construction companies", "Government engineering departments", "Retrofitting and audit specialists"],
    skills: ["Structural analysis and IS codes", "STAAD, ETABS and design software", "Seismic and wind design", "Site verification"],
  },
  "textile-engineer": {
    summary: "A Textile Engineer engineers fibre-to-fabric production — spinning, weaving, knitting, dyeing, finishing and technical textiles. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Textile mills and processing houses", "Garment and apparel exporters", "Technical textile manufacturers", "Textile machinery suppliers"],
    skills: ["Fibre and yarn technology", "Fabric manufacturing processes", "Dyeing and finishing chemistry", "Quality and production control"],
  },
  "aerologist": {
    summary: "An Aerologist studies the upper atmosphere — its winds, pressure and composition — supporting aviation, launches and weather prediction. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["India Meteorological Department", "ISRO and atmospheric research centres", "Aviation weather services", "Climate research institutes"],
    skills: ["Atmospheric physics", "Instrumented balloon and radar data", "Numerical modelling", "Data analysis"],
  },
  "air-traffic-controller": {
    summary: "An Air Traffic Controller keeps aircraft safely separated and flowing — issuing clearances and instructions from the tower or radar centre. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Airports Authority of India", "Defence air traffic services", "Private airport operators", "Air navigation service providers"],
    skills: ["Rapid decision making", "Spatial awareness", "Clear radio communication", "Calm under pressure"],
  },
  "airline-pilot": {
    summary: "An Airline Pilot flies passengers and cargo safely, commanding the aircraft from pre-flight planning through to landing. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Scheduled airlines", "Charter and business aviation", "Cargo operators", "Flight training organisations"],
    skills: ["DGCA CPL/ATPL training", "Flight planning and navigation", "Instrument flying", "Crew resource management"],
  },
  "astrobiologist": {
    summary: "An Astrobiologist investigates whether and how life can exist beyond Earth, combining biology, chemistry and planetary science. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Space research organisations", "University astrobiology groups", "Planetary science laboratories", "Science communication institutions"],
    skills: ["Microbiology and biochemistry", "Planetary science", "Laboratory analysis", "Interdisciplinary research"],
  },
  "astrogeologist": {
    summary: "An Astrogeologist studies the rocks, craters and surface processes of planets, moons and asteroids using mission data and meteorites. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Planetary science divisions of ISRO", "Geological research institutes", "University research groups", "Museums and science centres"],
    skills: ["Geology and remote sensing", "Image and spectral analysis", "Field geology", "Scientific writing"],
  },
  "astronaut": {
    summary: "An Astronaut trains for and performs spaceflight missions — operating spacecraft systems, running experiments and conducting spacewalks. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["National space agencies", "Defence test-pilot cadres", "Space research institutions", "Commercial spaceflight programmes"],
    skills: ["Exceptional physical fitness", "Engineering or science degree plus flight or research experience", "Teamwork under stress", "Systems proficiency"],
  },
  "building-surveyor": {
    summary: "A Building Surveyor assesses the condition, legality and value of buildings — defects, compliance, repairs and refurbishment advice. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Surveying and valuation firms", "Municipal and development authorities", "Real estate and insurance companies", "Construction consultancies"],
    skills: ["Building construction knowledge", "Defect diagnosis", "Regulations and byelaws", "Report writing"],
  },
  "climatologist": {
    summary: "A Climatologist analyses long-term climate patterns and change, producing projections that guide agriculture, water and disaster policy. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["IMD and climate research centres", "Universities and think tanks", "Environmental consultancies", "International climate agencies"],
    skills: ["Climate modelling", "Statistics and large datasets", "Programming for data analysis", "Policy communication"],
  },
  "cosmologist": {
    summary: "A Cosmologist studies the origin, structure and evolution of the universe using theory, simulations and telescope data. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["IUCAA, TIFR and research institutes", "University physics departments", "Observatories", "International collaborations"],
    skills: ["Advanced physics and mathematics", "Computational simulation", "Data analysis", "Academic publishing"],
  },
  "electrobiologist": {
    summary: "An Electrobiologist studies electrical activity in living systems — nerve and muscle signals — and the instruments that measure them. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Medical research institutes", "Biomedical device companies", "Hospital neurophysiology labs", "University research groups"],
    skills: ["Physiology and biophysics", "Signal acquisition and processing", "Laboratory instrumentation", "Research protocol design"],
  },
  "electrometallurgist": {
    summary: "An Electrometallurgist uses electrical processes — electrolysis, electroplating and electro-refining — to extract and finish metals. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Aluminium and copper smelters", "Electroplating and finishing units", "Metallurgical research labs", "Battery and materials companies"],
    skills: ["Electrochemistry", "Process control", "Corrosion and coating knowledge", "Plant safety"],
  },
  "geohydrologist": {
    summary: "A Geohydrologist maps and manages groundwater — aquifer behaviour, recharge, quality and sustainable extraction. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Central and State Ground Water Boards", "Water resource consultancies", "Mining and industry water teams", "NGOs working on water security"],
    skills: ["Hydrogeology", "Well testing and modelling", "GIS and remote sensing", "Field survey work"],
  },
  "geologist": {
    summary: "A Geologist studies rocks, minerals and earth processes to locate resources, assess hazards and advise on construction and mining. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Geological Survey of India", "Mining and oil exploration companies", "Groundwater and infrastructure projects", "Research and academia"],
    skills: ["Field mapping and sampling", "Mineralogy and petrology", "GIS and remote sensing", "Report and map preparation"],
  },
  "hydrogeologist": {
    summary: "A Hydrogeologist evaluates groundwater systems for supply, contamination control and recharge planning in cities, farms and industry. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Water boards and irrigation departments", "Environmental consultancies", "Mining and industrial projects", "Development agencies"],
    skills: ["Aquifer analysis", "Water quality testing", "Modelling software", "Regulatory knowledge"],
  },
  "meteorologist": {
    summary: "A Meteorologist forecasts weather and interprets atmospheric data for aviation, agriculture, disaster management and the public. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["India Meteorological Department", "Defence weather services", "Aviation and shipping operators", "Media and agri-tech companies"],
    skills: ["Atmospheric physics", "Numerical weather models", "Data interpretation", "Clear public communication"],
  },
  "nephologist": {
    summary: "A Nephologist specialises in the study of clouds — their formation, physics and role in rainfall and climate models. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Atmospheric research institutes", "IITM and IMD research divisions", "University meteorology departments", "Cloud-seeding programmes"],
    skills: ["Cloud physics", "Radar and satellite data", "Modelling and statistics", "Field campaign work"],
  },
  "oceanographer": {
    summary: "An Oceanographer studies the ocean — its currents, chemistry, geology and life — supporting fisheries, shipping, climate and coastal safety. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["National Institute of Oceanography", "INCOIS and earth science ministries", "Offshore and marine industries", "Universities and NGOs"],
    skills: ["Marine science fundamentals", "Shipboard instrumentation", "Data modelling", "Long field deployments"],
  },
  "ontologist": {
    summary: "An Ontologist designs the formal knowledge structures that let machines organise and reason over information in a domain. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Data and AI product companies", "Health informatics organisations", "Library and information science bodies", "Research laboratories"],
    skills: ["Knowledge representation", "Semantic web standards", "Domain modelling", "Logic and structured thinking"],
  },
  "palaeoclimatologist": {
    summary: "A Palaeoclimatologist reconstructs past climates from ice cores, sediments, corals and tree rings to understand how climate changes. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Earth science research institutes", "University palaeoclimate labs", "Polar and Himalayan research programmes", "Climate policy bodies"],
    skills: ["Proxy data analysis", "Isotope and lab techniques", "Statistical modelling", "Fieldwork endurance"],
  },
  "physicist": {
    summary: "A Physicist investigates matter, energy and their interactions — from particles and materials to optics and quantum systems. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["TIFR, IISc, IITs and national labs", "DRDO, ISRO and BARC", "Semiconductor and photonics industry", "Colleges and universities"],
    skills: ["Advanced mathematics", "Experimental design or theory", "Computational tools", "Scientific writing"],
  },
  "planetologist": {
    summary: "A Planetologist studies planets and planetary systems — their formation, atmospheres and surfaces — using mission and telescope data. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["ISRO planetary science teams", "Physical Research Laboratory", "University research groups", "International space collaborations"],
    skills: ["Planetary science", "Remote sensing analysis", "Modelling", "Collaboration on missions"],
  },
  "scientist": {
    summary: "A Scientist designs and runs research that produces new knowledge or technology, in a laboratory, field or computational setting. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["CSIR, DRDO, ICAR, ISRO and BARC", "University research departments", "Industrial R&D centres", "Science policy institutions"],
    skills: ["Research methodology", "Statistics and data handling", "Technical writing", "Persistence over long projects"],
  },
  "selenologist": {
    summary: "A Selenologist studies the Moon — its geology, surface and evolution — using lunar mission data and returned samples. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["ISRO lunar mission teams", "Planetary geology laboratories", "Universities and observatories", "Space science outreach bodies"],
    skills: ["Geology and remote sensing", "Spectral data analysis", "Mission data handling", "Scientific collaboration"],
  },
  "ufologist": {
    summary: "An Ufologist investigates and documents unidentified aerial phenomena reports using rigorous atmospheric, optical and data-analysis methods. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Independent research organisations", "Science journalism and publishing", "Atmospheric research groups", "Education and outreach bodies"],
    skills: ["Critical evaluation of evidence", "Atmospheric and optical science", "Data and image analysis", "Careful documentation"],
  },
  "volcanologist": {
    summary: "A Volcanologist monitors volcanoes and volcanic rocks to understand eruptions, hazards and the geological history they record. In India this work sits inside the Engineering and Technology stream: students take Science with PCM in Class 11–12, qualify through the entrance exams listed below, and specialise during the degree and early working years. The sections that follow set out the study route, the leading institutes, the exams and the day-to-day reality of the job.",
    sectors: ["Geological Survey of India", "Earth science research institutes", "Universities", "Disaster management authorities"],
    skills: ["Field geology and sampling", "Geochemistry and petrology", "Monitoring instrumentation", "Hazard assessment"],
  },
};

export default OVERLAYS;
