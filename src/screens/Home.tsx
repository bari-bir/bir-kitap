import { StyleSheet, View, Text, Dimensions, Image } from "react-native"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { CarouselBookList } from "../components/CarouselBookList"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import Carousel from "react-native-snap-carousel"
import Icon from "@ant-design/react-native/lib/icon"

export const Home = () => {
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchReViewData } = ReviewApi("list")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])

    useEffect(() => {
        fetchBookData({}).then((res) => {
            if (res.result_code === 0) {
                setBookDataList(res.data)
            }
        })

        fetchReViewData({}).then((res) => {
            if (res.result_code === 0) {
                setReviewDataList(res.data)
            }
        })
    }, [])

    const _renderReviewItem = ({ item }: { item: bookInfo }) => {
        return (
            <View style={styles.reviewWrapper}>
                <Image style={styles.bookReviewImg} source={{ uri: "https://static.vecteezy.com/system/resources/previews/022/192/851/original/girl-looking-at-the-mount-fuji-during-the-night-art-of-anime-woman-stargazing-beautiful-vector.jpg" }} />

                <View style={styles.reviewBookInfo}>
                    <View style={styles.reviewUserInfo}>
                        <Image style={styles.reviewUserProfileImg} source={{ uri: "https://wallpapers.com/images/hd/cute-anime-profile-pictures-k6h3uqxn6ei77kgl.jpg" }} />
                        <View>
                            <Text style={styles.reviewUserName}>Ayala Nayashova</Text>
                            <Text style={styles.reviewUserNic}>Book Lover</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 1 }}>
                        <Icon name="star" style={{ fontSize: 9 }} />
                        <Icon name="star" style={{ fontSize: 9 }} />
                        <Icon name="star" style={{ fontSize: 9 }} />
                        <Icon name="star" style={{ fontSize: 9 }} />
                        <Icon name="star" style={{ fontSize: 9 }} />
                    </View>
                    <Text style={styles.reviewBookMessage}>
                        Скажу сразу. Таких книг крайне мало. Раньше подобных авторов называли популяризаторами науки. Это не просто очередная поделка на тему модных веяний утраченных запретных знаний Древнего Китая...<Text>еще</Text>
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <Page>
            <Text style={styles.headText}>Home</Text>
            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>News</Text>
                    <Text style={styles.moreInfoText}>See All</Text>
                </View>

                <View>{bookDataList.length ? <CarouselBookList dataList={bookDataList} /> : <NoData />}</View>
            </View>

            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>Reviews</Text>
                </View>

                <View>
                    {reviewDataList.length ? <Carousel data={reviewDataList} renderItem={_renderReviewItem} sliderWidth={Dimensions.get("window").width} itemWidth={254} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} /> : <NoData />}
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        opacity: 0.5,
        color: "#000000",
    },
    listWrapper: {
        width: "100%",
        gap: 25,
        flexDirection: "column",
    },
    listHeaderBlock: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
    },
    listHeadTitle: {
        fontSize: 21,
        fontWeight: "700",
        lineHeight: 21,
    },
    moreInfoText: {
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 20,
        color: "#808080",
    },

    reviewWrapper: {
        backgroundColor: "#f9faf8",
        width: 254,
        height: 171,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        paddingVertical: 25,
        paddingHorizontal: 19,
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
    },

    bookReviewImg: {
        width: 84,
        height: 120,
        borderRadius: 9,
        objectFit: "cover",
    },

    reviewBookInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    reviewBookMessage: {
        fontSize: 7,
        fontWeight: "600",
        lineHeight: 10,
    },

    reviewUserInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    reviewUserProfileImg: {
        width: 31,
        height: 31,
        borderRadius: 500,
    },

    reviewUserName: {
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 15,
        color: "#000000",
    },

    reviewUserNic: {
        fontSize: 8,
        fontWeight: "600",
        lineHeight: 10,
        color: "#7A7878",
    },
})
