import { Avatar, Divider, Layout, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AuthProps, useAuth } from '../context/AuthContext';
import { API_LINK } from "../../default-value";
import axios from 'axios';

interface IListItem {
    id: number,
    title: string
}


const handlePress = async (item: IListItem, value: AuthProps) => {
    switch (item.id) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            try {
                await SecureStore.deleteItemAsync('my-jwt');
                await axios.post(`${API_LINK}/auth/logout`,
                    {
                        verify_id: value.authState?.accessToken,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${value.authState?.accessToken}`,
                        },
                    }
                );
                value.handleState?.(false, {});
            } catch (error) {
                console.log(error);
            }
            break;
    }
}

const UserScreen = () => {
    const value = useAuth()
    const user = useSelector((state: RootState) => state.account.user)
    const data = [{id: 1, title: 'Quản lý tài khoản'}, {id: 2, title: 'Quản lý thông tin người dùng'}, {id: 3, title: 'Logout'}]
    const renderItem = ({ item, index }: {item: IListItem; index: number}): React.ReactElement => (
        <ListItem 
            title={`${item.title}`} 
            onPress={() => handlePress(item, value)}
        />
    );
    return (
        <Layout level='4' style={{ flex: 1 }}>
            <Layout level='4' style={styles.avatar}>
                <Avatar 
                    size='giant'
                    source={require('../../public/avatar/user.png')}
                    style={styles.imageAva}
                />
                
                <Text style={styles.avaName}>{user?.name}</Text>
            </Layout>

            <List
                style={styles.container}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />   
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    avatar: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageAva: {
        width: 100,
        height: 100
    },
    avaName: {
        padding: 16,
    }
  });

export default UserScreen;