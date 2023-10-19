import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavigationAction, VStack } from 'components';
import ListItem from 'components/list';
import { TopNavigation } from '@ui-kitten/components';

const Buy = () => {
    const bxg_history = useSelector((state) => state.bxg_history);

    const [floader, setfLoader] = React.useState(false);
    const [displayCount, setDisplayCount] = React.useState(3);

    const handleShowMore = () => {
        setDisplayCount(displayCount + 3);
    };

    const filterForTypeBuy = bxg_history?.filter((item: any) => item.type.includes("Buy"))
    return (
        <View style={{ paddingTop: 40, flex: 1 }}>


            {/* <View style={{ flexDirection: "row", alignItems: "center", width: "58%", justifyContent: "space-between", paddingBottom: 10, paddingTop: 40, paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{ fontWeight: "600" }}>Buy</Text>
            </View> */}





            <TopNavigation
                appearance="control"
                title={() => <Text category="callout">Buy</Text>}
                accessoryLeft={() => (
                    <NavigationAction status="primary" icon="arrow_left" />
                )}

            />
            <ScrollView style={{ paddingBottom: 15 }}>
                <VStack mh={24}>
                    {floader ? (
                        <ActivityIndicator
                            size={"large"}
                            style={{ alignSelf: "center" }}
                            color={"#00FFFF"}
                        />
                    ) : filterForTypeBuy?.length > 0 ? (
                        filterForTypeBuy?.slice(0, displayCount)?.map(
                            //@ts-ignore
                            (item, i) => {
                                return (
                                    <ListItem
                                        key={i}
                                        id={i}
                                        //@ts-ignore
                                        bxg={item.bxg}
                                        //@ts-ignore
                                        usdt={item.bxg}
                                        //@ts-ignore
                                        type={item.type}
                                        //@ts-ignore
                                        status={item.status}
                                        //@ts-ignore
                                        time={item.createdAt}
                                    />
                                );
                            }
                        )

                    ) : (
                        <Text style={{ alignSelf: "center" }} status="primary">
                            No Buy History Found.
                        </Text>
                    )}
                    {!floader && displayCount < filterForTypeBuy?.length && (
                        <Button title="Show More" onPress={handleShowMore} />
                    )}
                </VStack>
            </ScrollView>
        </View >
    )
}

export default Buy

const styles = StyleSheet.create({})