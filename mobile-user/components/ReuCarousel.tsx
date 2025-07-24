import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
 

interface CarouselProps {
  data:any;
  width: number;
  height:number;
  autoPlay: boolean;
  renderItem: CarouselRenderItem<any>
}

const ReuCarousel:React.FC<CarouselProps> = ({ data, autoPlay, height, width, renderItem}) => {
    const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        data={data}
        autoPlay={autoPlay}
        onProgressChange={progress}
        renderItem={renderItem}
      />
 
      <Pagination.Basic
      activeDotStyle={{ backgroundColor: "#B53133", borderRadius: 50 }}
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(84, 83, 83, 0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginVertical: 10 }}
        onPress={onPressPagination}
      />
    </View>
  )
}

export default ReuCarousel

const styles = StyleSheet.create({})