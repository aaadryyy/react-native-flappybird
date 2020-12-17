import React from 'react'
import { View} from 'react-native'
const Bird = ({birdBottom, birdLeft, birdWidth, birdHeight}) => {
  
  return(
    <View 
      style={{
        position: "absolute",
        backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        bottom: birdBottom - (birdHeight/2),
        left: birdLeft - (birdWidth/2)
      }} 
    />
  )
}
export default Bird