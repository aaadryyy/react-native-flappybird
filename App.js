import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View , Text, TouchableWithoutFeedback} from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth= Dimensions.get('screen').width
  const screenHeight= Dimensions.get('screen').height
  const birdLeft = screenWidth/2
  const birdWidth= 50
  const birdHeight= 50
  const [birdBottom, setBirdBottom] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesTwoNegHeight, setObstaclesTwoNegHeight] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const gravity = 10
  const velocity = 4
  const obstaclesWidth = 50
  const obstaclesHeight = screenHeight/2
  const gap = 200
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTwoTimerId
  
  const randomiser = () => - Math.random() * 150
  // start bird falling
  useEffect(() => {
    if(birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 30)
      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])


  // start first obstacles
  useEffect(() => {
    if(obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - velocity)
      })
      return() => {
        clearInterval(obstaclesLeftTimerId)
      }
    }else{
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(randomiser)
      setScore(score => score + 1)
    }
  }, [obstaclesLeft])

  // start second obstacles
  useEffect(() => {
    if(obstaclesLeftTwo > - obstaclesWidth){
      obstaclesLeftTwoTimerId = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - velocity)
      })
      return () => {
        clearInterval(obstaclesLeftTwoTimerId)
      }
    }else{
      setObstaclesLeftTwo(screenWidth)
      setObstaclesTwoNegHeight(randomiser)
      setScore(score => score + 1)
    }
  }, [obstaclesLeftTwo])


  //check for collision
  useEffect(() => {
    if(
      (
        birdBottom < 
        (
          (obstaclesNegHeight + obstaclesHeight + 30) 
          || 
          birdBottom > (obstaclesNegHeight + obstaclesHeight + gap - 30)
        )
        && obstaclesLeft > screenWidth/2 - 30 
        && obstaclesLeft < screenWidth/2 + 30
      )
      ||
      (
        birdBottom < 
        (
          (obstaclesTwoNegHeight + obstaclesHeight + 30) 
          || 
          birdBottom > (obstaclesTwoNegHeight + obstaclesHeight + gap - 30))
        && obstaclesLeft > screenWidth/2 - 30 
        && obstaclesLeft < screenWidth/2 + 30
      )
      ||
      birdBottom === screenHeight || birdBottom === -screenHeight
    )
    {
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTwoTimerId)
    setIsGameOver(true)
  }

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Text>{score}</Text>
        <Bird 
          birdBottom={birdBottom}
          birdLeft={birdLeft}
          birdWidth={birdWidth}
          birdHeight={birdHeight}
        />
        <Obstacles 
        color="green"
        obstaclesLeft={obstaclesLeft}
        obstaclesWidth={obstaclesWidth}
        obstaclesHeight={obstaclesHeight}
        randomBottom={obstaclesNegHeight}
        gap={gap}/>

        <Obstacles 
        color="yellow"
        obstaclesLeft={obstaclesLeftTwo}
        obstaclesWidth={obstaclesWidth}
        obstaclesHeight={obstaclesHeight}
        randomBottom={obstaclesTwoNegHeight}
        gap={gap}/>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
