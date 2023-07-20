import { Card, Layout, List, Text } from '@ui-kitten/components';
import { Animated, RefreshControl, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteTodoList, fetchTodoList } from '../store/apiCall';
import { ITodo } from '../types/todo';


const HomeScreen = ({navigation}: any) => {

    const todos = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    
    const navigateUpdate = (item: ITodo) => {
        navigation.navigate('Update', {
            item,
        })
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        fetchTodoList(dispatch);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }, []);

    const handlePress = async (info: any) => {
        try {
            await deleteTodoList(dispatch, info.item, info.index)
            ToastAndroid.show('Bạn đã xóa 1 việc thành công', ToastAndroid.SHORT);
        } catch (error) {
            console.log("Lỗi ở handPress ", error)
        }
    }

    const renderItemHeader = (headerProps: any, info: any): React.ReactElement => (
        <View {...headerProps}>
            <Text category='h5'>
                {`${info.item.title}`}
            </Text>
        </View>
    );
    
    
    const renderItem = (info: any): React.ReactElement => {
        const rightSwipe = (proress: any, dragX: any) => {
            const scale = dragX.interpolate({
                inputRange: [-100, 0],
                outputRange: [0, 100],
                extrapolate: 'clamp'
            });
    
            return (
                <TouchableOpacity activeOpacity={0.7} onPress={() => handlePress(info)}>
                    <Animated.View
                        style={[styles.deleteBox, {transform: [{translateX: scale}]}]}
                    >
                        <Text style={{color: 'white', fontSize: 20}}>Delete</Text>
                    </Animated.View>
                </TouchableOpacity>
            )
        }
        return (
            <Swipeable
                renderRightActions={rightSwipe}
            >
                <Card
                    style={styles.item}
                    status='info'
                    header={headerProps => renderItemHeader(headerProps, info)}
                    onLongPress={() => navigateUpdate(info.item)}
                >
                    <Text 
                        style={styles.desText}
                        category='p1'
                    >
                        {info.item.description}
                    </Text>
                    <Text style={styles.timeText}>
                        {`${info.item.time} ${info.item.day}`}
                    </Text>
                </Card>
            </Swipeable>
        )
    };

    return (
        <Layout 
            style={styles.container}
            level='4'
        >
            <Text 
                category='h2'
                style={styles.topText}
            >
                Todo List
            </Text>
            <List
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={styles.listContainer}
                contentContainerStyle={styles.contentContainer}
                data={todos}
                renderItem={renderItem}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    topText: {
        fontSize: 32,
        textAlign: 'center',
    },
    listContainer: {
        marginTop: 20,
        maxHeight: 1000,
        backgroundColor: '#E4E9F2',
    
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
        borderRadius: 10,
    },
    desText: {
        fontSize: 20
    },
    timeText: {
        marginTop: 8,
        fontStyle: 'italic'
    },
    deleteBox: {
        borderRadius: 12,
        backgroundColor: '#f32929',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 150,
        marginVertical: 4
    }
})

export default HomeScreen;