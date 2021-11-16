import { Layer, Box } from 'grommet'

export default function LoadingMask() {
  return (
    <Layer full background="rgba(0,0,0,0.5)">
      <Box flex align="center" justify="center">
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <lottie-player src="https://assets5.lottiefiles.com/temp/lf20_KBD6AE.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          `,
          }}
        ></div>
      </Box>
    </Layer>
  )
}
