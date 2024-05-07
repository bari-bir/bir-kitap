import { MainNavigation } from "./src/navigation/MainNavigation"
import React, { useEffect, useState } from "react"
import { loadAsync } from "expo-font"
import enUS from "@ant-design/react-native/lib/locale-provider/en_US"
import Provider from "@ant-design/react-native/lib/provider"
import { Provider as ProviderRedux } from "react-redux"
import store from "./src/redux/store"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Loading } from "./src/components/Loading"
import { I18nextProvider } from "react-i18next"
import i18next from "./src/locales/i18n"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
    const [fontLoaded, setFontLoaded] = useState<boolean>(true)

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem("lang")
                if (storedLanguage) {
                    i18next.changeLanguage(storedLanguage)
                }
            } catch (e) {
                console.log(e)
            }
        }
        loadLanguage()

        _loadAssets().then(() => {
            setFontLoaded(false)
        })
    }, [])

    if (fontLoaded) {
        return <Loading />
    }

    async function _loadAssets() {
        await loadAsync({
            antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
            antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        })
    }
    return (
        <ProviderRedux store={store}>
            <Provider locale={enUS}>
                <I18nextProvider i18n={i18next}>
                    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#F7F9F6" } }}>
                        <MainNavigation />
                    </NavigationContainer>
                </I18nextProvider>
            </Provider>
        </ProviderRedux>
    )
}
