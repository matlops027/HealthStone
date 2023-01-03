import { ToastAndroid } from "react-native";

export default function Toast(message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    )
}