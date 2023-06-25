import React, { useEffect } from 'react'

type WaveformProps = {
  audioPeakData: number[]
  svgRef: React.RefObject<SVGSVGElement>
}

const Waveform: React.FC<WaveformProps> = ({ audioPeakData, svgRef }) => {
  useEffect(() => {
    if (!audioPeakData.length || !svgRef.current) return

    const svg = svgRef.current
    const width = svg.clientWidth
    const height = svg.clientHeight
    const barWidth = width / audioPeakData.length
    const middle = height / 2

    // Remove any previous paths
    while (svg.lastChild) {
      svg.removeChild(svg.lastChild)
    }

    // Start the path at the middle
    let pathData = `M 0 ${middle} `

    // Top part of the waveform
    audioPeakData.forEach((peak, index) => {
      const barHeight = peak * middle
      const x = index * barWidth
      const topY = middle - barHeight
      const bottomY = middle + barHeight

      pathData += `L ${x} ${topY} L ${x} ${bottomY} `
    })

    // Close the path
    pathData += `L ${width} ${middle} Z`

    // Create the path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathData)
    path.setAttribute('fill', '#3f88c5')

    // Append the path to the SVG
    svg.appendChild(path)
  }, [audioPeakData])

  return null // This component doesn't need to return any JSX
}

export default Waveform
