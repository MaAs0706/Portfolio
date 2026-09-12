import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './light-rays.css'

const toRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255] : [1, 1, 1]
}

export default function LightRays({ color = '#d7b36b' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: true })
    const gl = renderer.gl
    mount.appendChild(gl.canvas)

    const program = new Program(gl, {
      vertex: `attribute vec2 position; varying vec2 vUv; void main(){ vUv=position*.5+.5; gl_Position=vec4(position,0.,1.); }`,
      fragment: `precision highp float;
        uniform float time; uniform vec2 resolution; uniform vec2 mouse; uniform vec3 rayColor; varying vec2 vUv;
        float hash(vec2 p){return fract(sin(dot(p,vec2(41.7,289.1)))*45758.3);}
        void main(){
          vec2 p=gl_FragCoord.xy/resolution.xy; vec2 origin=vec2(.75,1.14); vec2 d=p-origin;
          float angle=atan(d.y,d.x)+.14*sin(time*.00011)+mouse.x*.06;
          float beams=pow(max(0.,sin(angle*10.+sin(angle*3.)*2.)*.5+.5),11.);
          float distance=length(d); float fade=smoothstep(.92,.03,distance);
          float grain=hash(gl_FragCoord.xy+time*.002)*.12+.94;
          float glow=pow(max(0.,1.-distance*1.35),3.);
          float alpha=(beams*.27+glow*.07)*fade*grain;
          gl_FragColor=vec4(rayColor,alpha);
        }`,
      uniforms: { time: { value: 0 }, resolution: { value: [1, 1] }, mouse: { value: [.5, .5] }, rayColor: { value: toRgb(color) } },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    let frame
    const resize = () => { const { width, height } = mount.getBoundingClientRect(); renderer.setSize(width, height); program.uniforms.resolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight] }
    const move = event => { const rect = mount.getBoundingClientRect(); program.uniforms.mouse.value = [(event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height] }
    const render = time => { program.uniforms.time.value = time; renderer.render({ scene: mesh }); frame = requestAnimationFrame(render) }
    resize(); render(0); window.addEventListener('resize', resize); window.addEventListener('pointermove', move)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); mount.replaceChildren(); gl.getExtension('WEBGL_lose_context')?.loseContext() }
  }, [color])

  return <div ref={mountRef} className="light-rays" aria-hidden="true" />
}
