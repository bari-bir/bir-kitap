import { View, ActivityIndicator, StyleSheet } from "react-native"

export const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="small" color="#015C84" />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
    },
})
