import re
import os

filepath = r"d:\Oracle-Community\src\Components\Hero.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find the tramRef container
tram_start = content.find('<div \n          ref={tramRef}')
tram_end = content.find('</div>\n      </div>\n    </div>') # This is the end of the sticky container

if tram_start != -1 and tram_end != -1:
    # Extract the original tram container
    original_tram_div = content[tram_start:tram_end]
    
    # Extract just the SVG block to use in TramCar component
    svg_start = original_tram_div.find('<svg')
    svg_end = original_tram_div.find('</svg>') + 6
    original_svg = original_tram_div[svg_start:svg_end]
    
    # We need to conditionally render pantograph, spark, and headlight beam
    # 1. Headlight Ray Cone
    ray_search = '{/* Headlight Ray Cone */}\n            <path d="M 279 73 L 420 40 L 420 110 L 279 80 Z" fill="url(#headlightBeam)" opacity="0.65" />'
    new_ray = '{/* Headlight Ray Cone */}\n            {isFront && <path d="M 279 73 L 420 40 L 420 110 L 279 80 Z" fill="url(#headlightBeam)" opacity="0.65" />}'
    modified_svg = original_svg.replace(ray_search, new_ray)
    
    # 2. Spark Glow
    spark_search = '{/* Spark Glow - Flickers dynamically during scroll movement */}\n            <g className="pantograph-spark"'
    new_spark = '{/* Spark Glow - Flickers dynamically during scroll movement */}\n            {isFront && <g className="pantograph-spark"'
    modified_svg = modified_svg.replace(spark_search, new_spark)
    
    # Add closing brace for spark group
    spark_end_search = '<path d="M 160 5 L 155 1 M 160 5 L 165 -1 M 160 5 L 157 9 M 160 5 L 164 10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />\n            </g>'
    new_spark_end = '<path d="M 160 5 L 155 1 M 160 5 L 165 -1 M 160 5 L 157 9 M 160 5 L 164 10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />\n            </g>}'
    modified_svg = modified_svg.replace(spark_end_search, new_spark_end)

    # 3. Pantograph
    panto_search = '{/* Pantograph (Electric Collector) */}\n            <g stroke="url(#chromeMetal)"'
    new_panto = '{/* Pantograph (Electric Collector) */}\n            {isFront && <g stroke="url(#chromeMetal)"'
    modified_svg = modified_svg.replace(panto_search, new_panto)
    
    # Add closing brace for pantograph group
    panto_end_search = '<path d="M 148 5 L 172 5 C 172 5, 174 5, 174 3 M 148 5 C 148 5, 146 5, 146 3" strokeWidth="2" />\n            </g>'
    new_panto_end = '<path d="M 148 5 L 172 5 C 172 5, 174 5, 174 3 M 148 5 C 148 5, 146 5, 146 3" strokeWidth="2" />\n            </g>}'
    modified_svg = modified_svg.replace(panto_end_search, new_panto_end)

    # Change w-full to w-[180px] in SVG class
    modified_svg = modified_svg.replace('className="h-full w-full', 'className="h-full w-[180px]')

    tram_car_component = f"""
const TramCar = ({{ isFront }}) => (
  {modified_svg}
);
"""
    
    new_tram_div = """<div 
          ref={tramRef}
          className="absolute pointer-events-auto select-none z-25 h-[68px] bottom-[26px] transform-gpu flex gap-[4px] items-end"
          style={{ width: '370px' }} // 180px * 2 + gap
        >
          {/* Dynamic Motion Blur Speed Trails behind tram */}
          <div className="tram-motion-blur absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1.5 pr-4 pointer-events-none opacity-0">
            <div className="w-16 sm:w-28 h-[2px] bg-gradient-to-l from-[#cc0000]/65 to-transparent blur-[0.5px]" />
            <div className="w-24 sm:w-36 h-[3px] bg-gradient-to-l from-[#cc0000]/50 to-transparent blur-[1px]" />
            <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-[#cc0000]/65 to-transparent blur-[0.5px]" />
          </div>

          {/* Rear Compartment */}
          <TramCar isFront={false} />

          {/* Authentic Dark Gray Accordion Joint */}
          <div className="h-[42px] w-[22px] bg-[#1a1a1a] mb-[8px] flex flex-col justify-evenly px-[2px] border-y-2 border-[#111] z-[-1] shadow-inner shrink-0">
            <div className="w-full h-[1px] bg-[#000]" />
            <div className="w-full h-[1px] bg-[#333]" />
            <div className="w-full h-[1px] bg-[#000]" />
            <div className="w-full h-[1px] bg-[#333]" />
            <div className="w-full h-[1px] bg-[#000]" />
          </div>

          {/* Front Compartment */}
          <TramCar isFront={true} />
        </div>"""

    # Insert TramCar component right after imports
    import_end = content.find('gsap.registerPlugin(ScrollTrigger);') + 35
    content = content[:import_end] + "\n\n" + tram_car_component + content[import_end:]
    
    # Replace the old tram div
    content = content.replace(original_tram_div, new_tram_div)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Tram successfully refactored to dual compartment!")
else:
    print("Could not find tramRef container.")
