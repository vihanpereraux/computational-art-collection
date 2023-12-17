var hydra = new Hydra({ detectAudio: false });

voronoi(8,1)
    .mult(osc(10,0.1,()=>Math.sin(time)*3).saturate(3).kaleid(200))
    .modulate(o0, 0.5)
    .add(o0,0.8)
    .scrollY(() => Math.sin(time) * .006)
    .scrollX(() => Math.sin(time) * .006)
    .scale(0.99)
    .modulate(voronoi(20,1), 0.008)
    .luma(0.3)
    .out()

speed = 5