import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavigationAction, VStack } from 'components';
import ListItem from 'components/list';
import { TopNavigation } from '@ui-kitten/components';

const Sell = () => {
    const bxg_history = useSelector((state) => state.bxg_history);

    const [floader, setfLoader] = React.useState(false);
    const [displayCount, setDisplayCount] = React.useState(3);

    const handleShowMore = () => {
        setDisplayCount(displayCount + 3);
    };

    const filterForTypeSell = bxg_history?.filter((item: any) => item.type.includes("Sell"))
    return (
        <View style={{ paddingTop: 40 }}>
            <TopNavigation
                appearance="control"
                title={() => <Text category="callout">Sell</Text>}
                accessoryLeft={() => (
                    <NavigationAction status="primary" icon="arrow_left" />
                )}

            />
            <ScrollView>
                <VStack mh={24}>
                    {floader ? (
                        <ActivityIndicator
                            size={"large"}
                            style={{ alignSelf: "center" }}
                            color={"#00FFFF"}
                        />
                    ) : filterForTypeSell?.length > 0 ? (
                        filterForTypeSell?.slice(0, displayCount)
                            .map(
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
                            No Sell History Found.
                        </Text>
                    )}

                    {!floader && displayCount < filterForTypeSell?.length && (
                        <Button title="Show More" onPress={handleShowMore} />
                    )}
                </VStack>
            </ScrollView>
        </View >
    )
}

export default Sell

const styles = StyleSheet.create({})