
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Snowflake } from 'lucide-react-native';

export default function Snowfall() {
  const snowY = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(-50))
  ).current;

  useEffect(() => {
    const animations = snowY.map((position, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(position, {
            toValue: 500,
            duration: 3500 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: -50,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <View pointerEvents="none" style={styles.snowLayer}>
      <Animated.View style={[styles.snow1, { transform: [{ translateY: snowY[0] }] }]}>
        <Snowflake color="#36CFFF" size={32} />
      </Animated.View>

      <Animated.View style={[styles.snow2, { transform: [{ translateY: snowY[1] }] }]}>
        <Snowflake color="#8AE5FF" size={22} />
      </Animated.View>

      <Animated.View style={[styles.snow3, { transform: [{ translateY: snowY[2] }] }]}>
        <Snowflake color="#36CFFF" size={28} />
      </Animated.View>

      <Animated.View style={[styles.snow4, { transform: [{ translateY: snowY[3] }] }]}>
        <Snowflake color="#A8EEFF" size={36} />
      </Animated.View>

      <Animated.View style={[styles.snow5, { transform: [{ translateY: snowY[4] }] }]}>
        <Snowflake color="#36CFFF" size={20} />
      </Animated.View>

      <Animated.View style={[styles.snow6, { transform: [{ translateY: snowY[5] }] }]}>
        <Snowflake color="#8AE5FF" size={30} />
      </Animated.View>

      <Animated.View style={[styles.snow7, { transform: [{ translateY: snowY[6] }] }]}>
        <Snowflake color="#36CFFF" size={25} />
      </Animated.View>

      <Animated.View style={[styles.snow8, { transform: [{ translateY: snowY[7] }] }]}>
        <Snowflake color="#A8EEFF" size={18} />
      </Animated.View>

      <Animated.View style={[styles.snow9, { transform: [{ translateY: snowY[8] }] }]}>
        <Snowflake color="#36CFFF" size={34} />
      </Animated.View>

      <Animated.View style={[styles.snow10, { transform: [{ translateY: snowY[9] }] }]}>
        <Snowflake color="#8AE5FF" size={24} />
      </Animated.View>

      <Animated.View style={[styles.snow11, { transform: [{ translateY: snowY[10] }] }]}>
        <Snowflake color="#36CFFF" size={19} />
      </Animated.View>

      <Animated.View style={[styles.snow12, { transform: [{ translateY: snowY[11] }] }]}>
        <Snowflake color="#A8EEFF" size={29} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
 snowLayer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,
},

  snow1: { position: 'absolute', top: 100, left: 15 },
  snow2: { position: 'absolute', top: 220, right: 5 },
  snow3: { position: 'absolute', top: 340, left: '45%' },
  snow4: { position: 'absolute', top: 460, right: 12 },
  snow5: { position: 'absolute', top: 580, left: '55%' },
  snow6: { position: 'absolute', top: 710, right: 25 },
  snow7: { position: 'absolute', top: 620, left: 8 },
  snow8: { position: 'absolute', top: 310, right: '45%' },
  snow9: { position: 'absolute', top: 290, left: 10 },
  snow10: { position: 'absolute', top: 180, right: 25 },
  snow11: { position: 'absolute', top: 300, left: '48%' },
  snow12: { position: 'absolute', top: 420, right: 5 },
});
