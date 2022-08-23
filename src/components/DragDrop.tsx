import React, { FunctionComponent } from 'react' 
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated'

type ContextType = {
    x: number
    y: number
}

interface DragDropProps {
    children: JSX.Element | JSX.Element[]
    onDrop?(x: number, y: number): void
    onDrag?(x: number, y: number): void
}

export const DragDrop: FunctionComponent<DragDropProps> = ({children, onDrag, onDrop}) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const drag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (context) => {
            // context.x;
            // context.y;
        },  
        onActive: (event, context) => {
            console.log("DRAG", event.translationX, event.translationY); 
            x.value = event.translationX;
            y.value = event.translationY;
            if (onDrag) {
                runOnJS(onDrag)(event.translationX, event.translationY);
            }
        },
        onEnd: (event) => {
            if (onDrop) {
                runOnJS(onDrop)(event.translationX, event.absoluteY);
            }
        }
    })
    return (
        <PanGestureHandler onGestureEvent={drag}>
            <Animated.View style = {[   
                // {
                //     zIndex: 100,
                //     position: 'absolute',
                //     right: 0
                // },   
                useAnimatedStyle(() => {
                    return {
                        transform: [
                            { translateX:  x.value},
                            { translateY:  y.value}
                        ]
                    }
                })
            ]}  >
                {children}
            </Animated.View>
        </PanGestureHandler>
    )
}