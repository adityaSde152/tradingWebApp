import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

const Stairs = ({ children }) => {
  const currentPath = useLocation().pathname
  const stairParentRef = useRef(null)
  const pageRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    // Make sure loader is visible at start
    tl.set(stairParentRef.current, { autoAlpha: 1 })

    // Animate stairs up
    tl.from('.stair', {
      height: 0,
      stagger: { amount: -0.2 }
    })
    tl.to('.stair', {
      y: '100%',
      stagger: { amount: -0.25 }
    })

    // Hide loader
    tl.to(stairParentRef.current, { autoAlpha: 0 })

    // Fade in page content (no scale now, only opacity)
    gsap.from(pageRef.current, {
      opacity: 0,
      delay: 1.3,
      duration: 0.8,
      ease: 'power2.out'
    })
  }, [currentPath])

  return (
    <div className="overflow-hidden relative">
      {/* Loader */}
      <div
        ref={stairParentRef}
        className="h-screen w-full fixed inset-0 z-20 overflow-hidden"
      >
        <div className="h-full w-full flex">
          <div className="stair flex-1 bg-black"></div>
          <div className="stair flex-1 bg-black"></div>
          <div className="stair flex-1 bg-black"></div>
          <div className="stair flex-1 bg-black"></div>
          <div className="stair flex-1 bg-black"></div>
        </div>
      </div>

      {/* Page */}
      <div ref={pageRef}>{children}</div>
    </div>
  )
}

export default Stairs
