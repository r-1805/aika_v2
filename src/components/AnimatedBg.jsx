import React, {useEffect, useRef} from 'react'
// Canvas-based floating molecules effect
export default function AnimatedBg(){
  const ref = useRef()
  useEffect(()=>{
    const canvas = document.createElement('canvas')
    canvas.className = 'canvas-bg'
    ref.current = canvas
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    let w, h, particles=[]
    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    function rand(a,b){ return a + Math.random()*(b-a) }
    function create(){ for(let i=0;i<60;i++){ particles.push({x:Math.random()*w,y:Math.random()*h,r:rand(2,8),vx:rand(-0.3,0.3),vy:rand(-0.2,0.2),a:rand(0.2,0.9)}) } }
    function draw(){
      ctx.clearRect(0,0,w,h)
      // connecting lines
      for(let p of particles){
        for(let q of particles){
          const dx = p.x - q.x, dy = p.y - q.y
          const d = Math.sqrt(dx*dx+dy*dy)
          if(d<120){
            ctx.beginPath()
            ctx.strokeStyle = 'rgba(124,58,237,'+ (0.12 - d/1000) +')'
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke()
          }
        }
      }
      for(let p of particles){
        ctx.beginPath()
        ctx.fillStyle = `rgba(6,182,212,${p.a})`
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()
        p.x += p.vx; p.y += p.vy
        if(p.x< -20) p.x = w+20; if(p.x> w+20) p.x = -20
        if(p.y< -20) p.y = h+20; if(p.y> h+20) p.y = -20
      }
      requestAnimationFrame(draw)
    }
    resize(); create(); draw()
    window.addEventListener('resize', resize)
    return ()=>{ window.removeEventListener('resize', resize); canvas.remove() }
  },[])
  return null
}
